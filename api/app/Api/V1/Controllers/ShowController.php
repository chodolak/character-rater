<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Http\Controllers\Controller;
use App\Shows;
use Illuminate\Http\Request;

class ShowController extends Controller
{
    public function get(Request $request)
    {
        $name = $request->get('name');
        if($name) {
            $shows = Shows::where('name', 'LIKE', '%'.$name.'%');
        } else {
            $shows = new Shows;
        }
        return response()->json($shows->paginate(10));
    }

    public function getShowByName($name)
    {
        $shows = Shows::where('name', 'LIKE', '%'.$name.'%')->take(10)->get();
        return response()->json($shows);
    }

    public function getShowById($id)
    {
        $show = Shows::where('id', '=', $id)->get();
        return response()->json($show[0]);
    }
}
