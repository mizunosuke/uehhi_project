<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GetPortController extends Controller
{
    //DBから都道府県名が一致するデータを取ってくる
    public function getPortData(Request $request) {
        dd($request);
    }
}
