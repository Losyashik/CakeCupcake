<?php
require_once("./components/connect.php");
class userController extends connectDB
{
    public function signUp(array $post)
    {
        $name = $post['name'];
        $number = $post['number'];
        $password = $post['password'];
        $res = $this->RequestProcessing("SELECT `id`, `name` FROM `user` WHERE `number` = '$number'");
        if ($res->num_rows != 0) {
            return json_encode(['error' => TRUE, 'message' => "Такой пользватель существует"]);
        } else {
            $hash = password_hash($password, 0);
            $this->RequestProcessing("INSERT INTO `user`(`id`, `name`, `number`, `password_hash`, `password_text`) VALUES (NULL,'$name','$number','$hash','$password')");
            $id = $this->getData("SELECT `id` FROM `user` WHERE `number` = '$number'")[0]['id'];
            return $this->getDataUser($id);
        }
    }
    public function signIn(array $post)
    {
        $number = $post['number'];
        $password = $post['password'];
        $res = $this->RequestProcessing("SELECT `id`, `name` FROM `user` WHERE `number` = '$number'");
        if ($res->num_rows != 0) {
            $user = $this->getData("SELECT `id`, `password_hash` FROM `user` WHERE number = '$number'")[0];
            if (password_verify($password, $user['password_hash'])) {
                return $this->getDataUser($user['id']);
            } else {
                return json_encode(['error' => TRUE, 'message' => "Не верный логин или пароль"]);
            }
        }
        else return json_encode(['error' => TRUE, 'message' => "Не верный логин или пароль"]);
    }
    private function getDataUser($id)
    {
        $user = $this->getData("SELECT `id`, `name`, `number`, `admin` FROM `user` WHERE `id` = $id")[0];
        $user['error'] = FALSE;
        return json_encode($user);
    }
}
