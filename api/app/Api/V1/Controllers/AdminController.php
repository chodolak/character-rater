<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\Api\V1\Requests\CharacterUploadRequest;
use Auth;
use App\Character;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', []);
        $this->middleware('admin');
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(CharacterUploadRequest $request)
    {
        $imageData = $request->get('data');
        $fileName = $request->get('fileName') . '.' . explode('/', explode(':', substr($imageData, 0, strpos($imageData, ';')))[1])[1];
        Image::make($request->get('data'))->save(public_path('images/characters/').$fileName);
        $fileUrl = '/images/characters/'.$fileName;

        $character = new Character;
        $character->name = $request->get('name');
        $character->show = $request->get('show');
        $character->image = $fileUrl;
        $character->bio = $request->get('bio');
        $character->save();

        return response()->json(['path'=> $fileUrl]);
    }
}
