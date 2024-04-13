<?php
require_once("./controllers/fillingController.php");
// require_once("");
// require_once("");
if (isset($_POST['category']))
    switch ($_POST['category']) {
        case "add": {
                break;
            }
        case "delete": {
                break;
            }
    }
if (isset($_POST['filling']))
    switch ($_POST['filling']) {
        case "get": {
            $obj = new fillingController();
            echo ($obj->getFillings());
            break;
        }
        case "add": {
                $obj = new fillingController();
                echo ($obj->fillingAdd($_POST, $_FILES['image']));
                break;
            }
        case "delete": {
                $obj = new fillingController();
                echo ($obj->fillingDelete($_POST));
                break;
            }
    }
