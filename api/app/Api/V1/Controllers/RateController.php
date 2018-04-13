<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\Api\V1\Requests\RatingRequest;
use App\Api\V1\Requests\RatingPUTRequest;
use App\Characters;
use willvincent\Rateable\Rating;
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

    /**
     * Creates a rating for current user
     */
    public function createRating(RatingRequest $request) 
    {
        $check = Rating::where('user_id', '=', Auth::guard()->user()->id)
                        ->where('rateable_type', '=', 'App\Characters')
                        ->where('rateable_id', '=', $request->get('character'))
                        ->get();

        if (sizeof($check) !== 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'rating already exists for that character',
            ], 400);
        }
        $character = Characters::find($request->get('character'));

        $rating = new Rating;
        $rating->rating = floor($request->get('rating') * 2) / 2;;
        $rating->user_id = Auth::guard()->user()->id;
        $character->ratings()->save($rating);

        return response()->json($rating);
    }

    /**
     * Updates a rating by character id
     */
    public function updateRating($characterId, $id, RatingPUTRequest $request) 
    {
        $character = Characters::find($characterId);
        if (is_null ($character)) {
            return response()->json([
                'status' => 'error',
                'message' => 'character does not exist',
            ], 400);
        }

        $rating = Rating::find($id);

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
        $character->ratings()->save($rating);
        return response()->json($rating);
    }
}
