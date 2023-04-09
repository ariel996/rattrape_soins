<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Observation;
use Illuminate\Http\Request;

class ObservationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        //
        $validated = $request->validate([
            'content' => ['required'],
            'appointment_id' => ['required']
        ]);

        Observation::query()->create($validated);
        return response()->json('Ajouté');
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Observation $observation
     * @return \Illuminate\Http\Response
     */
    public function show(Observation $observation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Observation $observation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Observation $observation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Observation $observation
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Observation $observation): \Illuminate\Http\JsonResponse
    {
        //
        $observation->delete();
        return response()->json('Deleted');
    }
}
