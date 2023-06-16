<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');



require_once("Helpers/Router.php");
require_once("Helpers/helpers.php");
require_once("Models/Model.php");
require_once("Validator.php");


$base = "";

$router = new Router($base);

$router->post("/getStatsSingle", function () {
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $link = $_POST["link"];
    //$output = shell_exec('/c/Users/eslam/AppData/Local/Microsoft/WindowsApps/python3 test.py ' . $link);
    $output = shell_exec("python3 test.py " . $link);
    if (is_null($output)) {
        echo "why";
    }
    echo $output;
});

$router->post("/getStatsMulti", function () {
    $_POST = json_decode(file_get_contents('php://input'));
    $_POST = convert_object_to_array($_POST);
    $data = $_POST["data"];
    foreach ($data as $student) { //foreach element in $arr
        $link = $student[array_key_first($student)];
        echo $link;
    }


});


// $router->post("/upload", function () {
//     $_POST = json_decode(file_get_contents('php://input'));
//     $_POST = convert_object_to_array($_POST);
//     $_POST["SID"] = $_SESSION["ID"];
//     $image = $_POST["Product_Picture"];
//     $DIR = "./images/";
//     $file_chunks = explode(";base64,", $image);
//     $fileType = explode("image/", $file_chunks[0]);
//     $image_type = $fileType[1];
//     $base64Img = base64_decode($file_chunks[1]);
//     $id = uniqid();
//     $file = $DIR . $id . "." . $image_type;
//     file_put_contents($file, $base64Img);
//     $_POST["Product_Picture"] = "http://localhost/images/" . $id . "." . $image_type;
//     $productmodel = new products();
//     foreach ($_POST as $field) {
//         //echo $field;
//     }
//     $productmodel->insertdb3($_POST);
// });

$router->route();

?>