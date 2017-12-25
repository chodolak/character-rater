<?php

use Illuminate\Database\Seeder;

class AnimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 500; $i++) { 
	    	DB::table('shows')->insert([
	            'name' => str_random(8),
	            'bio' => str_random(52),
                'image' => '/images/shows/rezero.jpeg',
                'thumbnail' => '/images/shows/rezero_thumb.jpeg',
	        ]);
        }
        for ($i=1; $i < 501; $i++) { 
            for ($k=0; $k < 50; $k++) { 
                DB::table('characters')->insert([
                    'name' => str_random(8),
                    'show_id' => $i,
                    'image' => '/images/characters/rezero_emilia.png',
                    'thumbnail' => '/images/characters/rezero_emilia_thumb.png',
                    'bio' => str_random(52),
                ]);
            }
    	}
        for ($i=0; $i < 500; $i++) { 
	    	DB::table('users')->insert([
	            'name' => str_random(8),
	            'email' => str_random(12).'@mail.com',
	            'password' => bcrypt('123456')
	        ]);
        }
        
        for ($i=1; $i < 501; $i++) {  
            for ($c=1; $c < 25001; $c++) {  
                DB::table('ratings')->insert([
                    'user_id' => $i,
                    'rating' => rand ( 1 , 5 ),
                    'character_id' => $c,
                ]);
                
            }
    	}
    }
}
