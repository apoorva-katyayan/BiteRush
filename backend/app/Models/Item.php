<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as EloquentModel;

class Item extends EloquentModel
{
    protected $fillable = [
        'image', 'name', 'price', 'desc', 'category', 'food_type', 'available'
    ];

    protected $casts = [
        'available' => 'boolean',
        'price' => 'float',
    ];
}
