<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as EloquentModel;

class Feedback extends EloquentModel
{
    protected $fillable = ['user_id', 'message'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
