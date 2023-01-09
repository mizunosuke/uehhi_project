<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSnsRequest;
use App\Http\Requests\UpdateSnsRequest;
use App\Models\Sns;
use App\Models\User;
use App\Models\Snsuser;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Collection;
use Illuminate\Support\Facades\Str;
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
        // dd($request);
        // if (count($request->all()) === 0) {
        // return Inertia::render('Sns/Index', ['posts' => $request]);
        // }

        // 定数で渡してあげるライクテーブルと普通の情報を合体
        // SQLでいうJOINを2回するやつ
        // return Inertia::render('Sns/Index', ['posts' => Sns::join('snsusers','snsusers.sns_id','=','sns.id')->get()]);
        // return Inertia::render('Sns/Index', ['posts' => Sns::with('user')->orderBy('Date', 'desc')->paginate(2)]);
        return Inertia::render('Sns/Index', ['posts' => Sns::with('user')->orderBy('Date', 'desc')->get()]);
        // return Inertia::render('Sns/Index', ['posts' => Sns::getAllOrderByDate()]);
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
            $path = $image->store('public/'.'snsImages');
            $pathDeleted = ltrim($path, 'public/'); // 戻り値のpathから public/ を削除する
            $pathAdded = 'storage/'.$pathDeleted;
        }
        $imagePath=['image' => $pathAdded];

        $data = $request->only(['content', 'kind', 'prefecture', 'area', 'date']);
        // $mergedImagePath = $data->push($imagePath);
        $mergedImagePath = array_merge($data, $imagePath);
        // dd($mergedImagePath);
        $mergedUserId = array_merge($mergedImagePath, ['user_id' => Auth::user()->id]);
        // dd($mergedUserId);
        // 下記１行のcodeでも書ける
        // $mergedImagePath["user_id"] = \Auth::id();
        // dd($mergedImagePath);
        $result = Sns::create($mergedUserId);

        // 登録したデータベースの情報とれた！！
        // dd($result);

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
    public function search(Request $request)
    {
        // バリデーション
        $validator = Validator::make($request->all(), [
            'word' => 'required | max:191'
        ]);
        // // バリデーションエラー
        if ($validator->fails()) {
            return redirect()
                ->route('sns.index')
                ->withInput()
                ->withErrors($validator);
        }

        // dd($request); // 値とれているか確認
        $keyword = trim($request->word); // 先頭と末尾の半角空白を削除する→空白があるとバグる可能性あり！！！
        // dd($keyword); // 空白削除されているか確認
        $users  = User::where('name', 'like', "%{$keyword}%")->pluck('id')->all();
        $result = Sns::with('user')
            ->where('kind', 'like', "%{$keyword}%")
            ->orWhere('content', 'like', "%{$keyword}%")
            ->orWhere('prefecture', 'like', "%{$keyword}%")
            ->orWhere('area', 'like', "%{$keyword}%")
            ->orWhereIn('user_id', $users)
            ->orderBy('Date', 'desc')
            ->get();
        // dd($result->all());
        return Inertia::render('Sns/Index', ['posts' => $result]);
    }
}
