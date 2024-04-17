<?php
require_once ("./components/connect.php");
class applicationController extends connectDB
{
    public function applicationAdd(array $post, array $file = false)
    {
        $user = $post['user'];
        $product = $post['product'];
        $filling = $post['filling'];
        $number = $post['number'];
        $addres = $post['addres'];
        $shipping_method = $post['shipping_method'];
        $description_design = $post['description_design'];
        try {
            if ($file) {
                $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
                $path = "./assets/images/applications/" . microtime() . ".$ext";
                if (move_uploaded_file($file['tmp_name'], "./." . $path)) {
                    $product = "NULL";
                    $path = "'$path'";
                } else {
                    throw new Exception("Файл не загружен");
                }
            }
            else{
                $description_design = "'$description_design'";
                $description_design = "'$description_design'";
            }
        } catch (Exception $e) {
            echo "Ошибка загрузки файла: " . $e->getMessage() . "\n";
        }
        $this->RequestProcessing("INSERT INTO `application`(`id`, `id_user`, `id_product`, `id_filling`, `number`, `addres`, `shipping_method`, `description_design`, `image`) VALUES ('[value-1]','$user','$product','$filling','$number','$addres','$shipping_method',$description_design,$path)");
        return json_encode($this->getData("SELECT `id`, `name` FROM `category`"));
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