<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SnsController;
use App\Http\Controllers\PortController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\BlogController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// 釣行日記 一覧画面 (ログインなしOK)
Route::resource('/blog', BlogController::class)
    ->names([
        'index' => 'blog.index'
    ]);
// 釣行日記 フリーワード検索 県名検索 魚種検索 (ログインなしOK)
Route::post('/blogSearch', [SnsController::class, 'freeWord'])->name('sns.freeWord');
Route::post('/blogSearch', [SnsController::class, 'prefecture'])->name('sns.prefecture');
Route::post('/blogSearch', [SnsController::class, 'fishKind'])->name('sns.fishKind');
// 釣行日記 投稿画面 投稿機能 詳細画面 削除画面 (ログインなしNG)
Route::resource('/blog', BlogController::class)
    ->names([
        'create' => 'blog.create',
        'store' => 'blog.store',
        'show' => 'blog.show',
        'destroy' => 'blog.destroy',
    ])
    ->middleware('auth');


// 釣り人の今 一覧画面 (ログインなしOK)
Route::resource('/sns', SnsController::class)
    ->names(['index'=>'sns.index',]);
// 釣り人の今 投稿画面 投稿機能 削除機能 (ログインなしNG)
Route::resource('/sns/create', SnsController::class)
    ->names(['create' => 'sns.create',
            'store' => 'sns.store',
            'destroy' => 'sns.destroy'])
    ->middleware('auth');
// 釣り人の今 フリーワード検索 (ログインなしOK)
Route::post('/snsSearch', [SnsController::class, 'search'])->name('sns.search');


//釣り場検索　searchに遷移したときにportcontrollerのindexメソッドを走らせる
Route::get('/search', [PortController::class, 'index'])
    ->name('search.index');

//釣り場検索　条件を指定して検索した場合にportControllerのshowlistメソッドを走らせる
// Route::get('/search', [PortController::class, 'showlist'])
//     ->name('search.showlist');

//釣り場詳細表示
Route::get('/search/showport',[PortController::class, 'show'])
    ->name('search.show');

Route::get('/community', function () {
    return Inertia::render('Community/Index');
})->name('community.index');

Route::get('/mypage', function () {
    return Inertia::render('Mypage/Index');
})->name('mypage.index');

Route::get('/search/showport/thread', [ThreadController::class, 'index'])
    ->name('thread.index');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
