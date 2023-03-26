<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionResource;
use App\Http\Resources\UserSubscriptionResource;
use App\Models\Subscription;
use App\Models\UserSubscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        //
        $subscriptions = SubscriptionResource::collection(
            Subscription::with('users')->get()
        );

        return response()->json(compact('subscriptions'));
    }

    /**
     * Subscribed to a Subscription
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'subscription_id' => ['required', 'exists:subscriptions,id'],
        ], [
            'subscription_id.exists' => "The subscription chose don't exist",
        ]);

        return response()->json([
                'abonement' => new UserSubscriptionResource(
                    UserSubscription::query()->create([
                        'debut' => now(),
                        'user_id' => Auth::user()->id,
                        'subscription_id' => $request->subscription_id,
                    ]))
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'debut' => ['required', 'date'],
            'fin' => ['required', 'date'],
        ]);

        return response()->json([
            'subscription' => new SubscriptionResource(
                Subscription::query()->create($validated)
            ),
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param Subscription $subscription
     * @return JsonResponse
     */
    public function show(Subscription $subscription)
    {
        //
        return response()->json([
            'subscription' => new SubscriptionResource($subscription),
        ]);


    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Subscription $subscription
     * @return JsonResponse
     */
    public function update(Request $request, Subscription $subscription)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'debut' => ['required', 'date'],
            'fin' => ['required', 'date'],
            'status' => ['integer'],
        ]);

        return response()->json([
            'subscription' => new SubscriptionResource(
                $subscription->update($validated)
            ),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Subscription $subscription
     * @return JsonResponse
     */
    public function destroy(Subscription $subscription): JsonResponse
    {
        //
        $subscription->delete();

        return response()->json([
            'message' => 'Deletd',
        ]);
    }
}
