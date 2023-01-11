<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Sns;
use App\Models\Blog;



class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $snsData = Sns::with('user')->orderBy('created_at', 'desc')->take(3)->get();
        $blogData = Blog::with('user')->orderBy('created_at', 'desc')->take(3)->get();
        return Inertia::render('Home/Home',["snsposts" => $snsData, "blogposts" => $blogData]);
    }
}
