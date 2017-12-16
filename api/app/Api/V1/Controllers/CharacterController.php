<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\Controller;
use App\Character;

class CharacterController extends Controller
{
    public function get()
    {
        $char = Character::find(1);
        return response()->json($char);
    }
}
