<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Port;

class GetPortController extends Controller
{
    //DBから都道府県名が一致するデータを取ってくる
    public function getPortData(Request $request) {
        $word = $request["data"];
        // $word = "呉";
        $data = Port::where('access', 'like', "%{$word}%")->get();
        // $prefecture = $data["data"];
        // $portData = Port::where('access', 'like', "%{$prefecture}%");
        return $data;
    }
}

