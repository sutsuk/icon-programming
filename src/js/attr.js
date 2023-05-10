function init_input_attr(){
  console.log("[CALL] init_input_attr()");
  if(target.type == "int"){
    $id("int-name").value = "";
  }else if(target.type == "double"){
    $id("double-name").value = "";
  }else if(target.type == "char"){
    $id("char-name").value = "";
  }else if(target.type == "print"){
    $id("print-type").selectedIndex = 0;
    $id("print-param-select").style.display = "none";
    $id("print-param").selectedIndex = 0;
    $id("print-string-input").style.display = "none";
    $id("print-string").value = "";
  }else if(target.type == "scan"){
    $id("scan-param").selectedIndex = 0;
  }else if(target.type == "if"){
    $id("if-param1-select").style.display = "none";
    $id("if-param2-select").style.display = "none";
    $id("if-value-input").style.display = "none";
    $id("if-type").selectedIndex = 0;
    $id("if-param1").selectedIndex = 0;
    $id("if-param2").selectedIndex = 0;
    $id("if-value").value = "";
  }else if(target.type == "subst"){
    $id("subst-param").selectedIndex = 0;
    $id("subst-value").value = "";
  }else if(target.type == "loopstart"){
    $id("loops-name").value = "";
  }else if(target.type == "loopbreak"){
    $id("loopb-name").selectedIndex = 0;
  }else if(target.type == "loopend"){
    $id("loope-name").selectedIndex = 0;
  }else if(target.type == "math"){
    $id("math-symbol").selectedIndex = 0;
    $id("math-plus").style.display = "none";
    $id("math-ptype").selectedIndex = 0;
    $id("math-minus").style.display = "none";
    $id("math-mtype").selectedIndex = 0;
    $id("math-times").style.display = "none";
    $id("math-ttype").selectedIndex = 0;
    $id("math-division").style.display = "none";
    $id("math-dtype").selectedIndex = 0;
    $id("math-param1-select").style.display = "none";
    $id("math-param1").selectedIndex = 0;
    $id("math-param2-select").style.display = "none";
    $id("math-param2").selectedIndex = 0;
    $id("math-param3-select").style.display = "none";
    $id("math-param3").selectedIndex = 0;
    $id("math-value1-input").style.display = "none";
    $id("math-value1").value = ""
    $id("math-value2-input").style.display = "none";
    $id("math-value2").selectedIndex = 0;
  }else if(target.type == "funcf"){
    $id("funcf-name").value = "";
    $id("funcf-ret").selectedIndex = 0;
  }else if(target.type == "funce"){
    $id("funce-ret").selectedIndex = 0;
  }
}

function print_change(){
  console.log("[CALL] print_change()");
  var display = ["none", "none"]
  switch($id("print-type").value){
    case "prm": display[0] = ""; break;
    case "vle": display[1] = ""; break;
  }
  $id("print-param-select").style.display = display[0];
  $id("print-string-input").style.display = display[1];
}

function if_change(){
  console.log("[CALL] if_change()");
  var display = ["none", "none", "none"];
  switch($id("if-type").value){
    case "tof": display = ["none", "none", ""]; break;
    case "pev": display = ["", "none", ""];     break;
    case "pep": display = ["", "", "none"];     break;
  }
  $id("if-param1-select").style.display = display[0];
  $id("if-param2-select").style.display = display[1];
  $id("if-value-input").style.display   = display[2];
}

function math_change(phase, op=""){
  console.log("[CALL] math_change()");
  var type, display;
  if(phase == 0){
    display = ["none", "none", "none", "none"];
    switch($id("math-symbol").value){
      case "plus":     display[0] = ""; break;
      case "minus":    display[1] = ""; break;
      case "times":    display[2] = ""; break;
      case "division": display[3] = ""; break;
    }
    $id("math-plus").style.display     = display[0];
    $id("math-minus").style.display    = display[1];
    $id("math-times").style.display    = display[2];
    $id("math-division").style.display = display[3];
  }else if(phase == 1){
    display = ["", "none", "none", "none", "none"];
    switch(op){
      case "plus":     type = $id("math-ptype").value; break;
      case "minus":    type = $id("math-mtype").value; break;
      case "times":    type = $id("math-ttype").value; break;
      case "division": type = $id("math-dtype").value; break;
    }
    switch(type){
      case "pp": display[1] = ""; display[2] = ""; break;
      case "pv": display[1] = ""; display[3] = ""; break;
      case "vv": display[3] = ""; display[4] = ""; break;
    }
    $id("math-param1-select").style.display = display[0];
    $id("math-param2-select").style.display = display[1];
    $id("math-param3-select").style.display = display[2];
    $id("math-value1-input").style.display  = display[3];
    $id("math-value2-input").style.display  = display[4];
  }
}

