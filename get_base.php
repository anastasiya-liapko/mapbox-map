<?php
/**
 * Created by PhpStorm.
 * User: danb
 * Date: 17/06/2019
 * Time: 12:22
 */
require_once 'config.php';
// Opens a connection to a MySQL server
function get_base ($query, $vals = array())
{
    $dbConnection = new PDO('mysql:dbname=' . DB_NAME . ';host=' . DB_HOST . ';charset=utf8', DB_USER, DB_PASS);
    if (!$dbConnection) {
        die('Not connected to base');
    }
    $dbConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbConnection->exec("set names utf8");
    $dbConnection->exec("SET SESSION group_concat_max_len = 1000000");
    $dbConnection->exec("SET sql_mode=''");

    $stmt = $dbConnection->prepare($query);
    $stmt->execute($vals);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function parseToXML($htmlStr)
{
    $xmlStr=str_replace('<','&lt;',$htmlStr);
    $xmlStr=str_replace('>','&gt;',$xmlStr);
    $xmlStr=str_replace('"','&quot;',$xmlStr);
    $xmlStr=str_replace("'",'&#39;',$xmlStr);
    $xmlStr=str_replace("&",'&amp;',$xmlStr);
    return $xmlStr;
}
 if (isset($_POST['map_params'])){
     print_r(
         json_encode(
             get_base ("SELECT * FROM start_position"),
             JSON_UNESCAPED_UNICODE));
    exit();
 } else {
     header("Content-type: text/xml");
// Start XML file, echo parent node

     echo "<?xml version='1.0' ?>";
     echo '<markers>';
     $result = get_base("SELECT * FROM markers WHERE to_show = ?", array(1));
     foreach($result as $key => $one_item){
         // Add to XML document node
         echo '<marker ';
         echo 'id="' . $one_item['id'] . '" ';
         echo 'parentId="' . $one_item['parent_id'] . '" ';
         echo 'name="' . parseToXML($one_item['name']) . '" ';
         echo 'address="' . parseToXML($one_item['address']) . '" ';
         echo 'lat="' . $one_item['lat'] . '" ';
         echo 'lng="' . $one_item['lng'] . '" ';
         echo 'type="' . $one_item['type'] . '" ';
         echo '/>';
     }
// End XML file
     echo '</markers>';
 }






//header("Content-type: text/xml");
//$xml = new DOMDocument( "1.0");
//$node = $xml->createElement("markers");
//$parnode = $xml->appendChild($node);
//
//foreach($result as $one_item){
//    $node1 = $xml->createElement("marker");
//    $node1->setAttribute("id", $one_item['id']);
//    $node1->setAttribute("name", $one_item['name']);
//    $node1->setAttribute("address", $one_item['address']);
//    $node1->setAttribute("lat", $one_item['lat']);
//    $node1->setAttribute("lng", $one_item['lng']);
//    $node1->setAttribute("type", $one_item['type']);
//    $new_node = $parnode -> appendChild($node1);
//}
//
//$xmlfile = $xml->saveXML();
//print_r($result);
?>