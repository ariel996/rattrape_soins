<?php

use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AvailabilityController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\PersonnelController;
use App\Http\Controllers\Api\SubscriptionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    // Admin
    Route::middleware(['auth:sanctum', 'abilities:admin,*'])->prefix('admin')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'AdminDashboard']);
    });

    // Admin
    Route::middleware(['auth:sanctum', 'abilities:secretary'])->prefix('secretary')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'SecretaryDashboard']);
    });

    // only for staff member
    Route::middleware(['auth:sanctum', 'abilities:staff'])->prefix('staff')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'StaffDashboard']);
    });

    // only for patient member
    Route::middleware(['auth:sanctum', 'abilities:patient'])->prefix('patient')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'PatientDashboard']);
    });


    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('logout-all', [AuthController::class, 'logout-all']);

    // register to a subscription
    Route::post('abonements/register', [SubscriptionController::class, 'register']);

    // note les service d'un personnel
    Route::post('personnels/note', [PersonnelController::class, 'note']);

    //Patient appointment
    Route::post('appointment/register', [AppointmentController::class, 'register']);

    Route::apiResources([
        'personnels' => PersonnelController::class,
        'patients' => \App\Http\Controllers\Api\PatientController::class,
        'abonements' => SubscriptionController::class,
        //personnel appointment routes
        'appointments'=>AppointmentController::class,
        //personnel availabilities routes
        'availabilities'=>AvailabilityController::class,
    ]);
});


