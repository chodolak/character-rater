<?php

namespace App\Api\V1\Controllers;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\Api\V1\Requests\CharacterUploadRequest;
use App\Api\V1\Requests\ShowRequest;
use Illuminate\Http\Request;
use Auth;
use App\Characters;
use App\Shows;
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
    public function createCharacter(CharacterUploadRequest $request)
    {
        $imageData = $request->get('image');
        $fileName = $request->get('fileName') . '.' . explode('/', explode(':', substr($imageData, 0, strpos($imageData, ';')))[1])[1];
        Image::make($request->get('image'))->save(public_path('images/characters/').$fileName);

        $thumbData = $request->get('thumbnail');
        $thumbName = $request->get('fileName') . '_thumb.' . explode('/', explode(':', substr($thumbData, 0, strpos($thumbData, ';')))[1])[1];
        Image::make($request->get('thumbnail'))->save(public_path('images/characters/').$thumbName);

        $fileUrl = '/images/characters/'.$fileName;
        $thumbUrl = '/images/characters/'.$thumbName;

        $character = new Characters;
        $character->name = $request->get('name');
        $character->show_id = $request->get('show');
        $character->image = $fileUrl;
        $character->thumbnail = $thumbUrl;
        $character->bio = $request->get('bio');
        $character->save();

        return response()->json($character);
    }

    public function updateCharacter($id, Request $request) 
    {
        $character = Characters::find($id);
        if ($request->get('name')) {
            $character->name = $request->get('name');
        }
        if ($request->get('bio')) {
            $character->bio = $request->get('bio');
        }
        if ($request->get('show')) {
            $character->show_id = $request->get('show');
        }
        
        if (!is_null($request->get('image')) && !is_null($request->get('fileName'))) {
            $imageData = $request->get('image');
            $fileName = $request->get('fileName') . '.' . explode('/', explode(':', substr($imageData, 0, strpos($imageData, ';')))[1])[1];
            Image::make($request->get('image'))->save(public_path('images/characters/').$fileName);
            $fileUrl = '/images/characters/'.$fileName;
            $character->image = $fileUrl;
        } else if(is_null($request->get('image')) && !is_null($request->get('fileName'))) {
            $oldFileName = str_replace('/images/characters/', '', $character->image);
            $fileExtension = explode('.', $oldFileName);
            $fileExtension = end($fileExtension);
            $fileUrl = '/images/characters/'.$request->get('fileName').'.'.$fileExtension;
            $character->image = $fileUrl;
        }

        if (!is_null($request->get('thumbnail')) && !is_null($request->get('fileName'))) {
            $thumbData = $request->get('thumbnail');
            $thumbName = $request->get('fileName') . '_thumb.' . explode('/', explode(':', substr($thumbData, 0, strpos($thumbData, ';')))[1])[1];
            Image::make($request->get('thumbnail'))->save(public_path('images/characters/').$thumbName);
            $thumbUrl = '/images/characters/'.$thumbName;
            $character->thumbnail = $thumbUrl;
        } else if(is_null($request->get('thumbnail')) && !is_null($request->get('fileName'))) {
            $oldThumbFileName = str_replace('/images/characters/', '', $character->thumbnail);
            $fileThumbExtension = explode('.', $oldThumbFileName);
            $fileThumbExtension = end($fileThumbExtension);
            $thumbUrl = '/images/characters/'.$request->get('fileName').'_thumb.'.$fileThumbExtension;
            $character->thumbnail = $thumbUrl;
        }
        $character->save();

        return response()->json($character);
    }

    public function deleteCharacter($id) 
    {
        $character = Characters::find($id);
        $character->delete();

        return response()->json(['status' => 'ok']);
    }

    public function createShow(ShowRequest $request) 
    {
        $imageData = $request->get('image');
        $fileName = $request->get('fileName') . '.' . explode('/', explode(':', substr($imageData, 0, strpos($imageData, ';')))[1])[1];
        Image::make($request->get('image'))->save(public_path('images/shows/').$fileName);
        
        $thumbData = $request->get('thumbnail');
        $thumbName = $request->get('fileName') . '_thumb.' . explode('/', explode(':', substr($thumbData, 0, strpos($thumbData, ';')))[1])[1];
        Image::make($request->get('thumbnail'))->save(public_path('images/shows/').$thumbName);

        $fileUrl = '/images/shows/'.$fileName;
        $thumbUrl = '/images/shows/'.$thumbName;

        $show = new Shows;
        $show->name = $request->get('name');
        $show->bio = $request->get('bio');
        $show->image = $fileUrl;
        $show->thumbnail = $thumbUrl;
        $show->save();

        return response()->json($show);
    }

    public function updateShow($id, Request $request) 
    {
        $show = Shows::find($id);
        if ($request->get('name')) {
            $show->name = $request->get('name');
        }
        if ($request->get('bio')) {
            $show->bio = $request->get('bio');
        }
        
        if (!is_null($request->get('image')) && !is_null($request->get('fileName'))) {
            $imageData = $request->get('image');
            $fileName = $request->get('fileName') . '.' . explode('/', explode(':', substr($imageData, 0, strpos($imageData, ';')))[1])[1];
            Image::make($request->get('image'))->save(public_path('images/shows/').$fileName);
            $fileUrl = '/images/shows/'.$fileName;
            $show->image = $fileUrl;
        } else if(is_null($request->get('image')) && !is_null($request->get('fileName'))) {
            $oldFileName = str_replace('/images/shows/', '', $show->image);
            $fileExtension = explode('.', $oldFileName);
            $fileExtension = end($fileExtension);
            $fileUrl = '/images/shows/'.$request->get('fileName').'.'.$fileExtension;
            $show->image = $fileUrl;
        }

        if (!is_null($request->get('thumbnail')) && !is_null($request->get('fileName'))) {
            $thumbData = $request->get('thumbnail');
            $thumbName = $request->get('fileName') . '_thumb.' . explode('/', explode(':', substr($thumbData, 0, strpos($thumbData, ';')))[1])[1];
            Image::make($request->get('thumbnail'))->save(public_path('images/shows/').$thumbName);
            $thumbUrl = '/images/shows/'.$thumbName;
            $show->thumbnail = $thumbUrl;
        } else if(is_null($request->get('thumbnail')) && !is_null($request->get('fileName'))) {
            $oldThumbFileName = str_replace('/images/shows/', '', $character->thumbnail);
            $fileThumbExtension = explode('.', $oldThumbFileName);
            $fileThumbExtension = end($fileThumbExtension);
            $thumbUrl = '/images/shows/'.$request->get('fileName').'_thumb.'.$fileThumbExtension;
            $show->thumbnail = $thumbUrl;
        }
        $show->save();

        return response()->json($show);
    }

    public function deleteShow($id) 
    {
        $show = Shows::find($id);
        $show->delete();

        return response()->json(['status' => 'ok']);
    }
}
