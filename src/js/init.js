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

