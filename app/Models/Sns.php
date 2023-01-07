<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sns extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'image',
        'kind',
        'prefecture',
        'area',
        'date',
        'content',
    ];

    public static function getAllOrderByUpdated_at()
    {
        return self::orderBy('updated_at', 'desc')->get();
    }
}
