<?php
// error_reporting("E_NOTICE");
class dataBase
{
    private $link;
    private $url = "";
    private $login = "root";
    private $password = "";
    private $database = "cake_capcake";
    public function __construct()
    {
        $this->link = mysqli_connect($this->url, $this->login, $this->password, $this->database);
    }
    public function getData(string $table, string $columns = "*", string $where = "1", string $orderBy = ""): string
    {
        $res = $this->link->query("SELECT $columns FROM $table WHERE $where" . (($orderBy != "") ? "ORDER BY $orderBy" : ""));
        $data = [];
        if ($res) {
            for ($data["list"] = []; $row = $res->fetch_assoc(); $data['list'][] = $row);
            $data['error_code'] = 0;
            $data['error'] = "";
            return json_encode($data);
        } else {
            $data['error_code'] = 1;
            $data['error'] = $this->link->error;
            $data['list'] = [];
            return json_encode($data);
        }
    }
    public function insertDate(array $columns, string $table, array $values): string
    {
        $query_values_srt = "";
        $query_columns_srt = "";
        foreach ($columns as $column) {
            $query_columns_srt .= "`$column`, ";
        }
        $query_columns_srt[-1] .= "";

        foreach ($values as $row) {
            $query_values_srt .= "(";
            foreach ($columns as $column) {
                $query_values_srt .= "'" . $row[$column] . "',";
            }
            $query_values_srt[-1] = ")";
        }
        $res = $this->link->query("INSERT INTO $table($query_columns_srt) VALUES $query_values_srt");
        $data = [];
        if ($res) {
            $data['error_code'] = 0;
            $data['error'] = "";
            return json_encode($data);
        } else {
            $data['error_code'] = 1;
            $data['error'] = $this->link->error;
            return json_encode($data);
        }
    }
    public function __destruct()
    {
        $this->link->close();
    }
}
