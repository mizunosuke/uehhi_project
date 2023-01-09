<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Thread extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
    ];

    //threadはPortモデルを親に持つ
    public function user()
    {
        //ThreadにUser情報を持たせる(withメソッドで紐付け)
        return $this->belongsTo(User::class);
    }

    // URLのport_idと一致する投稿データを取得する関数
    public static function getPostWherePortId()
    {
        //特定の漁港のスレッドデータのみ取得
        //Threadモデル(thread_table)からデータを取ってきますよ〜
        $thread = Thread::query()
        //port_idが一致するものを探す(port_idはURIから取得したものを渡す)
        ->find($port_id)
        ->threads()
        ->orderBy('created_at','desc')
        ->get();
    }
}
