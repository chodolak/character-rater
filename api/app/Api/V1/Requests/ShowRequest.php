<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class ShowRequest extends FormRequest
{
    public function rules()
    {  
        $this->sanitize();
        return Config::get('chodolak.show.validation_rules');
    }

    public function authorize()
    {
        return true;
    }

    public function sanitize()
    {
        $input = $this->all();

        $input['bio'] = filter_var($input['bio'], FILTER_SANITIZE_STRING);
        $input['name'] = filter_var($input['name'], FILTER_SANITIZE_STRING);

        $this->replace($input);     
    }
}
