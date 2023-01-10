<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Port>
 */
class PortFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        $names = ['上ノ浜港', '梅原港', '丸石港', '五日市港', '世上港', '大屋港', '情島港'];
        $accesses = ['広島県廿日市市', '広島県広島市', '広島県呉市', '広島県江田島市', '広島県竹原市', '広島県三原市', '広島県東広島市'];
        $parkings = ['有り/300円/5台まで', 'なし', '近隣にコインパーキング有り', '有り/無料/3台まで'];
        $images = ['images/port/port01.png','images/port/port02.png','images/port/port03.png'];
        $managers = ['大野漁業組合','広島漁業組合','江田島漁業組合','阿賀漁業組合','倉橋島漁業組合'];
        $cautions = ['立入禁止区域あり','漁港内タコ釣り禁止','船舶の漁港出入り時は仕掛けを回収して下さい','ポイ捨てが多いと釣り禁止となります','漁港内喫煙禁止'];
        $canfishings = ["可能", "不可"];
        $toilets = ['有り','なし'];
        $lights = ['有り','なし'];
        $kinds = ['アジ','サバ','スズキ','ブリ','サワラ','チヌ','キス','カワハギ','イカ','メバル'];


        $name = $names[rand(0, count($names) - 1)];
        $access = $accesses[rand(0, count($accesses) - 1)];
        $image = $images[rand(0, count($images) - 1)];
        $parking  = $parkings[rand(0, count($parkings) - 1)];
        $caution = $cautions[rand(0, count($cautions) - 1)];
        $manager = $managers[rand(0, count($managers) - 1)];
        $canfishing = $canfishings[rand(0, count($canfishings) - 1)];
        $toilet = $toilets[rand(0, count($toilets) - 1)];  
        $light = $lights[rand(0, count($lights) - 1)];
        $kind = $kinds[rand(0, count($kinds) - 1)];
        $pc = 34;
        $hc = rand(1,25);


        return [
            'port_name' => $name,
            'image' => $image,
            'access' => $access,
            'parking' => $parking,
            'manager' => $manager,
            'caution' => $caution,
            'kind' => $kind,
            'canfishing' => $canfishing,
            'toilet' => $toilet,
            'light' => $light,
            'pc' => $pc,
            'hc' => $hc,
        ];
    }
}
