<?php

if (!empty($_POST['data'])) {
    $data = $_POST['data'];
    $fname = time();
    if (!empty($_GET['filename']) && $_GET['filename']!='undefined') {
        $fname = $_GET['filename'];
    }
    $file = fopen("../" .$fname, 'w');
    fwrite($file, $data);
    fclose($file);
}

?>
