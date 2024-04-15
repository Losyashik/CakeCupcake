<?php
function convertRUcharacters($str)
{
    $from = array('а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', ' ');
    $to = array('a', 'b', 'v', 'g', 'd', 'e', 'e', 'zh', 'z', 'i', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'kh', 'cz', 'ch', 'sh', 'shh', '', 'y', '', 'e', 'yu', 'ya', 'A', 'B', 'V', 'G', 'D', 'E', 'E', 'ZH', 'Z', 'I', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'KH', 'CZ', 'CH', 'SH', 'SHH', '', 'Y', '', 'E', 'YU', 'YA', '_');
    return str_replace($from, $to, $str);
}

class connectDB
{
    protected $hostname = "", $username = "root", $password = "", $databese = "cake_capcake", $link;
    protected function RequestProcessing(String $query)
    {
        try {
            if ($this->link = mysqli_connect($this->hostname, $this->username, $this->password, $this->databese))
                try {
                    $result = $this->link->query($query);
                    if ($result)
                        return $result;
                    else
                        throw new Exception("Ошибка базы данных:" . $this->link->error);
                } catch (Exception $e) {
                    echo 'Ошибка базы данных: ',  $e->getMessage(), "\n";
                } finally {
                    $this->link->close();
                }
            else
                throw new Exception("База данных не доступна");
        } catch (Exception $e) {
            echo 'PHP перехватил исключение: ',  $e->getMessage(), "\n";
        }
    }
    protected function getData(String $query)
    {
        $result = $this->RequestProcessing($query);
        for ($data = []; $row = $result->fetch_assoc(); $data[] = $row);
        return $data;
    }
}
