<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];

}
