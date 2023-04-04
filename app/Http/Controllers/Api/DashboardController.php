<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Personnel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function AdminDashboard(): JsonResponse
    {
        $nbrPersonnel = Personnel::query()->count();
        $nbrPatient = Patient::query()->count();


        return response()->json(compact('nbrPersonnel','nbrPatient'));
    }
}
