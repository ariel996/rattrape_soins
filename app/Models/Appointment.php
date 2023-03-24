<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Appointment extends Model
{
    use HasFactory;

    /**
     * Get All observation of the appointment
     * @return HasMany
     */
    public function observations(): HasMany
    {
        return $this->hasMany(Observation::class);
    }
}
