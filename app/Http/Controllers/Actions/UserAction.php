<?php


namespace App\Http\Controllers\Actions;


use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Adress;
use App\Models\User;
use Illuminate\Support\Facades\DB;
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
        return DB::transaction(function () use ($request, $role_id) {
            return tap(User::query()->create([
                'name' => $request->name,
                'surname' => $request->surname,
                'email' => $request->email,
                'dob' => $request->dob,
                'password' => Hash::make($request->password),
                'role_id' => $role_id,
            ]), function (User $user) use ($request) {
                // creating the address of the user
                Adress::query()->create([
                    'ville' => $request->ville,
                    'rue' => $request->rue,
                    'code_postal' => $request->code_postal,
                    'commune' => $request->commune,
                    'user_id' => $user->id,
                ]);
            });
        });
    }
}
