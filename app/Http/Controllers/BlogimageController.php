<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogimageRequest;
use App\Http\Requests\UpdateBlogimageRequest;
use App\Models\Blogimage;

class BlogimageController extends Controller
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
     * @param  \App\Http\Requests\StoreBlogimageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBlogimageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blogimage  $blogimage
     * @return \Illuminate\Http\Response
     */
    public function show(Blogimage $blogimage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Blogimage  $blogimage
     * @return \Illuminate\Http\Response
     */
    public function edit(Blogimage $blogimage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBlogimageRequest  $request
     * @param  \App\Models\Blogimage  $blogimage
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBlogimageRequest $request, Blogimage $blogimage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blogimage  $blogimage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blogimage $blogimage)
    {
        //
    }
}
