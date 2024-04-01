<?php
require_once("./../connect.php");
$con = new DataBase();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['category']))
            echo $con->getData("product", "id, name, price, image", $where = "id_category ='" . $_GET['category'] . "'");
        else
            echo $con->getData("product");
        break;
    case 'POST':
        # code...
        break;
    case 'PUT':
        # code...
        break;
    case 'DELETE':
        # code...
        break;
}
