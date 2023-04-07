<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use App\Models\Personnel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
     * register a patient for an appointment
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'personnel_id' => ['required', 'exists:personnels,id'],
            'availability_id' => ['required', 'exists:availabilities,id'],
        ], [
            'personnel_id.exists' => 'The select personnel is not more with us',
            'availability_id.exists' => 'The selected availability is not more',
        ]);
        $validated['patient_id'] = Auth::user()->id;

        $appointment = Appointment::query()->create([$validated]);

        return response()->json([
            'appointment' => new AppointmentResource(
                $appointment->load(['personnel', 'patient', 'availability'])
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
            $appointment->load(['availability', 'patient', 'observations', 'personnel'])
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
