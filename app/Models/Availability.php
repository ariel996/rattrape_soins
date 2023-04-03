<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Availability extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the personnel information
     * @return BelongsTo
     */
    public function personnel(): BelongsTo
    {
        return $this->belongsTo(Personnel::class);
    }

    /**
     * get the schedulers for the availability
     * @return HasMany
     */
    public function schedulers(): HasMany
    {
        return $this->hasMany(Scheduler::class);
    }
}
