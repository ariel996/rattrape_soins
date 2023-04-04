<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Personnel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard information of the admin
     * @return JsonResponse
     */
    public function AdminDashboard(): JsonResponse
    {
        $nbrPersonnel = Personnel::query()->count();
        $nbrPatient = Patient::query()->count();
        $nbrAppointment = Appointment::query()->count();

        return response()->json(compact('nbrPersonnel', 'nbrPatient', 'nbrAppointment'));
    }

    /**
     * Get dashboard information of the secretary
     * @return JsonResponse
     */
    public function SecretaryDashboard(): JsonResponse
    {
        $nbrPersonnel = Personnel::query()->count();
        $nbrPatient = Patient::query()->count();
        $nbrAppointment = Appointment::query()->count();

        return response()->json(compact('nbrPersonnel', 'nbrPatient', 'nbrAppointment'));
    }


    /**
     * Get dashboard information of the Staff member
     * @param Request $request
     * @return JsonResponse
     */
    public function StaffDashboard(Request $request): JsonResponse
    {
        $user = $request->user();

        $nbrPatient = Appointment::query()
            ->wherePersonnelId($user->id)
            ->distinct('patient_id')
            ->count();

        return response()->json(compact('nbrPatient'));
    }

    /**
     * Get the patient dashboard information
     * @param Request $request
     * @return JsonResponse
     */
    public function PatientDashboard(Request $request): JsonResponse
    {
        $user = $request->user();

        $nbrPatient = Appointment::query()
            ->wherePatientId($user->id)
            ->distinct('patient_id')
            ->count();

        return response()->json(compact('nbrPatient'));
    }
}
