<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreThreadRequest;
use App\Http\Requests\UpdateThreadRequest;
use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class ThreadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // dd($request->all());
        
        // return Inertia::render('Search/ShowPort',["ports" => Port::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data = $request->all();
        // dd($data);
        //スレッドの投稿画面を表示
        return Inertia::render('Thread/Create',$data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreThreadRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        
        // バリデーション
        $validator = Validator::make($request->all(), [
            'text' => 'required'
        ]);
        // バリデーション:エラー
        if ($validator->fails()) {
            return redirect()
            ->route('thread.create')
            ->withInput()
            ->withErrors($validator);
        }

        $data = $request->all();
        // dd($data);
        

        $content = array_merge($data,['user_id' => Auth::user()->id]);
        // dd($content);
        
        // create()は最初から用意されている関数
        // 戻り値は挿入されたレコードの情報
        $result = Thread::create($content);
        //挿入したデータを取ってくる
        $newthread = Thread::with('user')->where('port_id', '=', $content["port_id"])->get();
        // dd($data["auth"]);
        // ルーティング「thread.index」にリクエスト送信（一覧ページに移動）
        return Inertia::render('Search/ShowPort',["ports" => $content["port_data"], "threads" => $newthread, "auth" => $data["auth"]]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function show(Thread $thread)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function edit(Thread $thread)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateThreadRequest  $request
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateThreadRequest $request, Thread $thread)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function destroy(Thread $thread)
    {
        //
    }
}
