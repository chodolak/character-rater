<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Characters extends Model
{
     /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'characters';

    public function show()
    {
        return $this->hasOne('App\Shows', 'id', 'show_id');
    }

    public function ratings()
    {
        return $this->hasManyThrough('App\Ratings', 'App\Characters', 'id', 'character_id');
    }

    public function avgRating()
    {
        return $this->ratings()
            ->selectRaw('avg(ratings.rating) as value')
            ->groupBy('ratings.character_id');
    }
}
