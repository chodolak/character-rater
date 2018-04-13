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
        $shows = $shows->paginate(10);
        foreach ($shows as $show) {
            $show->nameUrlSafe = str_replace(' ', '-', strtolower($show->name));
        }
        return response()->json($shows);
    }

    /**
     * Gets a show by name
     */
    public function getShowByName($name)
    {
        $shows = Shows::where('name', 'LIKE', '%'.$name.'%')->take(10)->get();
        return response()->json($shows);
    }

    /**
     * Get a show by id
     */
    public function getShowById($id)
    {
        $show = Shows::where('id', '=', $id)->get();
        return response()->json($show[0]);
    }
}
