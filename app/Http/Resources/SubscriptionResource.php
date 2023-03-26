<?php

namespace App\Http\Resources;

use App\Models\UserSubscription;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $users = [];
        foreach ($this->users as $user) {
            $users [] = new UserResource($user->user);
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'user_count' => $this->users->count(),
            'users' => $users,
            'created_at' => $this->created_at,
            'status' => $this->status,
        ];
    }
}
