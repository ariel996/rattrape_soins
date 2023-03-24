<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Actions\UserAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Patient;
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
        $patients = Patient::query()
            ->get();

        return response()->json(compact('patients'));
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
        $user = UserAction::create($request);

        $patient = Patient::query()->create([
            'user_id' => $user->id,
        ]);

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
        $patient->user->update($request->all());

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
            'message'=> 'deleted',
        ]);
    }
}
