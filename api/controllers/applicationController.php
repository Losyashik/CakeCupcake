<?php
require_once("./components/connect.php");
class applicationController extends connectDB
{
    public function applicationAdd(array $post, $file)
    {
        $user = $post['user'];
        $product = isset($post['product']) ? "'".$post['product']."'" : "NULL";
        $filling = $post['filling'];
        $number = $post['number'];
        $addres = $post['addres'];
        $date = $post['date'];
        $shipping_method = $post['shipping_method'];
        $path = "NULL";
        $description_design = isset($post['description_design']) ? "'".$post['description_design']."'" : "NULL";
        if (count($this->getData("SELECT `id` FROM `application` WHERE `date` = '$date'")) >= 2) {
            return json_encode(["error" => TRUE, "message" => "Выберете другую дату"]);
        }
        try {
            if ($file) {
                $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
                $path = "./assets/images/applications/" . time() . ".$ext";
                if (move_uploaded_file($file['tmp_name'], "./." . $path)) {
                    $path = "'$path'";
                } else {
                    throw new Exception("Файл не загружен");
                }
            }
        } catch (Exception $e) {
            echo "Ошибка загрузки файла: " . $e->getMessage() . "\n";
        }
        $this->RequestProcessing("INSERT INTO `application`(`id`, `id_user`, `id_product`, `id_filling`, `number`, `addres`,`date`, `shipping_method`, `description_design`, `image`) VALUES (NULL,'$user',$product,'$filling','$number','$addres','$date','$shipping_method',$description_design,$path)");
        return json_encode(["error" => FALSE]);
    }
    public function applicationGet()
    {
        $data = [];
        $res = $this->RequestProcessing("SELECT * FROM `application` where id_status NOT IN (SELECT id FROM status WHERE name IN ('Завершен','Отказано'))");
        while ($row = $res->fetch_assoc()) {
            $row['user'] = $this->getData("SELECT `name` FROM `user` WHERE id = " . $row['id_user'])[0]['name'];
            if ($row['id_product'] != NULL) {
                $row['product'] = $this->getData("SELECT `name` FROM `products` WHERE id = " . $row['id_product'])[0]['name'];
            }
            $row["filling"] = $this->getData("SELECT `name` FROM `fillings` WHERE id = " . $row['id_filling'])[0]['name'];
            $row["shipping_method"] = $row["shipping_method"]==1?"Самовывоз":"Доставка";
            $data[] = $row;
        }
        return json_encode($data);
    }
    public function applicationEditStatus(array $post)
    {
        $id = $post['id'];
        $status = $post['status'];
        $this->RequestProcessing("UPDATE `application` SET `id_status` = '$status' WHERE `id` = $id");
        return $this->applicationGet();
    }
    public function applicationGetUser(array $post){
        $data = [];
        $res = $this->RequestProcessing("SELECT * FROM `application` where id_user='{$post['id']}'");
        while ($row = $res->fetch_assoc()) {
            $row['user'] = $this->getData("SELECT `name` FROM `user` WHERE id = " . $row['id_user'])[0]['name'];
            if ($row['id_product'] != NULL) {
                $row['product'] = $this->getData("SELECT `name` FROM `products` WHERE id = " . $row['id_product'])[0]['name'];
                $row['image'] = $this->getData("SELECT `image` FROM `products` WHERE id = " . $row['id_product'])[0]['image'];
            }
            $row["filling"] = $this->getData("SELECT `name` FROM `fillings` WHERE id = " . $row['id_filling'])[0]['name'];
            $row["shipping_method"] = $row["shipping_method"]==1?"Самовывоз":"Доставка";
            $row['status'] = $this->getData("SELECT `name` FROM `status` WHERE id = " . $row['id_status'])[0]['name'];;
            $data[] = $row;
        }
        return json_encode($data);
    }
}
