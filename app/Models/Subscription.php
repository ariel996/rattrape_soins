<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscription extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * get user that
     * @return HasMany
     */
    public function users(): HasMany
    {
        return $this->hasMany(UserSubscription::class);
    }
}
