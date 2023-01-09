<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePortRequest;
use App\Http\Requests\UpdatePortRequest;
use App\Models\Port;
use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $request->all();

        $data = $request->all();

        if (!empty($query)) {
            // dump($data["prefecture"]);
            // dump($data["fishname"]);
            // dump($data["word"]);

            $pre = $data["prefecture"];
            $fishname = $data["fishname"];
            $word = $data["word"];

            // 検索リクエストの場合
            $lists = Port::where('port_name', 'like', "%{$word}%")->get();
            // ->orWhere('access', 'like', "%{$word}%")
            // ->orWhere('kind', 'like', "%{$word}%")
            // ->orWhere('access', 'like', "%{$pre}%")
            // ->orWhere('kind', 'like', "%{$fishname}%")
            

            //  dump($lists);

            return Inertia::render("Search/Index", ['ports' => 
            $lists]);
        } else {
            return Inertia::render("Search/Index", ['ports' => 
            Port::all()]);
        }
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
    public function show(Request $request)
    {
        
        //
        $port = Port::find($request["port_id"]);
        //dump($request["port_id"]);
        $thread = Thread::with('user')->where("port_id", "=", $request["port_id"])->get();
        // dump($thread);
        
        // $mergedData = array_merge($port, ["thread_data" => $thread]);
        // dd($mergedData->all());
        // $port["threadData"] = $thread;
        // dd($port);
        return Inertia::render('Search/ShowPort', ['ports' => 
        $port, 'threads' => $thread]);
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

    public function showlist (Request $request) 
    {
        ddd($request->all());

        $keyword = 
        // モデルを使用して、データベースから検索を実行する
        $lists = Port::where('port_name', 'like', "%{$keyword}%")
        ->orWhere('area', 'like', "%{$keyword}%")
        ->orWhere('prefecture', 'like', "%{$keyword}%")
        ->orWhere('kind', 'like', "%{$keyword}%")
        ->get();
        //データを受け取ってpropsとして渡す
        return Inertia::render('Search/Index', [
            'lists' => $lists
        ]);
    }
}
