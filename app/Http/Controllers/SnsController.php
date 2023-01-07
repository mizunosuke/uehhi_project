<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSnsRequest;
use App\Http\Requests\UpdateSnsRequest;
use App\Models\Sns;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;


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
        return Inertia::render('Sns/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSnsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSnsRequest $request)
    {
        // dd($request->all());
        // dd($request->file('image'));
        // dd($request->input('kind'));
        
        // バリデーション
        $validator = Validator::make($request->all(), [
            'content' => 'required | max:191',
            'image' => 'required | image',
            'kind' => 'required',
            'prefecture' => 'required',
            'area' => 'required',
            'date' => 'required',
        ]);
        // // バリデーションエラー
        if ($validator->fails()) {
            return redirect()
                ->route('sns.create')
                ->withInput()
                ->withErrors($validator);
        }
         // 一時保存されたUploadedFileの取得
        $image = $request->file('image');
        // ファイルの保存と保存されたファイルのパス取得
        $path = '';
        if (isset($image)) {
            $path = $image->store('snsImages');
        }
        $imagePath=['image'=>$path];
        // dd($imagePath);

        // $request->merge($imagePath);
        $request->$request->offsetSet('image', $path);
        $data = $request->all();
        dd($data);

        // $data = $request->only(['content', 'kind', 'prefecture', 'area', 'date']);
        // // dd($data);
        // $mergedImagePath = $data->merge($imagePath);
        // dd($mergedImagePath);
        // $mergedUserId = $mergedImagePath->merge(['user_id' => Auth::user()->id]);
        // dd($mergedUserId->all());
        $result = Sns::create($request);

        return redirect()->route('sns.index');
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

    /**
     * @param  \App\Models\Sns  $sns
     * @return \Illuminate\Http\Response
     */
    public function search(Sns $data)
    {
        return redirect()->route('sns.index');
    }
}
