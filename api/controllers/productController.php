<?php
require_once("./components/connect.php");
class productController extends connectDB
{
    public function productAdd(array $post, array $file)
    {
        $name = $post['name'];
        $price = $post['price'];
        $category = $post['category'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $path = "./assets/images/products/" . convertRUcharacters($name) . ".$ext";
        try {
            if (move_uploaded_file($file['tmp_name'], "./." . $path)) {
                $this->RequestProcessing("INSERT INTO `products`(`id`, `name`, `image`, `price`, `id_category`) VALUES (NULL,'$name','$path','$price','$category')");
                return json_encode($this->getData("SELECT `products`.`id` as `id`, `products`.`name` as `name`, `image`, `price`, `category`.`name` as `category` FROM `products`,`category` WHERE `id_category` = `category`.`id`"));
            } else {
                throw new Exception("Файл не загружен");
            }
        } catch (Exception $e) {
            echo "Ошибка загрузки файла: " . $e->getMessage() . "\n";
        }
    }
    public function getProducts()
    {
        return json_encode($this->getData("SELECT `products`.`id` as `id`, `products`.`name` as `name`, `image`, `price`, `category`.`name` as `category` FROM `products`,`category` WHERE `id_category` = `category`.`id`"));
    }
    public function productDelete(array $post)
    {
        $id = $post['id'];
        $this->RequestProcessing("DELETE FROM `products` WHERE `id` =  '$id'");

        return json_encode($this->getData("SELECT `products`.`id` as `id`, `products`.`name` as `name`, `image`, `price`, `category`.`name` as `category` FROM `products`,`category` WHERE `id_category` = `category`.`id`"));
    }
    public function selectiveGet(array $post)
    {
        if ($post['id'] == "start") {
            $id = $this->getData("SELECT MIN(`id`) as id FROM `category`")[0]['id'];
        } else {
            $id = $post['id'];
        }
        return json_encode($this->getData("SELECT `products`.`id` as `id`, `products`.`name` as `name`, `image`, `price`, `category`.`name` as `category` FROM `products`,`category` WHERE `id_category` = `category`.`id` AND `category`.`id` = '$id'"));
    }
    public function productUpdate(array $post)
    {
    }
}
