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

    public array $days = [
        'Monday' => 'Lundi',
        'Tuesday' => 'Mardi',
        'Wednesday' => 'Mercredi',
        'Thursday' => 'Jeudi',
        'Friday' => 'Vendredi',
        'Saturday' => 'Samedi',
        'Sunday' => 'Dimanche',
    ];

    public function initPersonnelAvailability($personnelId)
    {
        $availability = [];
        foreach ($this->days as $day) {
            $availability [] = [
                'day' => $day,
                'debut' => 0,
                'fin' => 0,
                'duration' => 0,
                'personnel_id' => $personnelId,
                'break_begin' => 0,
                'break_end' => 0,
            ];
        }
        $this->newQuery()->upsert($availability, ['day']);
    }

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
