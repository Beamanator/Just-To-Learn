# json-response

## Installation

`composer require test/json-response`

## Usage

```php
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
new JsonResponse('unauthorized', '', $student);
```

### Param 1 (Required)

1. success or ok - 200 http status
1. unauthorized - 401 http status

### Param 2...

### Param 3...
