<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function edit(Request $request)
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     *
     * @param  \App\Http\Requests\ProfileUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        $request->user()->save();
        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);
        $user = $request->user();
        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Redirect::to('/');
    }

    // 紹介文変更関数
    public function introductionUpdate(Request $request)
    {
        //バリデーション
        $validator = Validator::make($request->all(), [
            'introduction' => 'required | max:191',
        ]);
        //バリデーション:エラー
        if ($validator->fails()) {
            return redirect()
            ->route('profile.edit')
            ->withInput()
            ->withErrors($validator);
        }
        //データ更新処理
        $result = User::find(Auth::id())->update($request->all());
        return redirect()->route('mypage.index');
    }

    // アイコン変更関数
    public function iconUpdate(Request $request)
    {
        //バリデーション
        $validator = Validator::make($request->all(), [
            'icon' => 'required | image',
        ]);
        //バリデーション:エラー
        if ($validator->fails()) {
            return redirect()
            ->route('profile.edit', $id)
            ->withInput()
            ->withErrors($validator);
        }
        //データ更新処理
        $result = User::find(Auth::id())->update($request->all());
        return redirect()->route('mypage.index');
    }


}
