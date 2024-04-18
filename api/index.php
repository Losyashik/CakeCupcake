<?php
require_once("./controllers/fillingController.php");
require_once("./controllers/categoryController.php");
require_once("./controllers/productController.php");
require_once("./controllers/userController.php");
require_once("./controllers/applicationController.php");

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
if (isset($_POST['user'])) {
    $obj = new userController();
    switch ($_POST['user']) {
        case "singup": {
                echo ($obj->signUp($_POST));
                break;
            }
        case "singin": {
                echo ($obj->signIn($_POST));
                break;
            }
    }
}
if (isset($_POST['application'])) {
    $obj = new applicationController();
    switch ($_POST['application']) {
        case "add": {

                echo ($obj->applicationAdd($_POST, count($_FILES) ? $_FILES['image'] : FALSE));
                break;
            }
        case "get": {
                echo ($obj->applicationGet());
                break;
            }
        case "compleat": {
                echo ($obj->applicationCompleat($_POST));
                break;
            }
    }
}
