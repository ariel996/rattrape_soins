<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Actions\UserAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\PatientResource;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Personnel;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        //
        $patients = PatientResource::collection(Patient::query()
            ->get()
        );

        return response()->json(compact('patients'));
    }

    /**
     * Get all doctor patient
     * @param Request $request
     * @return JsonResponse
     */
    public function DoctorPatient(Request $request): JsonResponse
    {
        $id = $request->user()->id;
        $user = Personnel::whereUserId($id)->first();

        $appointment = Appointment::query()
            ->wherePersonnelId($user->id)
            ->distinct('patient_id')
            ->with('patient')
            ->get();

        $appointments = AppointmentResource::collection($appointment);

        return response()->json(compact('appointments'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateUserRequest $request
     * @return JsonResponse
     */
    public function store(CreateUserRequest $request): JsonResponse
    {
        //
        $role_id = Role::whereName('Patient')->first()?->id ?? 4;

        $user = UserAction::create($request, $role_id);

        $patient = new PatientResource(Patient::query()->create([
            'user_id' => $user->id,
        ]));

        return response()->json(compact('patient'));
    }

    /**
     * Display the specified resource.
     *
     * @param Patient $patient
     * @return JsonResponse
     */
    public function show(Patient $patient): JsonResponse
    {
        //
        $patient = new PatientResource($patient);

        return response()->json(compact('patient'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param Patient $patient
     * @return JsonResponse
     */
    public function update(UpdateUserRequest $request, Patient $patient): JsonResponse
    {
        //
        $patient->user->update([
            'name' => $request->name,
            'surname' => $request->surname,
            'dob' => $request->dob,
        ]);
        $patient = new PatientResource($patient);

        return response()->json(compact('patient'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Patient $patient
     * @return JsonResponse
     */
    public function destroy(Patient $patient): JsonResponse
    {
        //
        $patient->delete();

        return response()->json([
            'message' => 'Deleted',
        ]);
    }
}
