<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'account' => new UserResource($this->whenLoaded('user')),
            'address' => new AddressResource($this->whenLoaded('user.address')),
            'created_at' => $this->created_at,
        ];
    }
}
