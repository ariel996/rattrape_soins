<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    /**
     * return login user information
     * @param Request $request
     * @return mixed
     */
    public function user(Request $request)
    {
        return $request->user();
    }

    /**
     * Login a user to the system
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $request->authenticate();
            $user = Auth::user();

            $abilities = match ($user->role_id) {
                1 => ['*', 'admin'],
                2 => ['secretary'],
                3 => ['staff'],
                4 => ['patient'],
                default => ['No match']
            };

            return response()->json([
                'user' => new UserResource($user),
                'access_token' => $user->createToken('react-api', $abilities)->plainTextToken,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Logout the user on the current device
     * @return mixed
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Logout on the current device',
        ]);
    }

    /**
     * Logout the user on all devices
     * @param Request $request
     * @return mixed
     */
    public function logoutAll(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logout on all devices',
        ]);
    }
}
