<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use willvincent\Rateable\Rateable;

class Characters extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'characters';

    use Rateable;
    
    public function show()
    {
        return $this->hasOne('App\Shows', 'id', 'show_id');
    }
}
