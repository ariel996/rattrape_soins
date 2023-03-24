<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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
}
