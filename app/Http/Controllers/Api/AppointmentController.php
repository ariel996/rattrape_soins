<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\PersonnelResource;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Personnel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource for the personnel connected .
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $user = Personnel::whereUserId(Auth::user()->id)->first();
        return response()->json([
            'appointments' => AppointmentResource::collection(
                Appointment::wherePersonnelId($user->id)
                    ->with(['personnel', 'patient', 'scheduler'])
                    ->latest()
                    ->get(),
            )
        ]);
    }

    /**
     * Return the personnel appointment dependant on the status
     * @param $status
     * @return JsonResponse
     */
    public function indexStatus($status): JsonResponse
    {
        $user = Personnel::whereUserId(Auth::user()->id)->first();
        $query = Appointment::wherePersonnelId($user->id)
            ->with(['personnel', 'patient', 'scheduler'])
            ->latest();

        $appoint = new Appointment();
        $appointment = match ($status) {
            'up_coming' => $query->whereStatus($appoint->STATUS['up_coming'])->get(),
            'pass' => $query->whereStatus($appoint->STATUS['pass'])->get(),
            default => $query->get(),
        };

        return response()->json([
            'appointments' => AppointmentResource::collection($appointment)
        ]);
    }


    /**
     * Return the Patient appointment dependant on the status
     * @param $status
     * @return JsonResponse
     */
    public function patientIndexStatus($status): JsonResponse
    {
        $user = Patient::whereUserId(Auth::user()->id)->first();

        $query = Appointment::wherePatientId($user->id)
            ->with(['personnel', 'patient', 'scheduler'])
            ->latest();

        $appoint = new Appointment();
        $appointment = match ($status) {
            'up_coming' => $query->whereStatus($appoint->STATUS['up_coming'])->get(),
            'pass' => $query->whereStatus($appoint->STATUS['pass'])->get(),
            default => $query->get(),
        };

        return response()->json([
            'appointments' => AppointmentResource::collection($appointment)
        ]);
    }


    /**
     * register a patient for an appointment
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'personnel_id' => ['required', 'exists:personnels,id'],
            'scheduler_id' => ['required', 'exists:schedulers,id'],
            'date_appointment' => ['required'],
        ], [
            'personnel_id.exists' => 'The select personnel is not more with us',
            'scheduler_id.exists' => 'The selected Scheduler is not more',
        ]);
        $patient = Patient::whereUserId($request->user()->id)->first();
        $validated['patient_id'] = $patient->id;
        $validated['note'] = 0;

        $appointment = Appointment::query()->create($validated);

        return response()->json([
            'appointment' => new AppointmentResource(
                $appointment->load(['personnel', 'patient', 'scheduler'])
            )
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param Appointment $appointment
     * @return JsonResponse
     */
    public function show(Appointment $appointment): JsonResponse
    {
        //
        $appointment = new AppointmentResource(
            $appointment->load(['scheduler', 'patient', 'observations', 'personnel'])
        );
        return response()->json(compact('appointment'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Appointment $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Appointment $appointment)
    {
        //
    }

    /**
     * Update the Status of the specific resource .
     *
     * @param \Illuminate\Http\Request $request
     * @param Appointment $appointment
     * @return JsonResponse
     */
    public function updateStatus(Request $request, Appointment $appointment): JsonResponse
    {
        $request->validate([
            'status' => ['required', Rule::in(array_values((new Appointment())->STATUS))],
        ]);

        $appointment->update([
            'status' => $request->status,
        ]);
        return response()->json('Updated');
    }

    /**
     * @param Request $request
     * @param Appointment $appointment
     * @return JsonResponse
     */
    public function note(Request $request, Appointment $appointment): JsonResponse
    {
        $validated = $request->validate([
            'note' => ['required', 'integer'],
        ]);

        $appointment->update([
            'note' => $validated['note'],
        ]);

        // update the average note of the personnel
        $personnel = Personnel::whereId($appointment->personnel_id)
            ->with('appointments', function ($query) {
                $query->whereNotNull('note');
            })->first();
        $appointments = $personnel->appointments;

        $personnel->update([
            'note' => $appointments->sum('note') / $appointments->count()
        ]);

        return response()->json("Updated");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Appointment $appointment
     * @return JsonResponse
     */
    public function destroy(Appointment $appointment): JsonResponse
    {
        $appointment->delete();

        return response()->json([
            'message' => 'Deleted',
        ]);
    }
}
