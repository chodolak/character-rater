<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shows extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'shows';

    public function characters()
    {
        return $this->hasMany('App\Characters');
    }
}
