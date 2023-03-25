<?php

use App\Http\Controllers\Api\AuthController;
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

    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('logout-all', [AuthController::class, 'logout-all']);

    // register to a subscription
    Route::post('abonements/register', [SubscriptionController::class, 'register']);

    Route::apiResources([
        'personnels' => \App\Http\Controllers\Api\PersonnelController::class,
        'patients' => \App\Http\Controllers\Api\PatientController::class,
        'abonements' => SubscriptionController::class,
    ]);


});


