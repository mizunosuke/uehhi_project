<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBloglikeRequest;
use App\Http\Requests\UpdateBloglikeRequest;
use App\Models\Bloglike;

class BloglikeController extends Controller
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
     * @param  \App\Http\Requests\StoreBloglikeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBloglikeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bloglike  $bloglike
     * @return \Illuminate\Http\Response
     */
    public function show(Bloglike $bloglike)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bloglike  $bloglike
     * @return \Illuminate\Http\Response
     */
    public function edit(Bloglike $bloglike)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBloglikeRequest  $request
     * @param  \App\Models\Bloglike  $bloglike
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBloglikeRequest $request, Bloglike $bloglike)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bloglike  $bloglike
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bloglike $bloglike)
    {
        //
    }
}
