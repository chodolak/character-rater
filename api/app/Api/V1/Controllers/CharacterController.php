<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\Controller;
use App\Characters;

class CharacterController extends Controller
{
    public function get($name)
    {
        $name = str_replace('-',' ',$name);
        $char = Characters::with('show')->where('name', 'LIKE', $name)->get();
        return response()->json($char);
    }

    public function getCharacterByShow($show, $character)
    {
        $show = str_replace('-',' ', $show);
        $character = str_replace('-',' ', $character);
        $requestedCharacter = Characters::join('shows', 'characters.show_id', '=', 'shows.id')
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
        return response()->json($requestedCharacter);
    }

}
