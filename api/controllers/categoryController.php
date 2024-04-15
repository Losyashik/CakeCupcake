<?php
require_once("./components/connect.php");
class categoryController extends connectDB
{
    public function categoryAdd(array $post)
    {
        $name = $post['name'];
        $this->RequestProcessing("INSERT INTO `category`(`id`, `name`) VALUES (NULL,'$name')");
        return json_encode($this->getData("SELECT `id`, `name` FROM `category`"));
    }
    public function getCategoryes()
    {
        return json_encode($this->getData("SELECT `id`, `name` FROM `category`"));
    }
    public function categoryDelete(array $post)
    {
        $id = $post['id'];
        $this->RequestProcessing("DELETE FROM `category` WHERE `id` =  '$id'");
        return json_encode($this->getData("SELECT `id`, `name` FROM `category`"));

    }
    public function categoryUpdate(array $post)
    {
    }
}
