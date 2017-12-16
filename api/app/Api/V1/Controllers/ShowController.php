<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\Controller;
use App\Shows;

class ShowController extends Controller
{
    public function get($name)
    {
        $shows = Shows::where('name', 'LIKE', '%'.$name.'%')->take(10)->get();
        return response()->json($shows);
    }
}
