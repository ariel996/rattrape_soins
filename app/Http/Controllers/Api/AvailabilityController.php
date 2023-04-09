<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AvailabilityResource;
use App\Models\Appointment;
use App\Models\Availability;
use App\Models\Scheduler;
use Carbon\Exceptions\InvalidFormatException;
use DateInterval;
use DateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AvailabilityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $p = $user->personnel()->with('availabilities')->first();

        return response()->json([
            'availabilities' => AvailabilityResource::collection($p->availabilities)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'day' => ['required'],
            'debut' => ['required'],
            'fin' => ['required'],
            'break_begin' => ['sometime'],
            'break_end' => ['sometime'],
            'duration' => ['required'],
        ]);

        // Not True
        $validated ['personnel_id'] = Auth::user()->id;

        $availability = Availability::query()->updateOrCreate([
            'day' => $request->day,
        ], $validated);

        // creating scheduler for the given availability
        $start = explode(':', $request->debut);
        $end = explode(':', $request->fin);
        $duration = explode(':', $request->duration);

        self::createSchedule($start, $end, $duration, $availability);

        return response()->json([
            'availability' => new AvailabilityResource(
                $availability->load(['personnel', 'schedulers'])
            ),
        ]);
    }

    /**
     * create Scheduler for a the given availability
     * @param $start
     * @param $end
     * @param $duration
     * @param $availability
     * @throws \Exception
     */
    private static function createSchedule($availability)
    {
        try {
            // creating scheduler for the given availability
            $duration = explode(':', $availability->duration);

            $start_time = strtotime($availability->debut);
            $end_time = strtotime($availability->fin);
            $duration_sec = $duration[0] * 3600 + $duration[1] * 60 + $duration[2];

            $time_slots = array();
            while ($start_time < $end_time) {
                $start_old = $start_time;
                $start_time += $duration_sec;
                $time_slots[] = [
                    'start' => date('H:i:s', $start_old),
                    'end' => date('H:i:s', $start_time),
                    'availability_id' => $availability->id,
                ];
            }

            Scheduler::query()->upsert($time_slots, []);

        } catch (\Exception $e) {
            throw new \Exception("Error" . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Availability $availability
     * @return JsonResponse
     */
    public function show(Availability $availability)
    {
        //
        return response()->json([
            'availability' => new AvailabilityResource($availability)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Availability $availability
     * @return JsonResponse
     * @throws \Exception
     */
    public function update(Request $request, Availability $availability): JsonResponse
    {

        $validated = $request->validate([
            'day' => ['required', Rule::in(array_values((new Availability())->days))],
            'debut' => ['required'],
            'fin' => ['required'],
        ]);
        $request->validate([
            'duree' => ['required']
        ]);

        $availability->update(array_merge($validated, [
            'duration' => $request->duree,
        ]));

        // update the scheduler for thr given availability
        self::createSchedule($availability);

        return response()->json([
            'message' => 'Updated',
        ]);
    }


    /**
     * return available schedule for a given date
     * @param Request $request
     * @return JsonResponse
     */
    public function getScheduler(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => ['required'],
            'personnel_id' => ['required'],
        ]);

        $appointments = Appointment::query()
            ->whereDate('date_appointment', $validated['date'])
            ->where('personnel_id',$validated['personnel_id'])
            ->pluck('scheduler_id');

        // get availability of the personnel on the given day
        $day = date('l', strtotime($validated['date']));
        $day = (new Availability())->days[$day];

        $availability = Availability::query()
            ->where('day', $day)
            ->wherePersonnelId($validated['personnel_id'])
            ->first();

        $query = Scheduler::query()->where('availability_id', $availability->id);

        if ($appointments->count() === 0) {
            $data = $query->get();
        } else {
            $data = $query->whereNotIn('id', $appointments)
                ->get();
        }

        if ($validated['date'] == now()->format('Y-m-d')) {
            $hn = now()->format('H');
            $return = [];
            foreach ($data as $d) {
                $h = explode(':', $d->start)[0];
                if ($h > $hn) {
                    $return[] = $d;
                }
            }
            return response()->json($return);
        } else {
            return response()->json($data);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Availability $availability
     * @return \Illuminate\Http\Response
     */
    public function destroy(Availability $availability)
    {
        //
    }
}
