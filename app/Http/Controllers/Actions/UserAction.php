<?php


namespace App\Http\Controllers\Actions;


use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;

class UserAction
{

    /**
     * create a nes user
     * @param CreateUserRequest $request
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model
     */
    public static function create(CreateUserRequest $request)
    {
        return User::query()->create($request->all());
    }
}
