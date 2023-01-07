<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SnsController;
use App\Http\Controllers\PortController;

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

Route::get('/blog', function () {
    return Inertia::render('Blog/Index');
})->name('blog.index');

Route::resource('/sns', SnsController::class)
    ->names(['index'=>'sns.index',
            'search' => 'sns.search']);

Route::resource('/sns/create', SnsController::class)
    ->names(['create' => 'sns.create',
            'store' => 'sns.store',
            'destroy' => 'sns.destroy'])
    ->middleware('auth');

//釣り場検索
Route::resource('/search', PortController::class)
    ->names(['index' => 'search.index' ]);

Route::get('/community', function () {
    return Inertia::render('Community/Index');
})->name('community.index');

Route::get('/mypage', function () {
    return Inertia::render('Mypage/Index');
})->name('mypage.index');

Route::get('/thread', function () {
    return Inertia::render('Thread/Index');
})->name('thread.index');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
