<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\Api\V1\Requests\RatingRequest;
use App\Api\V1\Requests\RatingPUTRequest;
use App\Ratings;
use Auth;

class RateController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', []);
    }

    public function createRating(RatingRequest $request) 
    {
        $check = Ratings::where('user_id', '=', Auth::guard()->user()->id)
                        ->where('character_id', '=', $request->get('character'))
                        ->get();

        if (sizeof($check) !== 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'rating already exists for that character',
            ], 400);
        }
        $rating = new Ratings;
        $rating->user_id = Auth::guard()->user()->id;
        $rating->rating = floor($request->get('rating') * 2) / 2;
        $rating->character_id = $request->get('character');
        $rating->save();
        return response()->json($rating);
    }

    public function updateRating($id, RatingPUTRequest $request) 
    {
        $rating = Ratings::find($id);

        if (is_null ($rating)) {
            return response()->json([
                'status' => 'error',
                'message' => 'rating does not exist',
            ], 400);
        }
        
        if ( $rating->user_id !== Auth::guard()->user()->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'invalid user',
            ], 400);
        }
        $rating->rating = floor($request->get('rating') * 2) / 2;
        $rating->save();
        return response()->json($rating);
    }
}
