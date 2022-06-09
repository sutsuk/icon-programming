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
<script type="text/javascript">alert("生成したコード [<?php echo($code); ?>]"); </script>
<?php
  }
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta name="robots" content="noindex,nofollow,noarchive">
    <meta charset="UTF-8">
    <title>アイコンプログラミング</title>
    <link rel="stylesheet" href="iconp.css">
    <script type="text/javascript" src="iconp.js"></script>
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
        <p class="textbox">JavaScriptが有効ではありません</p>
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
            <h1 class="heading">名前</h1>
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
            <h1 class="heading">名前</h1>
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
            <h1 class="heading">名前</h1>
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
            <h1 class="heading">要素選択</h1>
          </li>
          <li>
            <select id="print-type" onchange="printchange()">
              <option value="">--選択してください--</option>
              <option value="prm">変数</option>
              <option value="vle">文字列</option>
            </select
          </li>
        </ul>
        <ul id="print-param-select" style="display:none;">
          <li>
            <h1 class="heading">変数選択</h1>
          </li>
          <li>
            <select id="print-param">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
        <ul id="print-string-input" style="display:none;">
          <li>
            <h1 class="heading">文字列入力</h1>
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
            <h1 class="heading">変数選択</h1>
          </li>
          <li>
            <select id="scan-param">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-if">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">タイプ</h1>
          </li>
          <li>
            <select id="if-type" onchange="ifchange()">
              <option value="">--選択してください--</option>
              <option value="tof">true or false</option>
              <option value="pev">変数 == 値</option>
              <option value="pep">変数 == 変数</option>
            </select>
          </li>
        </ul>
        <ul id="if-param1-select" style="display:none;">
          <li>
            <h1 class="heading">変数1</h1>
          </li>
          <li>
            <select id="if-param1">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
        <ul id="if-param2-select" style="display:none;">
          <li>
            <h1 class="heading">変数2</h1>
          </li>
          <li>
            <select id="if-param2">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
        <ul id="if-value-input" style="display:none;">
          <li>
            <h1 class="heading">値</h1>
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
            <h1 class="heading">変数選択</h1>
          </li>
          <li>
            <select id="subst-param">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
        <ul>
          <li>
            <h1 class="heading">値</h1>
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
            <h1 class="heading">名前</h1>
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
            <h1 class="heading">ループ選択</h1>
          </li>
          <li>
            <select id="loopb-name">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-loopend">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">ループ選択</h1>
          </li>
          <li>
            <select id="loope-name">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
      </div>
    </dialog>
    <dialog close id="dlg-math">
      <div class="row">
        <ul>
          <li>
            <h1 class="heading">計算式(＋,－,×,÷)</h1>
          </li>
          <li>
            <select id="math-symbol" onchange="mathchange(0)">
              <option value="">--選択してください--</option>
              <option value="plus">＋</option>
              <option value="minus">－</option>
              <option value="times">×</option>
              <option value="division">÷</option>
            </select>
          </li>
        </ul>
        <ul id="math-plus" style="display:none;">
          <li>
            <h1 class="heading">形式</h1>
          </li>
          <li>
            <select id="math-ptype" onchange="mathchange(1)">
              <option value="">--選択してください--</option>
              <option value="ppp">変数＝変数＋変数</option>
              <option value="ppv">変数＝変数＋値</option>
              <option value="vpv">変数＝値＋値</option>
            </select>
          </li>
        </ul>
        <ul id="math-minus" style="display:none;">
          <li>
            <h1 class="heading">形式</h1>
          </li>
          <li>
            <select id="math-mtype" onchange="mathchange(2)">
              <option value="">--選択してください--</option>
              <option value="pmp">変数＝変数－変数</option>
              <option value="pmv">変数＝変数－値</option>
              <option value="vmv">変数＝値－値</option>
            </select>
          </li>
        </ul>
        <ul id="math-times" style="display:none;">
          <li>
            <h1 class="heading">形式</h1>
          </li>
          <li>
            <select id="math-ttype" onchange="mathchange(3)">
              <option value="">--選択してください--</option>
              <option value="ptp">変数＝変数×変数</option>
              <option value="ptv">変数＝変数×値</option>
              <option value="vtv">変数＝値×値</option>
            </select>
          </li>
        </ul>
        <ul id="math-division" style="display:none;">
          <li>
            <h1 class="heading">形式</h1>
          </li>
          <li>
            <select id="math-dtype" onchange="mathchange(4)">
              <option value="">--選択してください--</option>
              <option value="pdp">変数＝変数÷変数</option>
              <option value="pdv">変数＝変数÷値</option>
              <option value="vdv">変数＝値÷値</option>
            </select>
          </li>
        </ul>
        <ul id="math-param1-select" style="display:none;">
          <li>
            <h1 class="heading">代入先</h1>
          </li>
          <li>
            <select id="math-param1">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
        <ul id="math-param2-select" style="display:none;">
          <li>
            <h1 class="heading">変数1</h1>
          </li>
          <li>
            <select id="math-param2">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
        <ul id="math-param3-select" style="display:none;">
          <li>
            <h1 class="heading">変数2</h1>
          </li>
          <li>
            <select id="math-param3">
              <option value="">--選択してください--</option>
            </select>
          </li>
        </ul>
        <ul id="math-value1-input" style="display:none;">
          <li>
            <h1 class="heading">値1</h1>
          </li>
          <li>
            <input id="math-value1" type="text">
          </li>
        </ul>
        <ul id="math-value2-input" style="display:none;">
          <li>
            <h1 class="heading">値2</h1>
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
            <h1 class="heading">名前</h1>
          </li>
          <li>
            <input id="funcf-name" type="text">
	  </li>
        </ul>
        <ul>
          <li>
            <h1 class="heading">引数</h1>
          </li>
	  <li>
            <div id="funcf-arg" class="row">
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <h1 class="heading">返り値</h1>
          </li>
          <li>
            <select id="funcf-ret">
              <option value="">--返り値なし--</option>
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
            <h1 class="heading">戻り値</h1>
          </li>
          <li>
            <select id="funce-ret">
              <option value="">--戻り値なし--</option>
            </select>
          </li>
        </ul>
      </div>
    </dialog>
    <canvas id="bkg-describe" style="display:none; position:absolute; top:0; left:0;">
    </canvas>
    <dialog close id="dlg-describe" style="max-width:400px;">
      <h1 class="heading">使い方</h1>
      <h1 class="heading">1. アイコンを追加</h1>
      <p style="font-size:16px; white-space:pre-wrap;">  左のアイコンから使いたいものをクリック
