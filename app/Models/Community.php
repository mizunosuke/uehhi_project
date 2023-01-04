<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'image',
        'prefecture',
        'area',
    ];
}
