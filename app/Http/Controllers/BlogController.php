<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Blog;
use App\Models\BlogImage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Collection;
use Illuminate\Support\Facades\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Blog/Index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Blog/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBlogRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBlogRequest $request)
    {
        // dd($request->all());
        // バリデーション
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'time' => 'required',
            'weather' => 'required',
            'tackle' => 'required',
            'lure' => 'required',
            'kind' => 'required',
            'port_id' => 'required',
            'access' => 'required',
            'tide' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'date' => 'required',
            'eyecatch' => 'required',
            'images' => 'required',
        ]);
        // // バリデーションエラー
        if ($validator->fails()) {
            return redirect()
                ->route('blog.create')
                ->withInput()
                ->withErrors($validator);
        }

         // 一時保存されたUploadedFileの取得
        $image = $request->file('eyecatch');
        // ファイルの保存と保存されたファイルのパス取得
        $path = '';
        if (isset($image)) {
            $path = $image->store('public/'.'eyecatchImages');
            $pathDeleted = ltrim($path, 'public/'); // 戻り値のpathから public/ を削除する
            $pathAdded = 'storage/'.$pathDeleted;
        }
        $imagePath=['eyecatch' => $pathAdded];

        $data = $request->except(['images']);
        $mergedImagePath = array_merge($data, $imagePath);
        $mergedUserId = array_merge($mergedImagePath, ['user_id' => Auth::user()->id]);
        $result = Blog::create($mergedUserId);

        // dd($result->all());
        // $imagedata = $request->only(['images']);
        // $images['image_path'] = $imagedata;
        // foreach($images as $data) {
        //     $imagedata = $data->file('images');
        //     // ファイルの保存と保存されたファイルのパス取得
        //     $p = '';
        //     if (isset($imagedata)) {
        //         $p = $imagedata->store('public/'.'blogImages');
        //         $pathDele = ltrim($p, 'public/'); // 戻り値のpathから public/ を削除する
        //         $pathAdd = 'storage/'.$pathDele;
        //     }
        //     $blogimagePath=['image_path' => $pathAdd];

        //     $total = array_merge($blogimagePath, ['blog_id' => $result['id']]);
        //     BlogImage::create($total);
        // }
        
        return redirect()->route('blog.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function blogShow(Request $request)
    {
        // dd($request->all());
        // $blog = Blog::with('user')->find($request["Blog_id"]);
        return Inertia::render('Blog/ShowBlog');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBlogRequest  $request
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        //
    }
}
