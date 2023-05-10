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

function input_attr(icon){
  console.log("[CALL] input_attr()");
  target.icon = icon;
  target.type = (data.icons[target.icon].type).split("_")[0];
  target.attr = cpyObj(data.icons[target.icon].attr);
  switch(target.type){
    case "start":     view_attr_start();           return;
    case "end":       view_attr_vain(target.type); return;
    case "up":        view_attr_vain(target.type); return;
    case "down":      view_attr_vain(target.type); return;
    case "rightup":   view_attr_vain(target.type); return;
    case "rightdown": view_attr_vain(target.type); return;
    case "right":     view_attr_vain(target.type); return;
    case "conf":      view_attr_vain(target.type); return;
  }
  if(target.attr.name != ""){
    switch(target.type){
      case "int":       view_attr_int();       return;
      case "double":    view_attr_double();    return;
      case "char":      view_attr_char();      return;
      case "print":     view_attr_print();     return;
      case "scan":      view_attr_scan();      return;
      case "if":        view_attr_if();        return;
      case "subst":     view_attr_subst();     return;
      case "loopstart": view_attr_loopstart(); return;
      case "loopbreak": view_attr_loopbreak(); return;
      case "loopend":   view_attr_loopend();   return;
      case "math":      view_attr_math();      return;
      case "funcf":     view_attr_funcf();     return;
      case "funct":     view_attr_funct();     return;
      case "funce":     view_attr_funce();     return;
    }
  }
  init_input_attr(target.type);
  events.ok = ()=>{
    $id("dlg-" + target.type).close();
    set_attr();
  };
  events.cancel = ()=>{
    $id("dlg-" + target.type).close();
  };
  $id("dlg-" + target.type).showModal();
}

