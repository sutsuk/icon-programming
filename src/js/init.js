function $id(id){
  return document.getElementById(id);
}

function $cl(cl){
  return document.getElementsByClassName(cl);
}

function GET(name){
  return params.get(name);
}

function make_html_header(text){
  var attr = 'class="header" ';
  return '<p '+attr+'>'+text+'</p>';
}

function make_html_text(value="", className="", readonly=false){
  var attr = 'type="text" ';
  if(className) attr += 'class="'+className+'" ';
  if(value)     attr += 'value="'+value+'" ';
  if(readonly)  attr += "readonly";
  return '<input '+attr+'>';
}

function make_html_check(value="", className=""){
  var attr = 'type="checkbox" ';
  if(className) attr += 'class="'+className+'" ';
  if(value)     attr += 'value="'+value+'" ';
  return '<input '+attr+'>';
}

function make_html_option(value=""){
  var attr = '';
  if(value) attr += 'value="'+value+'" ';
  return '<option '+attr+'>'+value+'</option>';
}

function make_html_ul(value="", className=""){
  var attr = '';
  if(className) attr += 'class="'+className+'" ';
  return '<ul '+attr+'>'+value+'</ul>';
}

function make_html_li(value=""){
  var attr = '';
  return '<li>'+value+'</li>';
}

function make_html_img(id="", className="", src="", hgt="", style=null){
  var attr = "";
  if(id)    attr += 'id="'+id+'" ';
  if(src)   attr += 'src="'+src+'" ';
  if(hgt)   attr += 'height="'+hgt+'px" ';
  if(style){
    if(style.top >= 0 && style.left >= 0){
      className += " abs"
      attr += 'style="top:'+style.top+'px; left:'+style.left+'px;"';
    }
  }
  if(className) attr += 'class="'+className+'" ';
  return '<img '+attr+'>';
}

function make_html_button(text="", id="", onclick=""){
  var attr = "";
  if(id)      attr += 'id="'+id+'" ';
  if(onclick) attr += 'onclick="'+onclick+'" ';
  return '<button '+attr+'>'+text+'</button>';
}

function add_html(dom, text){
  dom.insertAdjacentHTML("beforeEnd", text);
}

function cpyObj(src){
  return Object.assign({}, JSON.parse(JSON.stringify(src)));
}

function msg(str){
  $id("msg").innerHTML = str.replace(/\$\$/g, "\n");
  if($id("dlg-msg").open == false){
    $id("dlg-msg").showModal();
  }
}

function msg_close(){
  $id("dlg-msg").close();
  NEXT();
  NEXT = ()=>{};
}

function set_icons(){
  console.log("[CALL] set_icons()");
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/start.png", "start"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/end.png", "end"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/int.png", "int"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/double.png", "double"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/char.png", "char"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/print.png", "print"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/scan.png", "scan"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/if_1.png", "if_1"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/if_2.png", "if_2"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/up.png", "up"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/down.png", "down"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/rightup.png", "rightup"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/rightdown.png", "rightdown"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/right.png", "right"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/conf_1.png", "conf_1"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/conf_2.png", "conf_2"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/subst.png", "subst"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/loop_start.png", "loopstart"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/loop_break.png", "loopbreak"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/loop_end.png", "loopend"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/math.png", "math"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/funcf.png", "funcf"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/funct.png", "funct"));
  (def_icon.icons).push(new DefIcon("icons/" + lang + "/funce.png", "funce"));
  def_icon.bg = "icons/" + lang + "/background.png";
}

function Num(val){
  return parseFloat(val);
}

function Cast(val, type){
  switch(type){
    case "int":    return parseInt(val);
    case "double": return parseFloat(val);
  }
  return String(val);
}

function isNum(val){
  if(isInt(val) || isDouble(val)){
    return 1;
  }
  return 0;
}

function isInt(val){
  var val = String(val);
  var match = val.match(/^[0-9]+/);
  if(match && match[0] == val){
    return 1;
  }
  return 0;
}

function isDouble(val){
  var val = String(val);
  var match = val.match(/^[1-9]+[.][0-9]+|^0[.][0-9]+/);
  if(match && match[0] == val){
    return 1;
  }
  return 0;
}

function isNumType(type){
  switch(type){
    case "int":    return 1;
    case "double": return 1;
  }
  return 0;
}

function Initial(){
  var x, y, wdt, hgt;
  var p = 0;
  var BG = $id("background");
  var body = $id("body");
  if(GET("lang") == null){
    lang = "jp";
  }else{
    lang = GET("lang");
  }
  if(typeof LoadData === "function"){
    LoadData();
  }
  set_icons();
  set_text();
  for(var i = 0; i < def_table.hgt; i++){
    data.table.push(new Array());
    hgt = i * def_icon.hgt;
    for(var j = 0; j < def_table.wdt; j++){
      wdt = j * def_icon.wdt;
      add_html(BG, make_html_img(_, _, def_icon.bg, def_icon.hgt, new Loc(wdt, hgt)));
      data.table[i].push(-1);
    }
  }
  for(var i = 0; i < def_icon.icons.length; i++){
    if(def_icon.icons[i].tag == "start"){
      data.table[def_icon.start.y][def_icon.start.x] = def_icon.icons.length;
      x = def_icon.start.x;
      y = def_icon.start.y;
      data.table[y][x] = data.icons.length;
      target.icon = def_icon.icons[i];
      target.type = target.icon.tag;
      data.icons.push(new Icon(target.type, $id("img"+i), x, y, new Attr()));
      x *= def_icon.wdt;
      y *= def_icon.hgt;
      add_html(body, make_html_img("img"+i, _, target.icon.src, def_icon.hgt, new Loc(y, x)));
      $id("img"+i).addEventListener("click", view_attr_start);
      continue;
    }
    if(def_icon.icons[i].tag == "funct") continue;
    if(def_icon.icons[i].tag == "funce") continue;
    x = parseInt(p / def_icon.rows);
    y = (p++ % def_icon.rows);
    data.table[y][x] = def_icon.icons.length;
    x *= def_icon.wdt;
    y *= def_icon.hgt;
    add_html(body, make_html_img("img"+i, _, def_icon.icons[i].src, def_icon.hgt, new Loc(y, x)));
    $id("img"+i).setAttribute("onclick", "icon_summon("+i+", -1, -1, new Attr())");
  }
  $id("msg-close").addEventListener("click", msg_close);
  target.DOM = $cl("dlg-close");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].setAttribute("onclick", "events.close()");
  }
  target.DOM = $cl("text-close");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].setAttribute("onclick", "events.close()");
  }
  target.DOM = $cl("text-ok");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].setAttribute("onclick", "events.ok()");
  }
  target.DOM = $cl("text-cancel");
  for(var i = 0; i < (target.DOM).length; i++){
    target.DOM[i].setAttribute("onclick", "events.cancel()");
  }
  document.body.addEventListener("mousemove", icon_move);
  document.body.addEventListener("touchmove", icon_move);
  document.body.addEventListener("mouseleave", icon_release);
  document.body.addEventListener("touchleave", icon_release);
}

