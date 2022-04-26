<?php
include_once('../../../common.php');

echo json_encode(json_decode(file_get_contents('list.json'), true));