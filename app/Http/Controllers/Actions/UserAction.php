<?php


namespace App\Http\Controllers\Actions;


use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserAction
{

    /**
     * create a nes user
     * @param CreateUserRequest $request
     * @param $role_id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model
     */
    public static function create(CreateUserRequest $request, $role_id)
    {
        return User::query()->create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'dob' => $request->dob,
            'password' => Hash::make($request->password),
            'role_id' => $role_id,
        ]);
    }
}
