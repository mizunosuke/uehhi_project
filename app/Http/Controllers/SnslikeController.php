<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSnslikeRequest;
use App\Http\Requests\UpdateSnslikeRequest;
use App\Models\Snslike;

class SnslikeController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSnslikeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSnslikeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Snslike  $snslike
     * @return \Illuminate\Http\Response
     */
    public function show(Snslike $snslike)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Snslike  $snslike
     * @return \Illuminate\Http\Response
     */
    public function edit(Snslike $snslike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSnslikeRequest  $request
     * @param  \App\Models\Snslike  $snslike
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSnslikeRequest $request, Snslike $snslike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Snslike  $snslike
     * @return \Illuminate\Http\Response
     */
    public function destroy(Snslike $snslike)
    {
        //
    }
}
