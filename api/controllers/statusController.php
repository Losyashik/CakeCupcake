<?php
require_once("./components/connect.php");
class statusController extends connectDB{
    public function getStatuses()
    {
        return json_encode($this->getData("SELECT `id`, `name` FROM `status`"));
    }
}