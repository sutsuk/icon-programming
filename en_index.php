<?php
  if(empty($_SERVER['HTTPS'])){
    header('Location: https://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
  }
?>
<?php
  if(!empty($_POST['keep'])){
    chdir('keep');
    while(1){
      $code = "";
      for($i = 0; $i < 9; $i++){
        if($i == 3 || $i == 6){
          $code = $code . '-';
        }
        $code = $code . substr("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", mt_rand(0, 35), 1);
      }
      $frw = fopen($code, "r");
      if($frw == false){
        fclose($frw);
        break;
      }else{
        fclose($frw);
      }
    }
    $frw = fopen($code, "w");
    $data = str_replace('<', '', $_POST['keep']);
    $data = str_replace('>', '', $data);
    fwrite($frw, sprintf("%s", $data));
    fclose($frw);
?>
<script type="text/javascript">alert("Generated Code [<?php echo($code); ?>]"); </script>
<?php
  }
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta name="robots" content="noindex,nofollow,noarchive">
    <meta charset="UTF-8">
    <title>Icon Programming</title>
    <link rel="stylesheet" href="iconp.css">
    <script type="text/javascript" src="en_iconp.js"></script>
    <script type="text/javascript">function keepini(){
<?php
  if(!empty($_GET['keep'])){
    $code = $_GET['keep'];
  }

  if(!empty($code)){
    chdir('keep');
    $frw = fopen($code, "r");
    if($frw == false){
      echo('<script type="text/javascript">alert("File Open Error");</script>');
    }else{
      while(1){
        if(feof($frw)){
          break;
        }
        $load = str_replace("\r", "", str_replace("\n", "", fgets($frw)));
        $data = explode('#', $load);
        if($data[0] == 0){
          if(!empty($data[1])){
            echo('summon(' . $data[1] . ',' . $data[2] . ',' . $data[3] . ',"' . $data[4] . '");');
          }
        }else if($data[0] == 1){
          if(!empty($data[1])){
            echo('setprm("' . $data[1] . '","' . $data[2] . '","' . $data[3] . '");');
          }
        }else{
          if(!empty($data[1])){
            echo('setlop("' . $data[1] . '","' . $data[2] . '");');
          }
        }
      }
    }
    fclose($frw);
  }
?>
    }</script>
  </head>
  <body onload="init()">
    <div id="background">
    </div>
    <div id="body">
      <noscript>
        <p class="textbox">JavaScript is not available.</p>
      </noscript>
    </div>
    <dialog close id="dlg-start">
    </dialog>
    <dialog close id="dlg-end">
    </dialog>
    <dialog close id="dlg-int">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Name</h1>
          </li>
          <li>
            <input id="int-name" type="text">
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-double">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Name</h1>
          </li>
          <li>
            <input id="double-name" type="text">
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-char">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Name</h1>
          </li>
          <li>
            <input id="char-name" type="text">
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-print">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Type Select</h1>
          </li>
          <li>
            <select id="print-type" onchange="printchange()">
              <option value="">--SELECT--</option>
              <option value="prm">Variable</option>
              <option value="vle">String</option>
            </select
          </li>
        </ul>
        <ul id="print-param-select" style="display:none;">
          <li>
            <h1 class="heading">Select Variable</h1>
          </li>
          <li>
            <select id="print-param">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
        <ul id="print-string-input" style="display:none;">
          <li>
            <h1 class="heading">Input String</h1>
          </li>
          <li>
            <input id="print-string" type="text">
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-scan">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Select Variable</h1>
          </li>
          <li>
            <select id="scan-param">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-if">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Select Type</h1>
          </li>
          <li>
            <select id="if-type" onchange="ifchange()">
              <option value="">--SELECT--</option>
              <option value="tof">true or false</option>
              <option value="pev">Variable == Value</option>
              <option value="pep">Variable == Variable</option>
            </select>
          </li>
        </ul>
        <ul id="if-param1-select" style="display:none;">
          <li>
            <h1 class="heading">Variable 1</h1>
          </li>
          <li>
            <select id="if-param1">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
        <ul id="if-param2-select" style="display:none;">
          <li>
            <h1 class="heading">Variable 2</h1>
          </li>
          <li>
            <select id="if-param2">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
        <ul id="if-value-input" style="display:none;">
          <li>
            <h1 class="heading">Value</h1>
          </li>
          <li>
            <input id="if-value" type="text">
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-up">
    </dialog>
    <dialog close id="dlg-down">
    </dialog>
    <dialog close id="dlg-rightup">
    </dialog>
    <dialog close id="dlg-rightdown">
    </dialog>
    <dialog close id="dlg-conf">
    </dialog>
    <dialog close id="dlg-right">
    </dialog>
    <dialog close id="dlg-subst">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Select Variable</h1>
          </li>
          <li>
            <select id="subst-param">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
        <ul>
          <li>
            <h1 class="heading">Value</h1>
          </li>
          <li>
            <input id="subst-value" type="text">
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-loopstart">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Name</h1>
          </li>
          <li>
            <input id="loops-name" type="text">
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-loopbreak">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Select Loop</h1>
          </li>
          <li>
            <select id="loopb-name">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-loopend">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Select Loop</h1>
          </li>
          <li>
            <select id="loope-name">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-math">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Select Operator(＋,－,×,÷)</h1>
          </li>
          <li>
            <select id="math-symbol" onchange="mathchange(0)">
              <option value="">--SELECT--</option>
              <option value="plus">＋</option>
              <option value="minus">－</option>
              <option value="times">×</option>
              <option value="division">÷</option>
            </select>
          </li>
        </ul>
        <ul id="math-plus" style="display:none;">
          <li>
            <h1 class="heading">Select Type</h1>
          </li>
          <li>
            <select id="math-ptype" onchange="mathchange(1)">
              <option value="">--SELECT--</option>
              <option value="ppp">Variable＝Variable＋Variable</option>
              <option value="ppv">Variable＝Variable＋Value</option>
              <option value="vpv">Variable＝Value＋Value</option>
            </select>
          </li>
        </ul>
        <ul id="math-minus" style="display:none;">
          <li>
            <h1 class="heading">Select Type</h1>
          </li>
          <li>
            <select id="math-mtype" onchange="mathchange(2)">
              <option value="">--SELECT--</option>
              <option value="pmp">Variable＝Variable－Variable</option>
              <option value="pmv">Variable＝Variable－Value</option>
              <option value="vmv">Variable＝Value－Value</option>
            </select>
          </li>
        </ul>
        <ul id="math-times" style="display:none;">
          <li>
            <h1 class="heading">Select Type</h1>
          </li>
          <li>
            <select id="math-ttype" onchange="mathchange(3)">
              <option value="">--SELECT--</option>
              <option value="ptp">Variable＝Variable×Variable</option>
              <option value="ptv">Variable＝Variable×Value</option>
              <option value="vtv">Variable＝Value×Value</option>
            </select>
          </li>
        </ul>
        <ul id="math-division" style="display:none;">
          <li>
		<h1 class="heading">Select Type</h1>
          </li>
          <li>
            <select id="math-dtype" onchange="mathchange(4)">
              <option value="">--SELECT--</option>
              <option value="pdp">Variable＝Variable÷Variable</option>
              <option value="pdv">Variable＝Variable÷Value</option>
              <option value="vdv">Variable＝Value÷Value</option>
            </select>
          </li>
        </ul>
        <ul id="math-param1-select" style="display:none;">
          <li>
            <h1 class="heading">Substitution destination</h1>
          </li>
          <li>
            <select id="math-param1">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
        <ul id="math-param2-select" style="display:none;">
          <li>
            <h1 class="heading">Variable 1</h1>
          </li>
          <li>
            <select id="math-param2">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
        <ul id="math-param3-select" style="display:none;">
          <li>
            <h1 class="heading">Variable 2</h1>
          </li>
          <li>
            <select id="math-param3">
              <option value="">--SELECT--</option>
            </select>
          </li>
        </ul>
        <ul id="math-value1-input" style="display:none;">
          <li>
            <h1 class="heading">Value 1</h1>
          </li>
          <li>
            <input id="math-value1" type="text">
          </li>
        </ul>
        <ul id="math-value2-input" style="display:none;">
          <li>
            <h1 class="heading">Value 2</h1>
          </li>
          <li>
            <input id="math-value2" type="text">
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-detail">
    </dialog>
    <dialog close id="dlg-exec">
    </dialog>
    <dialog close id="dlg-ccc">
    </dialog>
    <dialog close id="dlg-funcf">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Name</h1>
          </li>
          <li>
            <input id="funcf-name" type="text">
	  </li>
        </ul>
        <ul>
          <li>
            <h1 class="heading">Arguments</h1>
          </li>
	  <li>
            <div id="funcf-arg" class="row">
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <h1 class="heading">Select Return Value Destination</h1>
          </li>
          <li>
            <select id="funcf-ret">
              <option value="">--Nothing--</option>
            </select>
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-funct">
    </dialog>
    <dialog close id="dlg-funce">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">Select Return Value</h1>
          </li>
          <li>
            <select id="funce-ret">
              <option value="">--Nothing--</option>
            </select>
          </li>
        </ul>
      </div>
    </dialog>
    <canvas id="bkg-describe" style="display:none; position:absolute; top:0; left:0;">
    </canvas>
    <dialog close id="dlg-describe" style="max-width:400px;">
      <h1 class="heading">How to use</h1>
      <h1 class="heading">1. Add Icon</h1>
      <p style="font-size:16px; white-space:pre-wrap;">  Click the one you want to use from the icons on the left.
  (Tap if you use a smartphone or tablet)</p>
      <h1 class="heading">2. Put a icon</h1>
      <p style="font-size:16px; white-space:pre-wrap;">  Click (tap) the icon added in 1. and bring it to the place you want to put it.</p>
      <h1 class="heading">3. Option setting of icon</h1>
      <p style="font-size:16px; white-space:pre-wrap;"> Double-click (double-tap) the icon put in step 2 to display the setting screen.
Set the name (alphabet) and value for the icon.
  (Due to the specifications, the screen will not close until the settings are completed. Delete it and add the icon again.)</p>
      <h1 class="heading">3. Execution</h1>
      <p style="font-size:16px; white-space:pre-wrap;">  Double-click (double-tap) the start icon to execute the icon.
  Click 'Convert to C' to display C code.
(If you are using the branch icon, the correct program may not be displayed if you make a mistake in the junction icons.)</p>
      <h1 class="heading">4. Save</h1>
      <p style="font-size:16px; white-space:pre-wrap;">Double-click (double-tap) the start icon and click (tap) Save to generate the code. Record it including the hyphen'-'.

Since all the coordinates and settings of the icon are recorded, if you want to save in the middle, you can save in the middle by adjoining the end icon to the right of the start icon.</p>
      <h1 class="heading">5. Load</h1>
      <p style="font-size:16px; white-space:pre-wrap;">You can load the saved data by pasting the code below and click (tap) 'Load' .</p>
      <input id="kkey" placeholder="Code">
      <input type="button" value="Load" onclick="readkkey()"><br>
      <input id="clsdsc" type="button" value="Close" onclick="cdsc()">
      <h1 class="heading">6. Unimplemented</h1>
      <p style="font-size:16px; white-space:pre-wrap;">・Pointer
・Subroutine (function) [Temporary implementation test] (Not supported for saving)</p>
    </dialog>
    <form class="form back" id="fkeep" method="POST" action="index.php" style="display:none;">
      <textarea id="keep" type="text" name="keep" autocomplete="on"></textarea>
    </form>
  </body>
</html>

