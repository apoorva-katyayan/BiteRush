<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as EloquentModel;

class Order extends EloquentModel
{
    protected $fillable = [
        'user_id', 'mode', 'items', 'total_price', 'payment', 'is_paid', 'status'
    ];

    protected $casts = [
        'is_paid' => 'boolean',
        'total_price' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
