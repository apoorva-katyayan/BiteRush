<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as EloquentModel;

class Message extends EloquentModel
{
    protected $fillable = ['name', 'email', 'message'];
}
