<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AvailabilityResource;
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
    private static function createSchedule($start, $end, $duration, $availability)
    {
        try {
            $srt = (new DateTime)->setTime($start[0], $start[1], $start[2]);
            $ed = (new DateTime)->setTime($end[0], $end[1], $end[2]);
            $interval = new DateInterval("PT" . $duration[0] . "H" . $duration[1] . "M" . $duration[2] . "S");

            while ($srt < $ed) {
                $ended = $srt;
                $ended->add($interval);
                Scheduler::query()->updateOrCreate([
                    'availability_id' => $availability->id,
                ], [
                    'start' => $srt,
                    'end' => $ended,
                ]);

                $srt = $ended;
            }

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

        return response()->json([
            'message' => 'Updated',
        ]);
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
