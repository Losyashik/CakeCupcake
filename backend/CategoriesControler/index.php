<?php
require_once("./../connect.php");
$con = new DataBase();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo $con->getData("category");
        break;
    case 'POST':
        switch ($_POST['_method']) {
            case 'PUT':
              
                echo "put";
                break;
            case "DELETE":
                # code...
                echo "Delete";
                break;
            default:
                # code...
                break;
        }
        break;
}
