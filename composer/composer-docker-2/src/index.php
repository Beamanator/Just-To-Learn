<?php

require_once __DIR__ . "/vendor/autoload.php";

use Superuniquename\ResponseClass\JsonResponse;

$student = array(
    'name' => 'John Doe',
    'course' => 'Software Engineering',
    'level' => '200',
    'collections' => [
        'books' => 'Intro to UML',
        'music' => 'rap'
    ]
);

// test class with various responses
// new JsonResponse('ok', '', $student);
// new JsonResponse('exception', '', $student);
new JsonResponse('unauthorized', '', $student);