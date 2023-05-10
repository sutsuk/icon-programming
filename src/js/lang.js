function set_text(){
  console.log("[CALL] set_text()");
  if(lang == "jp"){
    set_text_jp();
  }else if(lang == "en"){
    set_text_en();
  }
  target.DOM = $id("title");
  target.DOM.innerHTML = text.title;
  target.DOM = $id("exec-header");
  target.DOM.innerHTML = text.output;
  target.DOM = $cl("dlg-close");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.close;
  }
  target.DOM = $cl("text-close");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.close;
  }
  target.DOM = $cl("text-cancel");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.cancel;
  }
  target.DOM = $cl("text-ok");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.ok;
  }
  target.DOM = $cl("text-name");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.name;
  }
  target.DOM = $cl("text-variable");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
  }
  target.DOM = $cl("text-select-elm");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.select_elm;
  }
  target.DOM = $cl("text-select-var");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.select_var;
  }
  target.DOM = $cl("text-select-loop");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.select_loop;
  }
  target.DOM = $cl("text-select");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.select;
  }
  target.DOM = $cl("text-var");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
  }
  target.DOM = $cl("text-var1");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable+"1";
  }
  target.DOM = $cl("text-var2");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable+"2";
  }
  target.DOM = $cl("text-str");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.str;
  }
  target.DOM = $cl("text-value");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.value;
  }
  target.DOM = $cl("text-value1");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.value+"1";
  }
  target.DOM = $cl("text-value2");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.value+"2";
  }
  target.DOM = $cl("text-input-str");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.input_str;
  }
  target.DOM = $cl("text-type");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.type;
  }
  target.DOM = $cl("text-select-pev");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable+" == "+text.value;
  }
  target.DOM = $cl("text-select-pep");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable+" == "+text.variable;
  }
  target.DOM = $cl("text-expression");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.expression;
  }
  target.DOM = $cl("text-math-ppp");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
    target.DOM[i].innerHTML += "＋";
    target.DOM[i].innerHTML += text.variable;
  }
  target.DOM = $cl("text-math-ppv");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
    target.DOM[i].innerHTML += "＋";
    target.DOM[i].innerHTML += text.value;
  }
  target.DOM = $cl("text-math-vpv");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.value;
    target.DOM[i].innerHTML += "＋";
    target.DOM[i].innerHTML += text.value;
  }
  target.DOM = $cl("text-math-pmp");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
    target.DOM[i].innerHTML += "－";
    target.DOM[i].innerHTML += text.variable;
  }
  target.DOM = $cl("text-math-pmv");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
    target.DOM[i].innerHTML += "－";
    target.DOM[i].innerHTML += text.value;
  }
  target.DOM = $cl("text-math-vmv");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.value;
    target.DOM[i].innerHTML += "－";
    target.DOM[i].innerHTML += text.value;
  }
  target.DOM = $cl("text-math-ptp");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
    target.DOM[i].innerHTML += "×";
    target.DOM[i].innerHTML += text.variable;
  }
  target.DOM = $cl("text-math-ptv");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
    target.DOM[i].innerHTML += "×";
    target.DOM[i].innerHTML += text.value;
  }
  target.DOM = $cl("text-math-vtv");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.value;
    target.DOM[i].innerHTML += "×";
    target.DOM[i].innerHTML += text.value;
  }
  target.DOM = $cl("text-math-pdp");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
    target.DOM[i].innerHTML += "÷";
    target.DOM[i].innerHTML += text.variable;
  }
  target.DOM = $cl("text-math-pdv");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.variable;
    target.DOM[i].innerHTML += "÷";
    target.DOM[i].innerHTML += text.value;
  }
  target.DOM = $cl("text-math-vdv");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.value;
    target.DOM[i].innerHTML += "÷";
    target.DOM[i].innerHTML += text.value;
  }
  target.DOM = $cl("text-math-dest");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.dest;
  }
  target.DOM = $cl("text-return");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.return_val;
  }
  target.DOM = $cl("text-noreturn");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].innerHTML = text.noreturn;
  }
}

