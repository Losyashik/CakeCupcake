<?php
require_once("./components/connect.php");
class fillingController extends connectDB
{
    public function fillingAdd(array $post, array $file)
    {
        $name = $post['name'];
        $description = $post['description'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $path = "./assets/images/fillings/" . convertRUcharacters($name) . ".$ext";
        try {
            if (move_uploaded_file($file['tmp_name'], "./." . $path)) {
                $this->RequestProcessing("INSERT INTO `fillings`(`id`, `name`, `image`, `description`) VALUES (NULL,'$name','$path','$description')");
                return json_encode($this->getData("SELECT `id`, `name`, `image`, `description` FROM `fillings`"));
            } else {
                throw new Exception("Файл не загружен");
            }
        } catch (Exception $e) {
            echo "Ошибка загрузки файла: " . $e->getMessage() . "\n";
        }
    }
    public function getFillings()
    {
        return json_encode($this->getData("SELECT `id`, `name`, `image`, `description` FROM `fillings`"));
    }
    public function fillingDelete(array $post)
    {
        $id = $post['id'];
        $this->RequestProcessing("DELETE FROM `fillings` WHERE `id` =  '$id'");

        return json_encode($this->getData("SELECT `id`, `name`, `image`, `description` FROM `fillings`"));
    }
    public function fillingUpdate(array $post)
    {
    }
}
