<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Thread;

class Port extends Model
{
    use HasFactory;

    protected $fillable = [
        'port_name',
        'image',
        'access',
        'parking',
        'manager',
        'caution',
        'kind',
        'lat',
        'lng',
        'canfishing',
        'toilet',
        'light',
        'pc',
        'hc',
    ];

    //portsはthreadモデルを子に持つ
    public function threads()
    {
        //Threadテーブルから全部持ってきますよ〜(PortモデルとThreadモデルの連携　)
        return $this->hasMany(Thread::class);
    }

}