function set_text_jp(){
  console.log("[CALL] set_text_jp()");
  text.title       = "アイコンプログラミング";
  text.name        = "名前";
  text.type        = "タイプ";
  text.value       = "値";
  text.variable    = "変数";
  text.varname     = "変数名";
  text.str         = "文字列";
  text.funcname    = "関数名";
  text.close       = "閉じる";
  text.exec        = "実行する";
  text.gen_c       = "c言語を生成する";
  text.comp        = "条件式";
  text.expr        = "算術式";
  text.finish      = "終了";
  text.remove      = "削除";
  text.ok          = "完了";
  text.cancel      = "キャンセル";
  text.select      = "‐‐選択してください‐‐";
  text.select_elm  = "要素選択";
  text.select_var  = "変数選択";
  text.select_loop = "ループ選択";
  text.input_str   = "文字列入力";
  text.expression  = "計算式";
  text.dest        = "代入先";
  text.output      = "出力";
  text.param       = "引数";
  text.return_val  = "返り値";
  text.noreturn    = "‐‐返り値なし‐‐";
  text.reset       = "その場所には置くことが出来ません$$位置をリセットします";
  text.samevar     = "同じ名前の変数は既にあります";
  text.wrongvar    = "変数名はアルファベットから始めて下さい";
  text.wrongfunc   = "関数名はアルファベットから始めて下さい";
  text.wrongtype   = "タイプを選択してください";
  text.novar       = "変数を選択してください";
  text.nottof      = "trueまたはfalseを入力してください";
  text.nosymbol    = "演算子を選択してください";
  text.emptyvalue  = "値を設定して下さい";
  text.emptytype   = "種類を選択して下さい";
  text.vain        = "設定項目はありません";
  text.unknown     = "予期しないエラーが発生しました";
  text.border_x    = "テーブルのx軸の端を越えました";
  text.border_y    = "テーブルのy軸の端を越えました";
  text.noicon      = "アイコンが不連続です";
  text.noloop      = "対象のループがありません";
  text.noloopend   = "ループの終端が不明です";
  text.nofunc      = "関数が存在しません";
  text.nofuncbegin = "関数の開始位置が存在しません";
  text.execlimit   = "実行回数の上限です．$$無限ループになっていませんか？";
  text.genlimit    = "コード生成の上限です．$$無限ループになっていませんか？";
  text.wrongscope  = "スコープを確認してください";
  text.difftype    = "型が異なります";
  text.scan        = "値を入力してください";
}

function set_text_en(){
  console.log("[CALL] set_text_en()");
  text.title       = "IconProgramming";
  text.name        = "Name";
  text.type        = "Type";
  text.value       = "Value";
  text.variable    = "Variable";
  text.varname     = "Variable Name";
  text.str         = "String";
  text.funcname    = "Function Name";
  text.close       = "Close";
  text.exec        = "Execute";
  text.gen_c       = "Generate c code";
  text.comp        = "Compare";
  text.expr        = "Expression";
  text.finish      = "Finish";
  text.remove      = "Remove";
  text.ok          = "OK";
  text.cancel      = "Cancel";
  text.select      = "--Please Select--";
  text.select_elm  = "Select Element";
  text.select_var  = "Select Variable";
  text.select_loop = "Select Loop";
  text.input_str   = "Input String";
  text.expression  = "Expression";
  text.dest        = "Destination";
  text.output      = "Output";
  text.param       = "Parameter";
  text.return_val  = "Return";
  text.noreturn    = "‐‐No-return‐‐";
  text.reset       = "Couldn't put the icon.$$Reset the position.";
  text.samevar     = "A variable with the same name already exists.";
  text.wrongvar    = "Variable name must start with an alphabet";
  text.wrongfunc   = "Function name must start with an alphabet";
  text.wrongtype   = "Choose type";
  text.novar       = "Choose variable";
  text.nottof      = "Input true or false";
  text.nosymbol    = "Choose expression";
  text.emptyvalue  = "Set the value.";
  text.emptytype   = "Select a type.";
  text.vain        = "There is no setting attribute.";
  text.unknown     = "Unknown eroor occured";
  text.border_x    = "Table x border reached";
  text.border_y    = "Table y border reached";
  text.noicon      = "Icons are non continuous.";
  text.noloop      = "Target loop is not exists";
  text.noloopend   = "LoopEnd is unknown";
  text.nofunc      = "Function is not exists";
  text.nofuncbegin = "Start icon of function is not exist";
  text.execlimit   = "Execution limit reached!";
  text.genlimit    = "Code generation limit reached!";
  text.wrongscope  = "Check the scope";
  text.difftype    = "Type is different";
  text.scan        = "Input value";
}

