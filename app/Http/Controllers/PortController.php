<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePortRequest;
use App\Http\Requests\UpdatePortRequest;
use App\Models\Port;
use Inertia\Inertia;

class PortController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Search/Index', ['ports' => 
        Port::all()]);
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
     * @param  \App\Http\Requests\StorePortRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePortRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Port  $port
     * @return \Illuminate\Http\Response
     */
    public function show(Port $port)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Port  $port
     * @return \Illuminate\Http\Response
     */
    public function edit(Port $port)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePortRequest  $request
     * @param  \App\Models\Port  $port
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePortRequest $request, Port $port)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Port  $port
     * @return \Illuminate\Http\Response
     */
    public function destroy(Port $port)
    {
        //
    }

    public function getSearchData () 
    {
        $ports = Port::orderBy('created_at', 'asc')->where(function ($query) {

            // 検索機能
            if ($search = request('search')) {
                $query->where('port_name', 'LIKE', "%{$search}%")->orWhere('access','LIKE',"%{$search}%")->orWhere('kind','LIKE',"%{$search}%")
                ;
            }

            // 8投稿毎にページ移動
        })->paginate(8);
    }
}
