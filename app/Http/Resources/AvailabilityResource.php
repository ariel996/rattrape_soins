<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AvailabilityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'day'=>$this->day,
            'debut'=>$this->debut,
            'fin'=>$this->fin,
            'duration'=>$this->duration,
            'personnel'=> new PersonnelResource($this->whenLoaded('personnel'))
        ];
    }
}
