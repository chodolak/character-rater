<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class RatingPUTRequest extends FormRequest
{
    public function rules()
    {  
        $this->sanitize();
        return Config::get('chodolak.rating_put.validation_rules');
    }

    public function authorize()
    {
        return true;
    }

    public function sanitize()
    {
        $input = $this->all();

        $input['rating'] = filter_var($input['rating'], FILTER_SANITIZE_STRING);

        $this->replace($input);     
    }
}
