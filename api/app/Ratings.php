<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ratings extends Model
{
    protected $table = 'ratings';

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }

    public function character()
    {
        return $this->hasOne('App\Characters', 'id', 'character_id');
    }
}
