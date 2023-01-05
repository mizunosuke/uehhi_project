<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSnsRequest;
use App\Http\Requests\UpdateSnsRequest;
use App\Models\Sns;

class SnsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Sns/Index');
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
     * @param  \App\Http\Requests\StoreSnsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSnsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sns  $sns
     * @return \Illuminate\Http\Response
     */
    public function show(Sns $sns)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sns  $sns
     * @return \Illuminate\Http\Response
     */
    public function edit(Sns $sns)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSnsRequest  $request
     * @param  \App\Models\Sns  $sns
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSnsRequest $request, Sns $sns)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sns  $sns
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sns $sns)
    {
        //
    }
}
