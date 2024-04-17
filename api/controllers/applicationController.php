<?php
require_once("./components/connect.php");
class applicationController extends connectDB
{
    public function applicationAdd(array $post, $file)
    {
        $user = $post['user'];
        $product = $post['product'];
        $filling = $post['filling'];
        $number = $post['number'];
        $addres = $post['addres'];
        $date = $post['date'];
        $shipping_method = $post['shipping_method'];
        $description_design = $post['description_design'];
        if (count($this->getData("SELECT `id` FROM `application` WHERE `date` = '$date'")) >= 2) {
            return json_encode(["error" => TRUE, "message" => "Выберете другую дату"]);
        }
        try {
            if ($file) {
                $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
                $path = "./assets/images/applications/" . microtime() . ".$ext";
                if (move_uploaded_file($file['tmp_name'], "./." . $path)) {
                    $product = "NULL";
                    $path = "'$path'";
                    $description_design = "'$description_design'";
                } else {
                    throw new Exception("Файл не загружен");
                }
            } else {
                $description_design = "NULL";
                $path = "NULL";
            }
        } catch (Exception $e) {
            echo "Ошибка загрузки файла: " . $e->getMessage() . "\n";
        }
        $this->RequestProcessing("INSERT INTO `application`(`id`, `id_user`, `id_product`, `id_filling`, `number`, `addres`,`date`, `shipping_method`, `description_design`, `image`) VALUES ('[value-1]','$user','$product','$filling','$number','$addres','$date','$shipping_method',$description_design,$path)");
        return json_encode(["message" => "Ваш заказ принят, с вами свяжется менеджер для уточнения деталей заказа", "error" => FALSE]);
    }
    public function applicationGet()
    {
        return json_encode($this->getData("SELECT `id`, `name` FROM `category`"));
    }
    public function applicationCompleat(array $post)
    {
        $id = $post['id'];
        $this->RequestProcessing("DELETE FROM `category` WHERE `id` =  '$id'");
        return json_encode($this->getData("SELECT `id`, `name` FROM `category`"));
    }
}
