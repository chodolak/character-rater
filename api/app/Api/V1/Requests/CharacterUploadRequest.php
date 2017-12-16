<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class CharacterUploadRequest extends FormRequest
{
    public function rules()
    {  
        $this->sanitize();
        return Config::get('chodolak.character_upload.validation_rules');
    }

    public function authorize()
    {
        return true;
    }

    public function sanitize()
    {
        $input = $this->all();

        $input['bio'] = filter_var($input['bio'], FILTER_SANITIZE_STRING);
        $input['data'] = filter_var($input['data'], FILTER_SANITIZE_STRING);
        $input['fileName'] = filter_var($input['fileName'], FILTER_SANITIZE_STRING);
        $input['name'] = filter_var($input['name'], FILTER_SANITIZE_STRING);
        $input['show'] = filter_var($input['show'], FILTER_SANITIZE_STRING);

        $this->replace($input);     
    }
}