function view_attr_start(){
  console.log("[CALL] view_attr_start()");
  var header = $id("view-header");
  var body = $id("view-body");
  header.innerHTML = target.type;
  body.innerHTML = "";
  add_html(body, make_html_button(text.exec, "start-exec"));
  add_html(body, make_html_button(text.gen_c, "start-gen_c"));
  $id("start-exec").setAttribute("onclick", 'exec_run()');
  $id("start-gen_c").setAttribute("onclick", 'gen_c()');
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_int(){
  console.log("[CALL] view_attr_int()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.name));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_double(){
  console.log("[CALL] view_attr_double()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.name));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_char(){
  console.log("[CALL] view_attr_char()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.name));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_print(){
  console.log("[CALL] view_attr_print()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.val.v1, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.name));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_scan(){
  console.log("[CALL] view_attr_scan()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.name));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_if(){
  console.log("[CALL] view_attr_if()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  if(target.attr.val.v1 == "true" || target.attr.val.v1 == "false"){
    temp_html.push(make_html_text(target.attr.val.v1, _, true));
  }else{
    temp_html.push(make_html_text(target.attr.val.v1+" == "+target.attr.val.v2, _, true));
  }
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.comp));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_subst(){
  console.log("[CALL] view_attr_subst()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.varname));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  temp_html.push(make_html_text(target.attr.val.v1, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.value));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_loopstart(){
  console.log("[CALL] iew_attr_loopstart()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.name));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_loopbreak(){
  console.log("[CALL] view_attr_loopbreak()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.name));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_loopend(){
  console.log("[CALL] view_attr_loopend()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.name));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_math(){
  console.log("[CALL] view_attr_math()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.val.v1, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.varname));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  temp_html.push(make_html_text(target.attr.val.v2, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.value+"1"));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  temp_html.push(make_html_text(target.attr.expr, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.expr));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  temp_html.push(make_html_text(target.attr.val.v3, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.value+"2"));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_funcf(){
  console.log("[CALL] view_attr_funcf()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.funcname));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_funct(){
  console.log("[CALL] view_attr_funct()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.funcname));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_funce(){
  console.log("[CALL] view_attr_funce()");
  var header = $id("view-header");
  var body = $id("view-body");
  var temp_html = new Array();
  header.innerHTML = target.type;
  body.innerHTML = "";
  temp_html.push(make_html_text(target.attr.name, _, true));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_header(text.funcname));
  temp_html.push(make_html_li(temp_html.pop()));
  temp_html.push(make_html_ul(temp_html.pop()+temp_html.pop(), "row"));
  add_html(body, temp_html.pop());
  events.close = ()=>{
    $id("dlg-view").close();
  };
  $id("dlg-view").showModal();
}

function view_attr_vain(){
  console.log("[CALL] view_attr_vain()");
  msg(text.vain);
}

function add_attr_numvar(name){
  console.log("[CALL] add_attr_numvar()");
  target.DOM = new Array();
  target.DOM.push($id("print-param"));
  target.DOM.push($id("scan-param"));
  target.DOM.push($id("if-param1"));
  target.DOM.push($id("if-param2"));
  target.DOM.push($id("subst-param"));
  target.DOM.push($id("math-param1"));
  target.DOM.push($id("math-param2"));
  target.DOM.push($id("math-param3"));
  target.DOM.push($id("funcf-ret"));
  target.DOM.push($id("funce-ret"));
  for(var i = 0; i < target.DOM.length; i++){
    add_html(target.DOM[i], make_html_option(name));
  }
  target.DOM = $id("funcf-arg");
  add_html(target.DOM, make_html_check(name, "funcf-args")+name);
}

function add_attr_chrvar(name){
  console.log("[CALL] add_attr_chrvar()");
  target.DOM = new Array();
  target.DOM.push($id("print-param"));
  target.DOM.push($id("scan-param"));
  target.DOM.push($id("if-param1"));
  target.DOM.push($id("if-param2"));
  target.DOM.push($id("subst-param"));
  target.DOM.push($id("funcf-ret"));
  target.DOM.push($id("funce-ret"));
  for(var i = 0; i < target.DOM.length; i++){
    add_html(target.DOM[i], make_html_option(name));
  }
  target.DOM = $id("funcf-arg");
  add_html(target.DOM, make_html_check(name, "funcf-args")+name);
}

function add_attr_loop(name){
  console.log("[CALL] add_attr_loop()");
  target.DOM = new Array();
  target.DOM.push($id("loopb-name"));
  target.DOM.push($id("loope-name"));
  for(var i = 0; i < target.DOM.length; i++){
    add_html(target.DOM[i], make_html_option(name));
  }
}

function add_attr_func(name, args, ret, begin){
  console.log("[CALL] add_attr_func()");
  data.funcs.push(new Func(name, args, ret, begin));
}

function set_attr_error(error){
  console.log("[CALL] set_attr_error()");
  msg(error);
  console.log("[ERROR] "+error);
}

function set_attr_int(){
  console.log("[CALL] set_attr_int()");
  target.name = $id("int-name").value;
  target.name = target.name.match(/^[a-zA-Z_]{1}[a-zA-Z0-9_]*/);
  target.attr.name = $id("int-name").value;
  if(target.name && target.name[0] == target.attr.name){
    data.icons[target.icon].attr.name = target.attr.name;
    add_attr_numvar(target.attr.name);
  }else{
    set_attr_error(text.wrongvar);
  }
}

function set_attr_double(){
  console.log("[CALL] set_attr_double()");
  target.name = $id("double-name").value;
  target.name = target.name.match(/^[a-zA-Z_]{1}[a-zA-Z0-9_]*/);
  target.attr.name = $id("double-name").value;
  if(target.name && target.name[0] == target.attr.name){
    data.icons[target.icon].attr.name = target.attr.name;
    add_attr_numvar(target.attr.name);
  }else{
    set_attr_error(text.wrongvar);
  }
}

function set_attr_char(){
  console.log("[CALL] set_attr_char()");
  target.name = $id("char-name").value;
  target.name = target.name.match(/^[a-zA-Z_]{1}[a-zA-Z0-9_]*/);
  target.attr.name = $id("char-name").value;
  if(target.name && target.name[0] == target.attr.name){
    data.icons[target.icon].attr.name = target.attr.name;
    add_attr_chrvar(target.attr.name);
  }else{
    set_attr_error(text.wrongvar);
  }
}

function set_attr_print(){
  console.log("[CALL] set_attr_print()");
  target.type = $id("print-type").value;
  if(target.type == "prm"){
    target.attr.val.v1 = $id("print-param").value;
    if(target.attr.val.v1 == ""){
      set_attr_error(text.novar);
    }else{
      data.icons[target.icon].attr.name   = "dummy";
      data.icons[target.icon].attr.val.t1 = "var";
      data.icons[target.icon].attr.val.v1 = target.attr.val.v1;
    }
  }else if(target.type == "vle"){
    target.attr.val.v1 = $id("print-string").value;
    data.icons[target.icon].attr.name   = "dummy";
    data.icons[target.icon].attr.val.t1 = "val";
    data.icons[target.icon].attr.val.v1 = target.attr.val.v1;
  }else{
    set_attr_error(text.wrongtype);
  }
}

function set_attr_scan(){
  console.log("[CALL] set_attr_scan()");
  target.name = $id("scan-param").value;
  if(target.name == ""){
    set_attr_error(text.novar);
  }else{
    data.icons[target.icon].attr.name = target.name;
  }
}

function set_attr_if(){
  console.log("[CALL] set_attr_if()");
  target.type = $id("if-type").value;
  if(target.type == "tof"){
    target.attr.val.v1 = $id("if-value").value;
    if(target.attr.val.v1 == "true" || target.attr.val.v1 == "false"){
      data.icons[target.icon].attr.name   = "dummy";
      data.icons[target.icon].attr.val.t1 = "tof";
      data.icons[target.icon].attr.val.v1 = target.attr.val.v1;
    }else{
      set_attr_error(text.nottof);
    }
  }else if(target.type == "pev"){
    target.attr.val.v1 = $id("if-param1").value;
    target.attr.val.v2 = $id("if-value").value;
    if(target.attr.val.v1 == ""){
      set_attr_error(text.novar);
    }else{
      data.icons[target.icon].attr.name   = "dummy";
      data.icons[target.icon].attr.val.t1 = "var";
      data.icons[target.icon].attr.val.v1 = target.attr.val.v1;
      data.icons[target.icon].attr.val.t2 = "val";
      data.icons[target.icon].attr.val.v2 = target.attr.val.v2;
    }
  }else if(type == "pep"){
    target.attr.val.v1 = $id("if-param1").value;
    target.attr.val.v2 = $id("if-param2").value;
    if(target.attr.val.v1 == "" || target.attr.val.v2 == ""){
      set_attr_error(text.novar);
    }else{
      data.icons[target.icon].attr.name   = "dummy";
      data.icons[target.icon].attr.val.t1 = "var";
      data.icons[target.icon].attr.val.v1 = target.attr.val.v1;
      data.icons[target.icon].attr.val.t2 = "var";
      data.icons[target.icon].attr.val.v2 = target.attr.val.v2;
    }
  }else{
    set_attr_error(text.wrongtype);
  }
}

function set_attr_subst(){
  console.log("[CALL] set_attr_subst()");
  target.name = $id("subst-param").value;
  target.attr.val.v1 = $id("subst-value").value;
  if(target.name == ""){
    set_attr_error(text.novar);
  }else{
    data.icons[target.icon].attr.name   = target.name;
    data.icons[target.icon].attr.val.t1 = "val";
    data.icons[target.icon].attr.val.v1 = target.attr.val.v1;
  }
}

function set_attr_loopstart(){
  console.log("[CALL] set_attr_loopstart()");
  target.name = $id("loops-name").value;
  if(target.name == ""){
    set_attr_error(text.novar);
  }else{
    data.icons[target.icon].attr.name = target.name;
    add_attr_loop(target.name);
  }
}

function set_attr_loopbreak(){
  console.log("[CALL] set_attr_loopbreak()");
  target.name = $id("loopb-name").value;
  if(target.name == ""){
    set_attr_error(text.novar);
  }else{
    data.icons[target.icon].attr.name = target.name;
  }
}

function set_attr_loopend(){
  console.log("[CALL] set_attr_loopend()");
  target.name = $id("loope-name").value;
  if(target.name == ""){
    set_attr_error(text.novar);
  }else{
    data.icons[target.icon].attr.name = target.name;
  }
}

function set_attr_math(){
  console.log("[CALL] set_attr_math()");
  target.type = $id("math-symbol").value;
  data.icons[target.icon].attr.expr = target.type;
  if(target.type == "plus"){
    target.attr.expr = $id("math-ptype").value;
  }else if(target.type == "minus"){
    target.attr.expr = $id("math-mtype").value;
  }else if(target.type == "times"){
    target.attr.expr = $id("math-ttype").value;
  }else if(target.type == "division"){
    target.attr.expr = $id("math-dtype").value;
  }else{
    set_attr_error(text.nosymbol);
    return;
  }
  if(target.attr.expr == "pp"){
    target.attr.val.v1 = $id("math-param1").value;
    target.attr.val.v2 = $id("math-param2").value;
    target.attr.val.v3 = $id("math-param3").value;
    if(target.attr.val.v1 == "" || target.attr.val.v2 == "" || target.attr.val.v3 == ""){
      set_attr_error(text.novar);
    }else{
      data.icons[target.icon].attr.name   = "dummy";
      data.icons[target.icon].attr.val.t1 = "var";
      data.icons[target.icon].attr.val.v1 = target.attr.val.v1;
      data.icons[target.icon].attr.val.t2 = "var";
      data.icons[target.icon].attr.val.v2 = target.attr.val.v2;
      data.icons[target.icon].attr.val.t3 = "var";
      data.icons[target.icon].attr.val.v3 = target.attr.val.v3;
    }
  }else if(target.attr.expr == "pv"){
    target.attr.val.v1 = $id("math-param1").value;
    target.attr.val.v2 = $id("math-param2").value;
    target.attr.val.v3 = $id("math-value1").value;
    if(target.attr.val.v1 == "" || target.attr.val.v2 == ""){
      set_attr_error(text.novar);
    }else{
      data.icons[target.icon].attr.name   = "dummy";
      data.icons[target.icon].attr.val.t1 = "var";
      data.icons[target.icon].attr.val.v1 = target.attr.val.v1;
      data.icons[target.icon].attr.val.t2 = "var";
      data.icons[target.icon].attr.val.v2 = target.attr.val.v2;
      data.icons[target.icon].attr.val.t3 = "val";
      data.icons[target.icon].attr.val.v3 = target.attr.val.v3;
    }
  }else if(target.attr.expr == "vv"){
    target.attr.val.v1 = $id("math-param1").value;
    target.attr.val.v2 = $id("math-value1").value;
    target.attr.val.v3 = $id("math-value2").value;
    data.icons[target.icon].attr.name   = "dummy";
    data.icons[target.icon].attr.val.t1 = "var";
    data.icons[target.icon].attr.val.v1 = target.attr.val.v1;
    data.icons[target.icon].attr.val.t2 = "val";
    data.icons[target.icon].attr.val.v2 = target.attr.val.v2;
    data.icons[target.icon].attr.val.t3 = "val";
    data.icons[target.icon].attr.val.v3 = target.attr.val.v3;
  }else{
    set_attr_error(text.nosymbol);
  }
}

function set_attr_funcf(){
  console.log("[CALL] set_attr_funcf()");
  var attr = new Object();
  target.name = $id("funcf-name").value;
  target.name = target.name.match(/^[a-zA-Z_]{1}[a-zA-Z0-9_]*/);
  if(target.name && target.name[0] == target.name.input){
    data.icons[target.icon].attr.name   = target.name.input;
    data.icons[target.icon].attr.val.t1 = "dest";
    data.icons[target.icon].attr.val.v1 = data.icons.length;
    data.icons[target.icon].attr.val.t2 = "args";
    data.icons[target.icon].attr.val.v2 = new Array();
    target.attr.val.v2 = $cl("funcf-args");
    for(var i = 0; i < target.attr.val.v2.length; i++){
      if(target.attr.val.v2[i].checked){
        (data.icons[target.icon].attr.val.v2).push(target.attr.val.v2[i].value);
      }
    }
    target.attr.val.v3 = $id("funcf-ret").value;
    data.icons[target.icon].attr.val.t3 = "ret";
    data.icons[target.icon].attr.val.v3 = target.attr.val.v3;
    for(var i = 0; i < def_icon.icons.length; i++){
      if(def_icon.icons[i].tag == "funct"){
        target.attr = new Attr();
        target.attr.name = target.name.input;
        icon_summon(i, -1, -1, cpyObj(target.attr));
      }else if(def_icon.icons[i].tag == "funce"){
        target.attr = new Attr();
        target.attr.val.t1 = "dest";
        target.attr.val.v1 = target.icon;
        target.attr.val.v3 = target.name.input;
        icon_summon(i, -1, -1, cpyObj(target.attr));
      }
    }
    attr.name  = target.name.input
    attr.args  = data.icons[target.icon].attr.val.v2;
    attr.ret   = data.icons[target.icon].attr.val.v3;
    attr.begin = data.icons.length - 2;
    add_attr_func(attr.name, attr.args, attr.ret, attr.begin);
  }else{
    set_attr_error(text.wrongfunc);
  }
}

function set_attr_funce(){
  console.log("[CALL] set_attr_funce()");
  target.attr.val.v2 = $id("funce-ret").value;
  data.icons[target.icon].attr.name = data.icons[target.icon].attr.val.v3;
  data.icons[target.icon].attr.val.t2 = "ret";
  data.icons[target.icon].attr.val.v2 = target.attr.val.v2;
}

function set_attr(){
  console.log("[CALL] set_attr()");
  target.attr = cpyObj(data.icons[target.icon].attr);
  switch(target.type){
    case "start":     view_attr_start();    break;
    case "end":       view_attr_vain();     break;
    case "int":       set_attr_int();       break;
    case "double":    set_attr_double();    break;
    case "char":      set_attr_char();      break;
    case "print":     set_attr_print();     break;
    case "scan":      set_attr_scan();      break;
    case "if":        set_attr_if();        break;
    case "up":        view_attr_vain();     break;
    case "down":      view_attr_vain();     break;
    case "rightup":   view_attr_vain();     break;
    case "rightdown": view_attr_vain();     break;
    case "right":     view_attr_vain();     break;
    case "conf":      view_attr_vain();     break;
    case "subst":     set_attr_subst();     break;
    case "loopstart": set_attr_loopstart(); break;
    case "loopbreak": set_attr_loopbreak(); break;
    case "loopend":   set_attr_loopend();   break;
    case "math":      set_attr_math();      break;
    case "funcf":     set_attr_funcf();     break;
    case "funct":     view_attr_vain();     break;
    case "funce":     set_attr_funce();     break;
  }
}

