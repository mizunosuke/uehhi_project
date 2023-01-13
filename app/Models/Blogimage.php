<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogimage extends Model
{
    use HasFactory;

    protected $fillable = [
        'blog_id',
        'image_path',
    ];
}
