<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'port_id',
        'user_id',
        'eyecatch',
        'title',
        'content',
        'access',
        'time',
        'weather',
        'tackle',
        'lure',
        'tide',
        'kind',
        'lat',
        'lng',
        'date',
    ];
        public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}
