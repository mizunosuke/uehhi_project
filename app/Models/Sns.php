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

    public static function getAllOrderByDate()
    {
        return self::orderBy('Date', 'asc')->paginate(2);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
