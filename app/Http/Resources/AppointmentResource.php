<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
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
            'id' => $this->id,
            'note'=> $this->note,
            'status'=> $this->status,
            'date'=> $this->date_appointment,
            'personnel'=> new PersonnelResource(
                $this->whenLoaded('personnel')),
            'patient'=> new PatientResource(
                $this->whenLoaded('patient')),
            'schedule'=> new SchedulerResource(
                $this->whenLoaded('scheduler')),
        ];
    }
}
