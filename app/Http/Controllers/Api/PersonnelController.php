<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Actions\UserAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\PersonnelResource;
use App\Models\Appointment;
use App\Models\Availability;
use App\Models\Personnel;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        //
        $personnels = PersonnelResource::collection(Personnel::query()
            ->get()
        );

        return response()->json(compact('personnels'));
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
        $role_id = Role::whereName('Staff')->first()?->id ?? 3;
        $user = UserAction::create($request, $role_id);

        $personnel = new PersonnelResource(
            Personnel::query()->create([
                'user_id' => $user->id,
            ])
        );

        //init availability of the personnel
        (new Availability())->initPersonnelAvailability($personnel->id);

        return response()->json(compact('personnel'));
    }

    /**
     * Display the specified resource.
     *
     * @param Personnel $personnel
     * @return JsonResponse
     */
    public function show(Personnel $personnel): JsonResponse
    {
        //
        $personnel = new PersonnelResource($personnel);

        return response()->json(compact('personnel'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param Personnel $personnel
     * @return JsonResponse
     */
    public function update(UpdateUserRequest $request, Personnel $personnel): JsonResponse
    {
        //
        $personnel->user->update([
            'name' => $request->name,
            'surname' => $request->surname,
            'dob' => $request->dob,
        ]);
        $personnel = new PersonnelResource($personnel);

        return response()->json(compact('personnel'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Personnel $personnel
     * @return JsonResponse
     */
    public function destroy(Personnel $personnel): JsonResponse
    {
        //
        $personnel->delete();

        return response()->json([
            'message' => 'Deleted',
        ]);
    }
}
