<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\Controller;
use App\Characters;

class CharacterController extends Controller
{
    public function get()
    {
        
        $char = Characters::with('show')->find(1);;
        return response()->json($char);
    }
}
