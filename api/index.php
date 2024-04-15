<?php
require_once("./controllers/fillingController.php");
require_once("./controllers/categoryController.php");
require_once("./controllers/productController.php");

if (isset($_POST['category'])) {
    $obj = new categoryController();
    switch ($_POST['category']) {
        case "get": {
                echo ($obj->getCategoryes());
                break;
            }
        case "add": {
                echo ($obj->categoryAdd($_POST));
                break;
            }
        case "delete": {
                echo ($obj->categoryDelete($_POST));
                break;
            }
    }
}
if (isset($_POST['filling'])) {
    $obj = new fillingController();
    switch ($_POST['filling']) {
        case "get": {
                echo ($obj->getFillings());
                break;
            }
        case "add": {
                echo ($obj->fillingAdd($_POST, $_FILES['image']));
                break;
            }
        case "delete": {
                echo ($obj->fillingDelete($_POST));
                break;
            }
    }
}
if (isset($_POST['product'])) {
    $obj = new productController();
    switch ($_POST['product']) {
        case "selective-get": {
                echo ($obj->selectiveGet($_POST));
                break;
            }
        case "get": {
                echo ($obj->getProducts());
                break;
            }
        case "add": {
                echo ($obj->productAdd($_POST, $_FILES['image']));
                break;
            }
        case "delete": {
                echo ($obj->productDelete($_POST));
                break;
            }
    }
}