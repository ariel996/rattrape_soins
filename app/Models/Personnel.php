<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Personnel extends Model
{
    use HasFactory;

    protected $with = ['user'];

    protected $guarded = [];

    /**
     * get information about the the user information
     * @return HasOne
     */
    public function user(): HasOne
    {
        return $this->HasOne(User::class);
    }

    /**
     * get personnel availability
     * @return HasMany
     */
    public function availability(): HasMany
    {
        return $this->hasMany(Availability::class);
    }

    /**
     * Get all personnel message
     * @return HasMany
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    /**
     * get all personnel appointment
     * @return HasMany
     */
    public function appointment(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

}
