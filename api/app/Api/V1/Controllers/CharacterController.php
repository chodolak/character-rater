<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\Controller;
use App\Characters;
use Illuminate\Http\Request;
use App\Ratings;
use Auth;

class CharacterController extends Controller
{   
    public function get(Request $request)
    {
        $name = $request->get('name');
        $show = $request->get('show');

        $char = Characters::with('show');
        if($name) {
            $char->where('name', 'LIKE', '%'.$name.'%');
        }
        if($show) {
            $char->where('show_id', '=', $show);
        }
        return response()->json($char->paginate(10));
    }

    public function getCharacterById($id)
    {
        $char = Characters::with('show')->where('id', '=', $id)->get();
        return response()->json($char[0]);
    }

    public function getCharacterByName($name)
    {
        $name = str_replace('-',' ',$name);
        $char = Characters::with('show')->where('name', 'LIKE', $name)->get();
        return response()->json($char);
    }

    public function getCharacterByShow($show, $character)
    {
        $show = str_replace('-',' ', $show);
        $character = str_replace('-',' ', $character);
        $requestedCharacter = Characters::with('avgRating')->join('shows', 'characters.show_id', '=', 'shows.id')
            ->where('characters.name', 'LIKE', $character)
            ->where('shows.name', 'LIKE', $show)
            ->get(array(
                'characters.id',
                'characters.name',
                'characters.bio',
                'characters.image',
                'shows.name as show'
            ));
        $requestedCharacter = $requestedCharacter[0];
        $requestedCharacter->nameUrlSafe = str_replace(' ', '-', strtolower($requestedCharacter->name));
        $requestedCharacter->showUrlSafe = str_replace(' ', '-', strtolower($requestedCharacter->show));

        $prevCharacter = Characters::join('shows', 'characters.show_id', '=', 'shows.id')
            ->where('characters.id', '<', $requestedCharacter->id)
            ->where('shows.name', 'LIKE', $show)
            ->orderBy('characters.id', 'desc')
            ->limit(1)
            ->get(array(
                'characters.id',
                'characters.name',
                'characters.bio',
                'characters.image',
                'shows.name as show'
            ));

        $nextCharacter = Characters::join('shows', 'characters.show_id', '=', 'shows.id')
            ->where('characters.id', '>', $requestedCharacter->id)
            ->where('shows.name', 'LIKE', $show)
            ->limit(1)
            ->get(array(
                'characters.id',
                'characters.name',
                'characters.bio',
                'characters.image',
                'shows.name as show'
            ));
        if(sizeof($prevCharacter) !== 0) {
            $requestedCharacter->prev = $prevCharacter[0];
            $requestedCharacter->prev->nameUrlSafe = str_replace(' ', '-', strtolower($prevCharacter[0]->name));
            $requestedCharacter->prev->showUrlSafe = str_replace(' ', '-', strtolower($prevCharacter[0]->show));
        } else {
            $requestedCharacter->prev = null;
        }
        if(sizeof($nextCharacter) !== 0) {
            $requestedCharacter->next = $nextCharacter[0];
            $requestedCharacter->next->nameUrlSafe = str_replace(' ', '-', strtolower($nextCharacter[0]->name));
            $requestedCharacter->next->showUrlSafe = str_replace(' ', '-', strtolower($nextCharacter[0]->show));
        } else {
            $requestedCharacter->next = null;
        }

        $user = Auth::guard()->user();
        $rating = null;
        if (!is_null($user)) {
            $rating = Ratings::where('user_id', '=', $user->id)
                             ->where('character_id', '=', $requestedCharacter->id)
                             ->get();
            if(sizeof($rating) !== 0) {
                $requestedCharacter->ratingId = $rating[0]->id;
                $rating = $rating[0]->rating;
            } else {
                $rating = null;
            }
        }

        $requestedCharacter->rating = $rating;
        $requestedCharacter->avgRating = Ratings::where('character_id', '=', $requestedCharacter->id)->avg('rating');

        return response()->json($requestedCharacter);
    }

    public function getCharactersByShow($show, Request $request)
    {
        $show = str_replace('-',' ', $show);
        $characters = Characters::with('avgRating')->join('shows', 'characters.show_id', '=', 'shows.id')
            ->where('shows.name', 'LIKE', $show);

        $characterName = $request->get('name');
        if($characterName) {
            $characters->where('characters.name', 'LIKE', '%'.$characterName.'%');
        }

        $characters = $characters->paginate(10, array(
            'characters.id',
            'characters.name',
            'characters.bio',
            'characters.image',
            'characters.thumbnail',
            'shows.name as show'
        ));
        foreach ($characters as $character) {
            $character->nameUrlSafe = str_replace(' ', '-', strtolower($character->name));
            $character->showUrlSafe = str_replace(' ', '-', strtolower($character->show));
        }
        return response()->json($characters);
    }

}
