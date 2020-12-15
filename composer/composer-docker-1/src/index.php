<?php

require_once __DIR__ . "/vendor/autoload.php";

// === dev-dependencies ===
$errorHandler = new Whoops\Run;
$errorHandler->pushHandler(new Whoops\Handler\PrettyPageHandler);
$errorHandler->register();
// new kook(); // purposeful fail

// === autoloader ===
// manual require = :'(
// require __dir__ . "/classes/Move.php";
// require __dir__ . "/library/Lib.php";
// using psr-4 autoloading
use App\Book;
new Book(); // namespace defined above
echo "<br />";
new \App\TestBook(); // create instance using namespace
echo "<br />";
new \App\Models\Model(); // create instance using namespace
echo "<br />";
// using autoloaded classes
new Lib;
echo "<br />";
new Move;
echo "<br />";
// using files
connect();

// use Carbon\Carbon;

// sample variable data output
// $today = Carbon::now()->toDayDateTimeString();
// var_dump($today);

// // === sending mail ===
// $credentials = require __DIR__ . "/config/mail.php";
// // $mail_transport = new Swift_SmtpTransport::newInstance(
// //     $credentials['host'], $credentials['port'], $credentials['secure']
// // )->setUsername($credentials['username'])->setPassword($credentials['password']);
// // Create the Transport
// $transport = (new Swift_SmtpTransport('smtp.gmail.com', $credentials['port'], $credentials['secure']))
//   ->setUsername($credentials['username'])
//   ->setPassword($credentials['password'])
// ;

// // $mailer = Swift_Mailer::newInstance($mail_transport);
// // Create the Mailer using your created Transport
// $mailer = new Swift_Mailer($transport);

// // $message = Swift_Message::newInstance('Testing SwiftMailer')
// //     ->setFrom(['alex@insidenewcity.com' => "Alex Beaman"])
// //     ->setTo(['dabeamanator@gmail.com'])
// //     ->setBody('I am using swiftmailer in my project', 'text/html');
// // Create a message
// $message = (new Swift_Message('Wonderful Subject'))
//   ->setFrom(['alex@insidenewcity.com' => 'Alex Beaman'])
//   ->setTo(['dabeamanator@gmail.com'])
//   ->setBody('Here is the message itself')
//   ;

// // echo $mailer->send($message) ? $result = "Message sent successfully" : $result = "Sending Failed";
// // Send the message
// $result = $mailer->send($message);