（スマホやタブレットならタップ）</p>
      <h1 class="heading">2. アイコンの設置</h1>
      <p style="font-size:16px; white-space:pre-wrap;">  1. で追加したアイコンをクリック（タップ）したまま置きたい場所まで持っていく</p>
      <h1 class="heading">3. アイコンのオプション設定</h1>
      <p style="font-size:16px; white-space:pre-wrap;">  2. で設置したアイコンをダブルクリック（ダブルタップ）し,設定画面を表示
アイコンに名付け（アルファベット）や値の設定をする
（仕様上，設定が完了しないと画面が閉じられません
削除してもう一度アイコンを追加してください）</p>
      <h1 class="heading">3. 実行</h1>
      <p style="font-size:16px; white-space:pre-wrap;">  開始アイコンをダブルクリック（ダブルタップ）し，アイコンを実行する

  C言語に変換をクリックするとC言語が表示されます．
（分岐アイコンを使用している場合，合流アイコンを間違えると正常なプログラムが表示されないことがあります．）</p>
      <h1 class="heading">4. 保存</h1>
      <p style="font-size:16px; white-space:pre-wrap;">実行可能な状態になっているプログラムは保存することができます．
開始アイコンをダブルクリック（ダブルタップ）し，保存をクリック（タップ）すると，コードが生成されるので，ハイフン'-'も含めて記録してください．

アイコンの配置と設定をすべて記録するので，途中で保存する場合は開始アイコンの右に終了アイコンを隣接させることで途中でも保存が可能です．</p>
      <h1 class="heading">5. 読み出し</h1>
      <p style="font-size:16px; white-space:pre-wrap;">以下にコードを張り付け，「読み込む」ことで保存したデータを読み込ませることができます．</p>
      <input id="kkey" placeholder="コード">
      <input type="button" value="読み込む" onclick="readkkey()"><br>
      <input id="clsdsc" type="button" value="閉じる" onclick="cdsc()">
      <h1 class="heading">6. 未実装</h1>
      <p style="font-size:16px; white-space:pre-wrap;">・ポインタ
・サブルーチン（関数）[仮実装テスト中](保存未対応)</p>
    </dialog>
    <form id="fkeep" method="POST" action="index.php" style="display:none;">
      <textarea id="keep" type="text" name="keep" autocomplete="on"></textarea>
    </form>
  </body>
</html>

