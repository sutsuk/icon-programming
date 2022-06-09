var ihw = 70;
var mxi = 10000;
var fil = "  ";
var dcl = 300;
var cls = 20;
var cis = 8;
var pst = [4, 1];
var pcl = 100;
var background = "icons/background.png"


function $(id){
  return document.getElementById(id);
}

var img = new Array();
var tag = new Array();

function icon(pr1, pr2){
  img.push(pr1);
  tag.push(pr2);
  return;
}

icon("icons/start.png", "start");
icon("icons/end.png", "end");
icon("icons/int.png", "int");
icon("icons/double.png", "double");
icon("icons/char.png", "char");
icon("icons/print.png", "print");
icon("icons/scan.png", "scan");
icon("icons/if_1.png", "if_1");
icon("icons/if_2.png", "if_2");
icon("icons/up.png", "up");
icon("icons/down.png", "down");
icon("icons/rightup.png", "rightup");
icon("icons/rightdown.png", "rightdown");
icon("icons/conf_1.png", "conf_1");
icon("icons/conf_2.png", "conf_2");
icon("icons/right.png", "right");
icon("icons/subst.png", "subst");
icon("icons/loop_start.png", "loopstart");
icon("icons/loop_break.png", "loopbreak");
icon("icons/loop_end.png", "loopend");
icon("icons/math.png", "math");
icon("icons/funcf.png", "funcf");
icon("icons/funct.png", "funct");
icon("icons/funce.png", "funce");

var clx, cly, clc;
var cnt = 0;
var tch = 0;
var tre = null;
var plc = new Array();
var plx = new Array();
var ply = new Array();
var obj = new Array();
var elm = new Array();
var opt = new Array();

function msdw(tar){
  tre = this;
  var i;
  var num = (tre.id).split('-');
  if(!(plx[num[1]] < 0)){
    plc[plx[num[1]]][ply[num[1]]] = -1;
  }
  tar.preventDefault();
  if(tar.type == "touchstart"){
    tar = tar.changedTouches[0];
    if(tch == 0){
      for(i = 0; i < elm.length; i++){
        elm[i].removeEventListener("mouseup", msup, false);
        elm[i].removeEventListener("touchend", msup, false);
      }
      tch = 1;
    }
    tre.addEventListener("mouseup", msup, false);
    tre.addEventListener("touchend", msup, false);
  }
  clx = tar.pageX - tre.offsetLeft;
  cly = tar.pageY - tre.offsetTop;
  document.body.addEventListener("mousemove", msmv, false);
  document.body.addEventListener("touchmove", msmv, false);
  document.body.addEventListener("mouseleave", msup, false);
  document.body.addEventListener("touchleave", msup, false);
  clc++;
  if(clc == 2){
    optdlg(tre);
    return;
  }
  setTimeout(function(){ clc = 0; }, dcl);
  return;
}

function msmv(tar){
  if(tre == null){
    return;
  }
  tar.preventDefault();
  if(tar.type == "touchmove"){
    tar = tar.changedTouches[0];
  }
  tre.style.left = (tar.pageX - clx) + "px";
  tre.style.top = (tar.pageY - cly) + "px";
  return;
}

function div(dor, dnd){
  var i;
  var ret = new Array();
  for(i = 0; !(dor < dnd); i++){
    dor = dor - dnd;
  }
  ret.push(i);
  ret.push(dor);
  return ret;
}

function elmpr(num){
  tre.style.left = ((parseInt(window.innerWidth, 10) - ihw) / 2) + "px";
  tre.style.top = ((parseInt(window.innerHeight, 10) - ihw) / 2) + "px";
  plx[num] = -1;
  ply[num] = -1;
  alert("その場所には置くことができません\nアイコンの待避ができませんでした\n位置を初期化します");
  return;
}

function msup(){
  if(tre == null){
    return;
  }
  if(tch == 1){
    tre.removeEventListener("mouseup", msup, false);
    tre.removeEventListener("touchend", msup, false);
  }else{
    document.body.removeEventListener("mouseleave", msup, false);
    document.body.removeEventListener("touchleave", msup, false);
  }
  document.body.removeEventListener("mousemove", msmv, false);
  document.body.removeEventListener("touchmove", msmv, false);
  var i, j, ext, dlx, dly, typ;
  var num = (tre.id).split('-');
  var lef = parseInt(tre.style.left, 10);
  var top = parseInt(tre.style.top, 10);
  dlx = div(lef, ihw);
  dly = div(top, ihw);
  if(!(dlx[1] > (ihw / 2))){
    plx[num[1]] = dlx[0];
  }else{
    plx[num[1]] = dlx[0] + 1;
  }
  if(!(dly[1] > (ihw / 2))){
    ply[num[1]] = dly[0];
  }else{
    ply[num[1]] = dly[0] + 1;
  }
  if(plx[num[1]] < 0){
    plx[num[1]] = 0;
  }
  if(ply[num[1]] < 0){
    ply[num[1]] = 0;
  }
  if(!(plc[plx[num[1]]][ply[num[1]]] < 0)){
    ext = 0;
    for(i = -1; (i < 2) && (ext == 0); i++){
      for(j = -1; (j < 2) && (ext == 0); j++){
        if((plx[num[1]] + i) < cls && (ply[num[1]] + j) < cls){
          if(!((plx[num[1]] + i) < 0 || (ply[num[1]] + j) < 0)){
            if(plc[(plx[num[1]] + i)][(ply[num[1]] + j)] < 0){
              plx[num[1]] = plx[num[1]] + i;
              ply[num[1]] = ply[num[1]] + j;
              ext = 1;
            }
          }
        }
      }
    }
  }else{
    ext = 1;
  }
  if(ext == 1){
    plc[plx[num[1]]][ply[num[1]]] = num[1];
    tre.style.left = (plx[num[1]] * ihw) + "px";
    tre.style.top = (ply[num[1]] * ihw) + "px";
  }else{
    elmpr(num[1]);
  }
  tre = null;
  return;
}

function summon(num, sx, sy, so){
  if(sx == -1){
    if(tch == 0){
      $("body").insertAdjacentHTML('beforeend', '<img id="' + tag[num] + '-' + cnt + '" style="position:absolute; left:' + ((parseInt(window.innerWidth, 10) - ihw) / 2) + 'px; top:' + ((parseInt(window.innerHeight, 10) - ihw) / 2) + 'px;" src="' + img[num] + '" height="' + (ihw - 1) + 'px">\n');
    }else{
      $("body").insertAdjacentHTML('beforeend', '<img id="' + tag[num] + '-' + cnt + '" style="position:absolute; left:' + (ihw * (pst[0] + 3 / 2)) + 'px; top:' + (ihw * 7 / 2) + 'px;" src="' + img[num] + '" height="' + (ihw - 1) + 'px">\n');
    }
  }else{
    $("body").insertAdjacentHTML('beforeend', '<img id="' + tag[num] + '-' + cnt + '" style="position:absolute; left:' + (sx * ihw) + 'px; top:' + (sy * ihw) + 'px;" src="' + img[num] + '" height="' + (ihw - 1) + 'px">\n');
    plc[sx][sy] = cnt;
  }
  obj.push(num);
  elm.push($(tag[num] + '-' + cnt));
  elm[cnt].addEventListener("mousedown", msdw, false);
  elm[cnt].addEventListener("touchstart", msdw, false);
  elm[cnt].addEventListener("mouseup", msup, false);
  elm[cnt].addEventListener("touchend", msup, false);
  plx.push(sx);
  ply.push(sy);
  if(sx > -1 || num == 23){
    if(so == "null"){
      opt.push(null);
    }else{
      opt.push(so);
    }
  }else if(num == 0 || num == 1 || num == 22 || !(num < 9 || num > 15)){
    opt.push(0);
  }else{
    opt.push(null);
  }
  cnt++;
  return;
}

function dlgcls(id, rem){
  var i;
  var spl = rem.split(':');
  if(rem != ""){
    for(i = 0; i < spl.length; i++){
      $(spl[i]).remove();
    }
  }
  $(id).close();
  return;
}

function optdlg(tar){
  var shw;
  var skp = 1;
  var opv = new Array();
  var op1 = new Array();
  var op2 = new Array();
  var op3 = new Array();
  var num = (tar.id).split('-');
  var typ = tag[obj[num[1]]].split("_");
  var dlg = $("dlg-" + typ[0]);
  var dtl = $("dlg-detail");
  var elr = $("elmrm");
  var opr = $("optetr");
  msup();
  if(typ[0] == tag[23]){
    opv = opt[num[1]].split(':');
    if(opv.length == 2){
      skp = 0;
    }
  }
  if(opt[num[1]] != null && opt[num[1]] != 0 && skp){
    opv = opt[num[1]].split(':');
    dtl.innerHTML = "";
    if(opv.length == 2){
      op1 = opv[1].split(';');
      dtl.insertAdjacentHTML('beforeend', '<h1 class="heading">[ ' + opv[0] + ' ] 設定済み</h1>\n');
      if(op1.length == 2){
        if(op1[0] == "p" || op1[0] == "l"){
          dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '" readonly>\n');
        }else{
          dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + op1[1] + '" readonly>\n');
        }
      }else{
        dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + opv[1] + '" readonly>\n');
      }
    }else if(opv.length == 3){
      op1 = opv[1].split(';');
      op2 = opv[2].split(';');
      dtl.insertAdjacentHTML('beforeend', '<h1 class="heading">[ ' + opv[0] + ' ] 設定済み</h1>\n');
      if(op2[0] == "p"){
        dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + prn[op2[1]] + '" readonly>\n');
      }else if(op2[0] == "v"){
        dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + op2[1] + '" readonly>\n');
      }else{
        dtl.insertAdjacentHTML('beforeend', '<input type="text" value="return: ' + op2[1] + '" readonly>\n');
      }
    }else if(opv.length == 4){
      op1 = opv[1].split(';');
      op2 = opv[2].split(';');
      op3 = opv[3].split(';');
      dtl.insertAdjacentHTML('beforeend', '<h1 class="heading">[ ' + opv[0] + ' ] 設定済み</h1>\n');
      if(opv[0] == "plus"){
        if(op2[0] == "p"){
          if(op3[0] == "p"){
            dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + prn[op2[1]] + ' + ' + prn[op3[1]] + '" readonly>\n');
          }else{
            dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + prn[op2[1]] + ' + ' + op3[1] + '" readonly>\n');
          }
        }else{
          dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + op2[1] + ' + ' + op3[1] + '" readonly>\n');
        }
      }else if(opv[0] == "minus"){
        if(op2[0] == "p"){
          if(op3[0] == "p"){
            dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + prn[op2[1]] + ' - ' + prn[op3[1]] + '" readonly>\n');
          }else{
            dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + prn[op2[1]] + ' - ' + op3[1] + '" readonly>\n');
          }
        }else{
          dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + op2[1] + ' - ' + op3[1] + '" readonly>\n');
        }
      }else if(opv[0] == "times"){
        if(op2[0] == "p"){
          if(op3[0] == "p"){
            dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + prn[op2[1]] + ' * ' + prn[op3[1]] + '" readonly>\n');
          }else{
            dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + prn[op2[1]] + ' * ' + op3[1] + '" readonly>\n');
          }
        }else{
          dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + op2[1] + ' * ' + op3[1] + '" readonly>\n');
        }
      }else if(opv[0] == "division"){
        if(op2[0] == "p"){
          if(op3[0] == "p"){
            dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + prn[op2[1]] + ' / ' + prn[op3[1]] + '" readonly>\n');
          }else{
            dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + prn[op2[1]] + ' / ' + op3[1] + '" readonly>\n');
          }
        }else{
          dtl.insertAdjacentHTML('beforeend', '<input type="text" value="' + prn[op1[1]] + '=' + op2[1] + ' / ' + op3[1] + '" readonly>\n');
        }
      }
    }else if(opv.length == 5){
      op1 = opv[1].split(';');
      op2 = opv[3].split(';');
      op3 = opv[4].split(';');
      dtl.insertAdjacentHTML('beforeend', '<h1 class="heading">[ ' + opv[0] + ' ] 設定済み</h1>\n');
      dtl.insertAdjacentHTML('beforeend', '<input type="text" value="name: ' + op1[1] + '" readonly><br>\n');
      dtl.insertAdjacentHTML('beforeend', '<input type="text" value="arg: ' + op2[1] + '" readonly><br>\n');
      dtl.insertAdjacentHTML('beforeend', '<input type="text" value="return to: ' + op3[1] + '" readonly><br>\n');
    }else{
      alert("エラーが発生しました");
      return;
    }
    dtl.insertAdjacentHTML('beforeend', '<input type="button" value="完了" onclick="dlgcls(' + "'dlg-detail', ''" + ')">\n');
    dtl.insertAdjacentHTML('beforeend', '<input type="button" value="削除" onclick="elmrm(' + "'detail'" + ', ' + num[1] + ')">\n');
    dtl.showModal();
    return;
  }
  $("int-name").value = "";
  $("double-name").value = "";
  $("char-name").value = "";
  $("print-type").selectedIndex = 0;
  $("print-param-select").style.display = "none";
  $("print-param").selectedIndex = 0;
  $("print-string-input").style.display = "none";
  $("print-string").value = "";
  $("scan-param").selectedIndex = 0;
  $("if-param1-select").style.display = "none";
  $("if-param2-select").style.display = "none";
  $("if-value-input").style.display = "none";
  $("if-type").selectedIndex = 0;
  $("if-param1").selectedIndex = 0;
  $("if-param2").selectedIndex = 0;
  $("if-value").value = "";
  $("subst-param").selectedIndex = 0;
  $("subst-value").value = "";
  $("loops-name").value = "";
  $("loopb-name").selectedIndex = 0;
  $("loope-name").selectedIndex = 0;
  $("math-symbol").selectedIndex = 0;
  $("math-plus").style.display = "none";
  $("math-ptype").selectedIndex = 0;
  $("math-minus").style.display = "none";
  $("math-mtype").selectedIndex = 0;
  $("math-times").style.display = "none";
  $("math-ttype").selectedIndex = 0;
  $("math-division").style.display = "none";
  $("math-dtype").selectedIndex = 0;
  $("math-param1-select").style.display = "none";
  $("math-param1").selectedIndex = 0;
  $("math-param2-select").style.display = "none";
  $("math-param2").selectedIndex = 0;
  $("math-param3-select").style.display = "none";
  $("math-param3").selectedIndex = 0;
  $("math-value1-input").style.display = "none";
  $("math-value1").value = ""
  $("math-value2-input").style.display = "none";
  $("math-value2").selectedIndex = 0;
  $("funcf-name").value = "";
  $("funcf-ret").selectedIndex = 0;
  $("funce-ret").selectedIndex = 0;
  dlg.showModal();
  if(elr != null){
    elr.remove();
  }
  if(opr != null){
    opr.remove();
  }
  dlg.insertAdjacentHTML('beforeend', '<input type="button" id="optetr" value="完了" onclick="optetr(' + "'" + typ[0] + "'" + ', ' + "'" + tag[obj[num[1]]] + "'" + ', ' + num[1] + ')">\n');
  dlg.insertAdjacentHTML('beforeend', '<input type="button" id="elmrm" value="削除" onclick="elmrm(' + "'" + typ[0] + "'" + ', ' + num[1] + ')">\n');
  return;
}

var prn = new Array();
var prv = new Array();
var prt = new Array();
var lpn = new Array();
var lps = new Array();

function printchange(){
  var typ = $("print-type").value;
  if(typ == "prm"){
    $("print-param-select").style.display = "";
    $("print-string-input").style.display = "none";
  }else if(typ == "vle"){
    $("print-param-select").style.display = "none";
    $("print-string-input").style.display = "";
  }else{
    $("print-param-select").style.display = "none";
    $("print-string-input").style.display = "none";
  }
  return;
}

function ifchange(){
  var typ = $("if-type").value;
  var ip1 = $("if-param1-select");
  var ip2 = $("if-param2-select");
  var ivl = $("if-value-input");
  if(typ == "tof"){
    ip1.style.display = "none";
    ip2.style.display = "none";
    ivl.style.display = "";
  }else if(typ == "pev"){
    ip1.style.display = "";
    ip2.style.display = "none";
    ivl.style.display = "";
  }else if(typ == "pep"){
    ip1.style.display = "";
    ip2.style.display = "";
    ivl.style.display = "none";
  }else{
    ip1.style.display = "none";
    ip2.style.display = "none";
    ivl.style.display = "none";
  }
  return;
}

function mathchange(mde){
  var tav;
  if(mde == 0){
    tav = $("math-symbol").value;
    if(tav == "plus"){
      $("math-plus").style.display = "";
      $("math-minus").style.display = "none";
      $("math-times").style.display = "none";
      $("math-division").style.display = "none";
    }else if(tav == "minus"){
      $("math-plus").style.display = "none";
      $("math-minus").style.display = "";
      $("math-times").style.display = "none";
      $("math-division").style.display = "none";
    }else if(tav == "times"){
      $("math-plus").style.display = "none";
      $("math-minus").style.display = "none";
      $("math-times").style.display = "";
      $("math-division").style.display = "none";
    }else if(tav == "division"){
      $("math-plus").style.display = "none";
      $("math-minus").style.display = "none";
      $("math-times").style.display = "none";
      $("math-division").style.display = "";
    }
  }else if(mde == 1){
    tav = $("math-ptype").value;
    if(tav == "ppp"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "";
      $("math-param3-select").style.display = "";
      $("math-value1-input").style.display = "none";
      $("math-value2-input").style.display = "none";
    }else if(tav == "ppv"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "";
      $("math-param3-select").style.display = "none";
      $("math-value1-input").style.display = "";
      $("math-value2-input").style.display = "none";
    }else if(tav == "vpv"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "none";
      $("math-param3-select").style.display = "none";
      $("math-value1-input").style.display = "";
      $("math-value2-input").style.display = "";
    }
  }else if(mde == 2){
    tav = $("math-mtype").value;
    if(tav == "pmp"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "";
      $("math-param3-select").style.display = "";
      $("math-value1-input").style.display = "none";
      $("math-value2-input").style.display = "none";
    }else if(tav == "pmv"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "";
      $("math-param3-select").style.display = "none";
      $("math-value1-input").style.display = "";
      $("math-value2-input").style.display = "none";
    }else if(tav == "vmv"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "none";
      $("math-param3-select").style.display = "none";
      $("math-value1-input").style.display = "";
      $("math-value2-input").style.display = "";
    }
  }else if(mde == 3){
    tav = $("math-ttype").value;
    if(tav == "ptp"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "";
      $("math-param3-select").style.display = "";
      $("math-value1-input").style.display = "none";
      $("math-value2-input").style.display = "none";
    }else if(tav == "ptv"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "";
      $("math-param3-select").style.display = "none";
      $("math-value1-input").style.display = "";
      $("math-value2-input").style.display = "none";
    }else if(tav == "vtv"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "none";
      $("math-param3-select").style.display = "none";
      $("math-value1-input").style.display = "";
      $("math-value2-input").style.display = "";
    }
  }else{
    tav = $("math-dtype").value;
    if(tav == "pdp"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "";
      $("math-param3-select").style.display = "";
      $("math-value1-input").style.display = "none";
      $("math-value2-input").style.display = "none";
    }else if(tav == "pdv"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "";
      $("math-param3-select").style.display = "none";
      $("math-value1-input").style.display = "";
      $("math-value2-input").style.display = "none";
    }else if(tav == "vdv"){
      $("math-param1-select").style.display = "";
      $("math-param2-select").style.display = "none";
      $("math-param3-select").style.display = "none";
      $("math-value1-input").style.display = "";
      $("math-value2-input").style.display = "";
    }
  }
  return;
}

function search(nam){
  var i;
  for(i = 0; i < prn.length; i++){
    if(prn[i] == nam){
      break;
    }
  }
  if(prn[i] != nam){
    i = -1;
  }
  return i;
}

function optetr(dlg, typ, num){
  var tav, id, i, arg;
  var cct = 0;
  $("dlg-" + dlg).close();
  if(typ == tag[0]){
    return;
  }else if(typ == tag[1]){
    return;
  }else if(typ == tag[2]){
    tav = $("int-name").value;
    while(tav.match(/[^A-Z^a-z\d]/)){
      tav = tav.replace(/[^A-Z^a-z\d]/, '');
    }
    if(tav != "" && search(tav) < 0){
      prn.push(tav);
      prv.push(0);
      prt.push(typ);
    }else{
      alert("ほかの名前を使用してください");
      $("dlg-" + dlg).showModal();
      return;
    }
    opt[num] = "int:p;" + search(tav);
    $("print-param").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("scan-param").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("if-param1").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("if-param2").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("subst-param").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("math-param1").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("math-param2").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("math-param3").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("funcf-arg").insertAdjacentHTML('beforeend', '<ul><li><input id="funcf-arg-' + tav + '" type="checkbox"></li><li><p>' + tav + '</p></ul>');
    $("funcf-ret").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("funce-ret").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
  }else if(typ == tag[3]){
    tav = $("double-name").value;
    while(tav.match(/[^A-Z^a-z\d]/)){
      tav = tav.replace(/[^A-Z^a-z\d]/, '');
    }
    if(tav != "" && search(tav) < 0){
      prn.push(tav);
      prv.push(0);
      prt.push(typ);
    }else{
      alert("ほかの名前を使用してください");
      $("dlg-" + dlg).showModal();
      return;
    }
    opt[num] = "double:p;" + search(tav);
    $("print-param").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("scan-param").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("if-param1").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("if-param2").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("subst-param").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("math-param1").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("math-param2").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("math-param3").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("funcf-arg").insertAdjacentHTML('beforeend', '<ul><li><input id="funcf-arg-' + tav + '" type="checkbox"></li><li><p>' + tav + '</p></ul>');
    $("funcf-ret").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("funce-ret").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
  }else if(typ == tag[4]){
    tav = $("char-name").value;
    while(tav.match(/[^A-Z^a-z\d]/)){
      tav = tav.replace(/[^A-Z^a-z\d]/, '');
    }
    if(tav != "" && search(tav) < 0){
      prn.push(tav);
      prv.push("");
      prt.push(typ);
    }else{
      alert("ほかの名前を使用してください");
      $("dlg-" + dlg).showModal();
      return;
    }
    opt[num] = "char:p;" + search(tav);
    $("print-param").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("scan-param").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("if-param1").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("if-param2").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("subst-param").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("funcf-arg").insertAdjacentHTML('beforeend', '<ul><li><input id="funcf-arg-' + tav + '" type="checkbox"></li><li><p>' + tav + '</p></ul>');
    $("funcf-ret").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("funce-ret").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
  }else if(typ == tag[5]){
    tav = $("print-type").value;
    if(tav == "prm"){
      tav = $("print-param").value;
      if(tav == ""){
        alert("変数を選択してください");
        $("dlg-" + dlg).showModal();
      }else{
        opt[num] = "print:p;" + search(tav);
      }
    }else if(tav == "vle"){
      opt[num] = "print:v;" + $("print-string").value;
    }else{
      alert("要素を選択してください");
      $("dlg-" + dlg).showModal();
    }
  }else if(typ == tag[6]){
    tav = $("scan-param").value;
    if(tav != ""){
      opt[num] = "scan:p;" + search(tav);
    }else{
      alert("変数を選択してください");
      $("dlg-" + dlg).showModal();
    }
  }else if(typ == tag[7] || typ == tag[8]){
    tav = $("if-type").value;
    if(tav == "tof"){
      tav = $("if-value").value;
      if(tav == "true" || tav == "false"){
        opt[num] = "if:" + tav;
      }else{
        alert("trueまたはfalseを入力してください");
        $("dlg-" + dlg).showModal();
      }
    }else if(tav == "pev"){
      if($("if-param1").value != ""){
        opt[num] = "if:p;" + search($("if-param1").value) + ":v;" + $("if-value").value;
      }else{
        alert("変数を選択してください");
        $("dlg-" + dlg).showModal();
      }
    }else if(tav == "pep"){
      if($("if-param1").value != "" && $("if-param2").value != ""){
        opt[num] = "if:p;" + search($("if-param1").value) + ":p;" + search($("if-param2").value);
      }else{
        alert("変数を選択してください");
        $("dlg-" + dlg).showModal();
      }
    }else{
      alert("タイプを選択してください");
      $("dlg-" + dlg).showModal();
    }
  }else if(typ == tag[9]){
    return;
  }else if(typ == tag[10]){
    return;
  }else if(typ == tag[11]){
    return;
  }else if(typ == tag[12]){
    return;
  }else if(typ == tag[13]){
    return;
  }else if(typ == tag[14]){
    return;
  }else if(typ == tag[15]){
    return;
  }else if(typ == tag[16]){
    if($("subst-param").value == ""){
      alert("変数を選択してください");
      $("dlg-" + dlg).showModal();
      return;
    }else{
      tav = $("subst-value").value;
      while(tav.match(/[^A-Z^a-z\d]/)){
        tav = tav.replace(/[^A-Z^a-z\d]/, '');
      }
      if(tav == ""){
        alert("値を確認してください");
        $("dlg-" + dlg).showModal();
        return;
      }else{
        opt[num] = "subst:p;" + search($("subst-param").value) + ":v;" + tav;
      }
    }
  }else if(typ == tag[17]){
    tav = $("loops-name").value;
    while(tav.match(/[^A-Z^a-z\d]/)){
      tav = tav.replace(/[^A-Z^a-z\d]/, '');
    }
    if(tav != "" && search(tav) < 0){
      prn.push(tav);
      prv.push("0:0");
      prt.push(parseInt(lpn.length, 10));
      lpn.push(search(tav));
      lps.push(1);
    }else{
      alert("ほかの名前を使用してください");
      $("dlg-" + dlg).showModal();
      return;
    }
    opt[num] = "loopstart:l;" + search(tav);
    $("loopb-name").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
    $("loope-name").insertAdjacentHTML('beforeend', '<option value="' + tav + '">' + tav + '</option>');
  }else if(typ == tag[18]){
    tav = $("loopb-name").value;
    if(tav == ""){
      alert("ループを選択してください");
      $("dlg-" + dlg).showModal();
      return;
    }else{
      opt[num] = "loopbreak:l;" + search(tav);
    }
  }else if(typ == tag[19]){
    tav = $("loope-name").value;
    if(tav == ""){
      alert("ループを選択してください");
      $("dlg-" + dlg).showModal();
      return;
    }else{
      opt[num] = "loopend:l;" + search(tav);
    }
  }else if(typ == tag[20]){
    tav = $("math-symbol").value;
    if(tav == "plus"){
      tav = $("math-ptype").value;
      if(tav == "ppp"){
        if($("math-param1").value == "" || $("math-param2").value == "" || $("math-param3").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "plus:p;" + search($("math-param1").value) + ":p;" + search($("math-param2").value) + ":p;" + search($("math-param3").value);
      }else if(tav == "ppv"){
        if($("math-param1").value == "" || $("math-param2").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        if($("math-value1").value == ""){
          alert("値を入力してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "plus:p;" + search($("math-param1").value) + ":p;" + search($("math-param2").value) + ":v;" + $("math-value1").value;
      }else if(tav == "vpv"){
        if($("math-param1").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        if($("math-value1").value == "" || $("math-value1").value == ""){
          alert("値を入力してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "plus:p;" + search($("math-param1").value) + ":v;" + $("math-value1").value + ":v;" + $("math-value2").value;
      }else{
        alert("形式を指定してください");
        $("dlg-" + dlg).showModal();
        return;
      }
    }else if(tav == "minus"){
      tav = $("math-mtype").value;
      if(tav == "pmp"){
        if($("math-param1").value == "" || $("math-param2").value == "" || $("math-param3").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "minus:p;" + search($("math-param1").value) + ":p;" + search($("math-param2").value) + ":p;" + search($("math-param3").value);
      }else if(tav == "pmv"){
        if($("math-param1").value == "" || $("math-param2").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        if($("math-value1").value == ""){
          alert("値を入力してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "minus:p;" + search($("math-param1").value) + ":p;" + search($("math-param2").value) + ":v;" + search($("math-value1").value);
      }else if(tav == "vmv"){
        if($("math-param1").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        if($("math-value1").value == "" || $("math-value2").value == ""){
          alert("値を入力してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "minus:p;" + search($("math-param1").value) + ":v;" + $("math-value1").value + ":v;" + $("math-value2").value;
      }else{
        alert("形式を指定してください");
        return;
      }
    }else if(tav == "times"){
      tav = $("math-ttype").value;
      if(tav == "ptp"){
        if($("math-param1").value == "" || $("math-param2").value == "" || $("math-param3").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "times:p;" + search($("math-param1").value) + ":p;" + search($("math-param2").value) + ":p;" + search($("math-param3").value);
      }else if(tav == "ptv"){
        if($("math-param1").value == "" || $("math-param2").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        if($("math-value1").value == ""){
          alert("値を入力してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "times:p;" + search($("math-param1").value) + ":p;" + search($("math-param2").value) + ":v;" + $("math-value1").value;
      }else if(tav == "vtv"){
        if($("math-param1").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        if($("math-value1").value == "" || $("math-value1").value == ""){
          alert("値を入力してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "times:p;" + search($("math-param1").value) + ":v;" + $("math-value1").value + ":v;" + $("math-value2").value;
      }else{
        alert("形式を指定してください");
        return;
      }
    }else if(tav == "division"){
      tav = $("math-dtype").value;
      if(tav == "pdp"){
        if($("math-param1").value == "" || $("math-param2").value == "" || $("math-param3").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "division:p;" + search($("math-param1").value) + ":p;" + search($("math-param2").value) + ":p;" + search($("math-param3").value);
      }else if(tav == "pdv"){
        if($("math-param1").value == "" || $("math-param2").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        if($("math-value1").value == ""){
          alert("値を入力してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "division:p;" + search($("math-param1").value) + ":p;" + search($("math-param2").value) + ":v;" + $("math-value1").value;
      }else if(tav == "vdv"){
        if($("math-param1").value == ""){
          alert("変数を選択してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        if($("math-value1").value == "" || $("math-value1").value == ""){
          alert("値を入力してください");
          $("dlg-" + dlg).showModal();
          return;
        }
        opt[num] = "division:p;" + search($("math-param1").value) + ":v;" + $("math-value1").value + ":v;" + $("math-value2").value;
      }else{
        alert("形式を指定してください");
        return;
      }
    }
  }else if(typ == tag[21]){
    tav = $("funcf-name").value;
    while(tav.match(/[^A-Z^a-z\d]/)){
      tav = tav.replace(/[^A-Z^a-z\d]/, '');
    }
    if(tav != "" && search(tav) < 0){
      prn.push(tav);
      prv.push(cnt);
      prt.push(typ);
      arg = "";
      for(i = 0; i < prt.length; i++){
        if(prt[i] == tag[2] || prt[i] == tag[3] || prt[i] == tag[4]){
	  if($("funcf-arg-" + prn[i]).checked){
	    if(arg == ""){
              arg = prt[i] + '#' + prn[i];
            }else{
              arg = arg + ';' + prt[i] + '#' + prn[i];
            }
          }
        }
      }
      opt[num] = "funcf:name;" + tav + ":to;" + cnt + ":arg;" + arg + ":ret;" + $("funcf-ret").value;
      summon(22, -1, -1, 0);
      summon(23, -1, -1, "funce:toi;" + num);
    }else{
      alert("ほかの名前を使用してください");
      $("dlg-" + dlg).showModal();
      return;
    }
  }else if(typ == tag[22]){
    return;
  }else if(typ == tag[23]){
    opt[num] = opt[num] + ":ret;" + $("funce-ret").value;
  }else{
    alert("エラー発生[Unexpected]");
    return;
  }
  return;
}

function elmrm(typ, num){
  var id = (elm[num].id).split('-');
  if(id[0] == tag[22] || id[0] == tag[23]){
    alert("このアイコンは消せません");
  }else{
    plc[plx[num]][ply[num]] = -1;
    $("dlg-" + typ).close();
    elm[num].remove();
  }
  return;
}

var wit = 0;

function dlgerr(dlg, num, msg){
  if(msg == ""){
    alert('アイコン' + num + '：エラー発生');
  }else{
    alert('アイコン' + num + '：エラー発生\n\n' + msg);
  }
  dlg.close();
  return;
}

function exec(){
  var rsl, typ, lct, tar, prm, k, l, m, n;
  var lsk = null;
  var i = pst[0] + 1;
  var j = pst[1];
  var run = 1;
  var sub = 0;
  var dlg = $("dlg-exec");
  var ret = new Array();
  var tmp = new Array();
  var ps1 = new Array();
  var ps2 = new Array();
  var ps3 = new Array();
  var ops = new Array();
  var inl = new Array();
  dlg.innerHTML = "";
  dlg.insertAdjacentHTML('beforeend', '<p id="exec-rsl" style="white-space:pre-wrap;"></p>\n');
  rsl = $("exec-rsl");
  rsl.innerHTML = "";
  dlg.showModal();
  for(lct = 1; run; lct++){
    if(lct == mxi){
      dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "処理回数が上限に達しました\n無限ループになっていませんか？");
      return;
    }
    if(plc[i][j] < 0){
      dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "アイコンが不連続です");
      return;
    }else{
      typ = obj[plc[i][j]];
    }
    if(opt[plc[i][j]] == null){
      dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "設定が未完了です");
      return;
    }
    if(typ == 0){
      dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "開始アイコンが不思議な位置にあります");
      return;
    }else if(typ == 1){
      run = 0;
    }else if(typ == 2){
      i = i + 1;
      if(sub > 0){
        ops = opt[plc[i][j]].split(":");
        ps1 = ops[1].split(";");
        k = tmp.length - 1;
        l = tmp[k].length;
        tmp[k][l] = new Array();
        tmp[k][l].push(prn[ps1[1]]);
        tmp[k][l].push(prv[ps1[1]]);
        tmp[k][l].push(prt[ps1[1]]);
      }
    }else if(typ == 3){
      i = i + 1;
      if(sub > 0){
        ops = opt[plc[i][j]].split(":");
        ps1 = ops[1].split(";");
        k = tmp.length - 1;
        l = tmp[k].length;
        tmp[k][l] = new Array();
        tmp[k][l].push(prn[ps1[1]]);
        tmp[k][l].push(prv[ps1[1]]);
        tmp[k][l].push(prt[ps1[1]]);
      }
    }else if(typ == 4){
      i = i + 1;
      if(sub > 0){
        ops = opt[plc[i][j]].split(":");
        ps1 = ops[1].split(";");
        k = tmp.length - 1;
        l = tmp[k].length;
        tmp[k][l] = new Array();
        tmp[k][l].push(prn[ps1[1]]);
        tmp[k][l].push(prv[ps1[1]]);
        tmp[k][l].push(prt[ps1[1]]);
      }
    }else if(typ == 5){
      if(lsk == null){
        ops = opt[plc[i][j]].split(":");
        ps1 = ops[1].split(";");
        if(sub > 0){
          if(ps1[0] == "v"){
            rsl.innerHTML = rsl.innerHTML + ps1[1] + '\n';
          }else{
            k = tmp.length - 1;
            for(l = 0; l < tmp[k].length; l++){
              if(tmp[k][l][0] == prn[ps1[1]]){
                break;
              }
            }
            if(tmp[k][l][2] == tag[2]){
              rsl.innerHTML = rsl.innerHTML + parseInt(tmp[k][l][1], 10) + '\n';
            }else{
              rsl.innerHTML = rsl.innerHTML + tmp[k][l][1] + '\n';
            }
          }
        }else{
          if(ps1[0] == "v"){
            rsl.innerHTML = rsl.innerHTML + ps1[1] + '\n';
          }else{
            if(prt[ps1] == tag[2]){
              rsl.innerHTML = rsl.innerHTML + parseInt(prv[ps1[1]], 10) + '\n';
            }else{
              rsl.innerHTML = rsl.innerHTML + prv[ps1[1]] + '\n';
            }
          }
        }
      }
      i = i + 1;
    }else if(typ == 6){
      if(lsk == null){
        ops = opt[plc[i][j]].split(":");
        ps1 = ops[1].split(";");
        if(sub > 0){
          k = tmp.length - 1;
          for(l = 0; l < tmp[k].length; l++){
            if(tmp[k][l][0] == prn[ps1[1]]){
              break;
            }
          }
          tmp[k][l][1] = prompt(tmp[k][l][0] + "=", "");
          if(tmp[k][l][1] == null){
            tmp[k][l][1] = "";
          }
        }else{
          prv[ps1[1]] = prompt(prn[ps1[1]] + "=", "");
          if(prv[ps1[1]] == null){
            prv[ps1[1]] = "";
          }
        }
      }
      i = i + 1;
    }else if(typ == 7){
      if(lsk == null){
        ops = opt[plc[i][j]].split(":");
        if(ops.length == 2){
          if(ops[1] == "true"){
            j = j + 1;
          }else{
            i = i + 1;
          }
        }else if(ops.length == 3){
          ps1 = ops[1].split(";");
          ps2 = ops[2].split(";");
          if(ps1[0] == "p"){
            if(ps2[0] == "p"){
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps2[1]]){
                    break;
                  }
                }
                if(tmp[k][l][1] == tmp[k][l][1]){
                  j = j + 1;
                }else{
                  i = i + 1;
                }
              }else{
                if(prv[ps1[1]] == prv[ps2[1]]){
                  j = j + 1;
                }else{
                  i = i + 1;
                }
              }
            }else{
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                if(tmp[k][l][1] == ps2[1]){
                  j = j + 1;
                }else{
                  i = i + 1;
                }
              }else{
                if(prv[ps1[1]] == ps2[1]){
                  j = j + 1;
                }else{
                  i = i + 1;
                }
              }
            }
          }
        }
      }else{
        i = i + 1;
      }
    }else if(typ == 8){
      if(lsk == null){
        ops = opt[plc[i][j]].split(":");
        if(ops.length == 2){
          if(ops[1] == "true"){
            j = j - 1;
          }else{
            i = i + 1;
          }
        }else if(ops.length == 3){
          ps1 = ops[1].split(";");
          ps2 = ops[2].split(";");
          if(ps1[0] == "p"){
            if(ps2[0] == "p"){
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps2[1]]){
                    break;
                  }
                }
                if(tmp[k][l][1] == tmp[k][l][1]){
                  j = j - 1;
                }else{
                  i = i + 1;
                }
              }else{
                if(prv[ps1[1]] == prv[ps2[1]]){
                  j = j - 1;
                }else{
                  i = i + 1;
                }
              }
            }else{
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                if(tmp[k][l][1] == ps2[1]){
                  j = j - 1;
                }else{
                  i = i + 1;
                }
              }else{
                if(prv[ps1[1]] == ps2[1]){
                  j = j - 1;
                }else{
                  i = i + 1;
                }
              }
            }
          }
        }
      }else{
        i = i + 1;
      }
    }else if(typ == 9){
      j = j - 1;
    }else if(typ == 10){
      j = j + 1;
    }else if(typ == 11){
      j = j - 1;
    }else if(typ == 12){
      i = i + 1;
    }else if(typ == 13){
      i = i + 1;
    }else if(typ == 14){
      i = i + 1;
    }else if(typ == 15){
      i = i + 1;
    }else if(typ == 16){
      if(lsk == null){
        ops = opt[plc[i][j]].split(":");
        ps1 = ops[1].split(";");
        ps2 = ops[2].split(";");
        if(sub > 0){
          k = tmp.length - 1;
          for(l = 0; l < tmp[k].length; l++){
            if(tmp[k][l][0] == prn[ps1[1]]){
              break;
            }
          }
          if(tmp[k][l][2] == tag[2]){
            tmp[k][l][1] = parseInt(ps2[1], 10);
          }else if(tmp[k][l][2] == tag[3]){
            tmp[k][l][1] = parseFloat(ps2[1]);
          }else{
            tmp[k][l][1] = ps2[1];
          }
        }else{
          if(prt[ps1[1]] == tag[2]){
            prv[ps1[1]] = parseInt(ps2[1], 10);
          }else if(prt[ps1[1]] == tag[3]){
            prv[ps1[1]] = parseFloat(ps2[1]);
          }else{
            prv[ps1[1]] = ps2[1];
          }
        }
      }
      i = i + 1;
    }else if(typ == 17){
      if(lsk == null){
        ops = opt[plc[i][j]].split(":");
        ps1 = ops[1].split(";");
        i = i + 1;
        if(sub > 0){
          k = tmp.length - 1;
          for(l = 0; l < tmp[k].length; l++){
            if(tmp[k][l][0] == prn[ps1[1]]){
              break;
            }
          }
          tmp[k][l][1] = i + ":" + j;
        }else{
          prv[ps1[1]] = i + ":" + j;
        }
      }else{
        i = i + 1;
      }
    }else if(typ == 18){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      lsk = ps1[1];
      i = i + 1;
    }else if(typ == 19){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      if(lsk == null){
        if(sub > 0){
          k = tmp.length - 1;
          for(l = 0; l < tmp[k].length; l++){
            if(tmp[k][l][0] == prn[ps1[1]]){ 
              break;
            }
          }
          ps2 = tmp[k][l][1].split(":");
        }else{
          ps2 = prv[ps1[1]].split(":");
        }
        i = parseInt(ps2[0], 10);
        j = parseInt(ps2[1], 10);
      }else{
        if(ps1[1] == lsk){
          lsk = null;
        }
        i = i + 1;
      }
    }else if(typ == 20){
      if(lsk == null){
        ops = opt[plc[i][j]].split(":");
        ps1 = ops[1].split(";");
        ps2 = ops[2].split(";");
        ps3 = ops[3].split(";");
        if(ops[0] == "plus"){
          if(ps2[0] == "p"){
            if(ps3[0] == "p"){
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){ 
                    break;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps2[1]]){
                    break;
                  }
                }
                for(n = 0; n < tmp[k].length; n++){
                  if(tmp[l][n][0] == prn[ps3[1]]){
                    break;
                  }
                }
                tmp[k][l][1] = tmp[k][m][1] + tmp[k][n][1];
              }else{
                prv[ps1[1]] = prv[ps2[1]] + prv[ps3[1]];
              }
            }else{
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps1[1]]){
                    break;
                  }
                }
                tmp[k][l][1] = tmp[k][m][1] + parseInt(ps3[1], 10);
              }else{
                prv[ps1[1]] = prv[ps2[1]] + parseInt(ps3[1], 10);
              }
            }
          }else{
            if(sub > 0){
              k = tmp.length - 1;
              for(l = 0; l < tmp[k].length; l++){
                if(tmp[k][l][0] == prn[ps1[1]]){
                  break;
                }
              }
              tmp[k][l][1] = parseInt(ps2[1], 10) + parseInt(ps3[1], 10);
            }else{
              prv[ps1[1]] = parseInt(ps2[1], 10) + parseInt(ps3[1], 10);
            }
          }
        }else if(ops[0] == "minus"){
          if(ps2[0] == "p"){
            if(ps3[0] == "p"){
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps1[1]]){
                    break;
                  }
                }
                for(n = 0; n < tmp[k].length; n++){
                  if(tmp[k][n][0] == prn[ps1[1]]){
                    break;
                  }
                }
                tmp[k][l][1] = tmp[k][m][1] - tmp[k][n][1];
              }else{
                prv[ps1[1]] = prv[ps2[1]] - prv[ps3[1]];
              }
            }else{
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps1[1]]){
                    break;
                  }
                }
                tmp[k][l][1] = tmp[k][m][1] - parseInt(ps3[1], 10);
              }else{
                prv[ps1[1]] = prv[ps2[1]] - parseInt(ps3[1], 10);
              }
            }
          }else{
            if(sub > 0){
              k = tmp.length - 1;
              for(l = 0; l < tmp[k].length; l++){
                if(tmp[k][l][0] == prn[ps1[1]]){
                  break;
                }
              }
              tmp[k][l][0] = parseInt(ps2[1], 10) - parseInt(ps3[1], 10);
            }else{
              prv[ps1[1]] = parseInt(ps2[1], 10) - parseInt(ps3[1], 10);
            }
          }
        }else if(ops[0] == "times"){
          if(ps2[0] == "p"){
            if(ps3[0] == "p"){
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps2[1]]){
                    break;
                  }
                }
                for(n = 0; n < tmp[k].length; n++){
                  if(tmp[l][n][0] == prn[ps3[1]]){
                    break;
                  }
                }
                tmp[k][l][1] = tmp[k][m][1] * tmp[k][n][1];
              }else{
                prv[ps1[1]] = prv[ps2[1]] * prv[ps3[1]];
              }
            }else{
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps1[1]]){
                    break;
                  }
                }
                tmp[k][l][1] = tmp[k][m][1] * parseInt(ps3[1], 10);
              }else{
                prv[ps1[1]] = prv[ps2[1]] * parseInt(ps3[1], 10);
              }
            }
          }else{
            if(sub > 0){
              k = tmp.length - 1;
              for(l = 0; l < tmp[k].length; l++){
                if(tmp[k][l][0] == prn[ps1[1]]){
                  break;
                }
              }
              tmp[k][l][1] = parseInt(ps2[1], 10) * parseInt(ps3[1], 10);
            }else{
              prv[ps1[1]] = parseInt(ps2[1], 10) * parseInt(ps3[1], 10);
            }
          }
        }else{
          if(ps2[0] == "p"){
            if(ps3[0] == "p"){
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps2[1]]){
                    break;
                  }
                }
                for(n = 0; n < tmp[k].length; n++){
                  if(tmp[l][n][0] == prn[ps3[1]]){
                    break;
                  }
                }
                tmp[k][l][1] = tmp[k][m][1] / tmp[k][n][1];
              }else{
                prv[ps1[1]] = prv[ps2[1]] / prv[ps3[1]];
              }
            }else{
              if(sub > 0){
                k = tmp.length - 1;
                for(l = 0; l < tmp[k].length; l++){
                  if(tmp[k][l][0] == prn[ps1[1]]){
                    break;
                  }
                  if(l == tmp[k].length){
                    dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "[" + prn[ps1[1]] + "] は内部変数ではありません");
                    return;
                  }
                }
                for(m = 0; m < tmp[k].length; m++){
                  if(tmp[k][m][0] == prn[ps2[1]]){
                    break;
                  }
                  if(m == tmp[k].length){
                    dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "[" + prn[ps2[1]] + "] は内部変数ではありません");
                    return;
                  }
                }
                tmp[k][l][1] = tmp[k][m][1] / parseInt(ps3[1], 10);
              }else{
                prv[ps1[1]] = prv[ps2[1]] / parseInt(ps3[1], 10);
              }
            }
          }else{
            if(sub > 0){
              k = tmp.length - 1;
              for(l = 0; l < tmp[k].length; l++){
                if(tmp[k][l][0] == prn[ps1[1]]){
                  break;
                }
                if(l == tmp[k].length){
                  dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "[" + prn[ps1[1]] + "] は内部変数ではありません");
                  return;
                }
              }
              tmp[k][l][1] = parseInt(ps2[1], 10) / parseInt(ps3[1], 10);
            }else{
              prv[ps1[1]] = parseInt(ps2[1], 10) / parseInt(ps3[1], 10);
            }
          }
        }
      }
      i = i + 1;
    }else if(typ == 21){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[2].split(";");
      i = plx[ps1[1]];
      j = ply[ps1[1]];
      if(i > -1 && j > -1){  
        ps1 = ops[3].split(";");
        k = tmp.length;
        tmp[k] = new Array();
        for(l = 1; l < ps1.length; l++){
          ps2 = ps1[l].split("#");
          tmp[k][(l - 1)] = new Array();
          tmp[k][(l - 1)].push(ps2[1]);
          tmp[k][(l - 1)].push(prv[search(ps2[1])]);
          tmp[k][(l - 1)].push(prt[search(ps2[1])]);
        }
        ps1 = ops[4].split(";");
        ret.push(search(ps1[1]));
      }else{
        dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "座標取得エラー");
        return;
      }
    }else if(typ == 22){
      sub = sub + 1;
      i = i + 1;
    }else if(typ == 23){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      i = plx[ps1[1]] + 1;
      j = ply[ps1[1]];
      sub = sub - 1;
      if(i > -1 && j > -1){
        if(ret[2] > -1){
          if(prt[ret[2]] == tmp[ps1[1]][2]){
            prv[ret[2]] = tmp[ps1[1]][1];
          }else{
            dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "代入時型エラー");
            return;
          }
        }
        tmp.pop();
      }else{
        dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "座標取得エラー");
        return;
      }
    }
  }
  dlg.insertAdjacentHTML('beforeend', '<input id="bpc" type="button" value="C言語に変換" onclick="dcc(' + (pst[0] + 1) + ', ' + pst[1] + ', 0, 0)">\n');
  dlg.insertAdjacentHTML('beforeend', '<input id="kep" type="button" value="保存" onclick="keep()">\n');
  dlg.insertAdjacentHTML('beforeend', '<input id="bce" type="button" value="閉じる" onclick="dlgcls(' + "'dlg-exec', 'bpc:kep:bce'" + ')">\n');
  return;
}

function readkkey(){
  location.href = location.href + "?keep=" + $("kkey").value;
}

function ddescribe(){
  $("bkg-describe").style.display = "flex";
  $("dlg-describe").show();
  window.scroll({top:0});
}

function makeind(tar, ind){
  var i;
  for(i = 0; i < ind; i++){
    tar.innerHTML = tar.innerHTML + fil;
  }
}

function dcc(i, j, emd, ind){
  var ccc, typ, lct, arg, k, l, m, n, fun;
  var run = 1;
  var dlg = $("dlg-ccc");
  var ops = new Array();
  var ps1 = new Array();
  var ps2 = new Array();
  var ps3 = new Array();
  var ps4 = new Array();
  var inl = new Array();
  var ret = new Array();
  var sbr = new Array();
  if(emd == 0){
    dlg.innerHTML = "";
    dlg.insertAdjacentHTML('beforeend', '<p id="ccc-code" style="white-space:pre-wrap;"></p>');
    ccc = $("ccc-code");
    ccc.innerHTML = 'int main(void){\n';
    ind++;
  }else{
    ccc = $("ccc-code");
  }
  for(lct = 1; run; lct++){
    if(lct == mxi){
      dlgerr(dlg, lct + ' (' + i + ', ' + j + ')', "処理回数が上限に達しました\n無限ループになっていませんか？");
      return;
    }
    if(plc[i][j] < 0){
      dlgerr(dlg, lct, "アイコンが不連続です");
      return;
    }else{
      typ = obj[plc[i][j]];
    }
    if(typ == 0){
      dlgerr(dlg, lct, "開始アイコンが不思議な位置にあります");
      return;
    }else if(typ == 1){
      if(emd == 0){
        makeind(ccc, ind)
        ccc.innerHTML = ccc.innerHTML + 'return 0;\n';
        ind--;
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + '}\n';
      }else{
        ret = [i, j];
        return ret;
      }
      run = 0;
    }else if(typ == 2){
      ops = opt[plc[i][j]].split(":");
      ops = ops[1].split(";");
      makeind(ccc, ind);
      ccc.innerHTML = ccc.innerHTML + 'int ' + prn[ops[1]] + ';\n';
      i = i + 1;
    }else if(typ == 3){
      ops = opt[plc[i][j]].split(":");
      ops = ops[1].split(";");
      makeind(ccc, ind);
      ccc.innerHTML = ccc.innerHTML + 'double ' + prn[ops[1]] + ';\n';
      i = i + 1;
    }else if(typ == 4){
      ops = opt[plc[i][j]].split(":");
      ops = ops[1].split(";");
      makeind(ccc, ind);
      ccc.innerHTML = ccc.innerHTML + 'char ' + prn[ops[1]] + '[' + pcl + '];\n';
      i = i + 1;
    }else if(typ == 5){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      if(ps1[0] == "p"){
        if(prt[ps1[1]] == tag[2]){
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + 'printf("%d", ' + prn[ps1[1]] + ');\n';
        }else if(prt[ps1[1]] == tag[3]){
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + 'printf("%f", ' + prn[ps1[1]] + ');\n';
        }else if(prt[ps1[1]] == tag[4]){
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + 'printf("%s", ' + prn[ps1[1]] + ');\n';
        }
      }else{
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + 'printf("' + ps1[1] + '");\n';
      }
      i = i + 1;
    }else if(typ == 6){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      if(prt[ps1[1]] == tag[2]){
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + 'scanf("%d", &' + prn[ps1[1]] + ');\n';
      }else if(prt[ps1[1]] == tag[3]){
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + 'scanf("%lf", &' + prn[ps1[1]] + ');\n';
      }else if(prt[ps1[1]] == tag[4]){
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + 'fgets(' + prn[ps1[1]] + ', ' + pcl + ', stdin);\n';
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + '[(sizeof(' + prn[ps1[1]] + ') - 1)] = ' + "\'\\0\'" + ';\n';
      }
      i = i + 1;
    }else if(typ == 7){
      ops = opt[plc[i][j]].split(":");
      if(ops.length == 2){
        if(ops[1] == "true"){
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + 'if(1){\n';
          ind++;
        }else{
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + 'if(0){\n';
          ind++;
        }
        dcc(i, (j + 1), 1, ind);
        ind--;
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + '}else{\n';
        ind++;
        ret = dcc((i + 1), j, 2, ind);
        i = ret[0];
        j = ret[1];
        ind--;
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + '}\n';
      }else if(ops.length == 3){
        pr1 = ops[1].split(";");
        pr2 = ops[2].split(";");
        if(pr1[0] == "p"){
          if(pr2[0] == "p"){
            if(prt[pr1[1]] == tag[4] || prt[pr2[1]] == tag[4]){
              makeind(ccc, ind);
              ccc.innerHTML = ccc.innerHTML + 'if(strcmp(' + prn[pr1[1]] + ', ' + prn[pr2[1]] + ')){\n';
              ind++;
            }else{
              makeind(ccc, ind);
              ccc.innerHTML = ccc.innerHTML + 'if(' + prn[pr1[1]] + ' == ' + prn[pr2[1]] + '){\n';
              ind++;
            }
          }else{
            if(prt[pr1[1]] == tag[4] || prt[pr2[1]] == tag[4]){
              makeind(ccc, ind);
              ccc.innerHTML = ccc.innerHTML + 'if(strcmp(' + prn[pr1[1]] + ', "' + pr2[1] + '")){\n';
              ind++;
            }else{
              makeind(ccc, ind);
              ccc.innerHTML = ccc.innerHTML + 'if(' + prn[pr1[1]] + ' == ' + pr2[1] + '){\n';
              ind++;
            }
          }
        }
        dcc(i, (j + 1), 1, ind);
        ind--;
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + '}else{\n';
        ind++;
        ret = dcc((i + 1), j, 2, ind);
        i = ret[0];
        j = ret[1];
        ind--;
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + '}\n';
      }
    }else if(typ == 8){
      ops = opt[plc[i][j]].split(":");
      if(ops.length == 2){
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + 'if(' + ops[1] + '){\n';
        ind++;
        dcc(i, (j + 1), 1, ind);
        ind--;
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + '}else{\n';
        ind++;
        ret = dcc((i + 1), j, 2, ind);
        i = ret[0];
        j = ret[1];
        ind--;
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + '}\n';
      }else if(ops.length == 3){
        pr1 = ops[1].split(";");
        pr2 = ops[2].split(";");
        if(pr1[0] == "p"){
          if(pr2[0] == "p"){
            if(prt[pr1[1]] == tag[4] || prt[pr2[1]] == tag[4]){
              makeind(ccc, ind);
              ccc.innerHTML = ccc.innerHTML + 'if(strcmp(' + prn[pr1[1]] + ', ' + prn[pr2[1]] + ')){\n';
              ind++;
            }else{
              makeind(ccc, ind);
              ccc.innerHTML = ccc.innerHTML + 'if(' + prn[pr1[1]] + ' == ' + prn[pr2[1]] + '){\n';
              ind++;
            }
          }else{
            if(prt[pr1[1]] == tag[4] || prt[pr2[1]] == tag[4]){
              makeind(ccc, ind);
              ccc.innerHTML = ccc.innerHTML + 'if(strcmp(' + prn[pr1[1]] + ', "' + pr2[1] + '")){\n';
              ind++;
            }else{
              makeind(ccc, ind);
              ccc.innerHTML = ccc.innerHTML + 'if(' + prn[pr1[1]] + ' == ' + pr2[1] + '){\n';
              ind++;
            }
          }
        }
        dcc(i, (j - 1), 1, ind);
        ind--;
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + '}else{\n';
        ind++;
        ret = dcc((i + 1), j, 2, ind);
        i = ret[0];
        j = ret[1];
        ind--;
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + '}\n';
      }
    }else if(typ == 9){
      j = j - 1;
    }else if(typ == 10){
      j = j + 1;
    }else if(typ == 11){
      j = j - 1;
    }else if(typ == 12){
      i = i + 1;
    }else if(typ == 13){
      if(emd == 0){
        i = i + 1;
      }else if(emd == 1){
        return;
      }else{
        ret = [(i + 1), j];
        return ret;
      }
    }else if(typ == 14){
      if(emd == 0){
        i = i + 1;
      }else if(emd == 1){
        return;
      }else{
        ret = [(i + 1), j];
        return ret;
      }
    }else if(typ == 15){
      i = i + 1;
    }else if(typ == 16){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      ps2 = ops[2].split(";");
      if(prt[ps1[1]] == tag[4]){
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = "' + ps2[1] + '";\n';
      }else{
        makeind(ccc, ind);
        ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + ps2[1] + ';\n';
      }
      i = i + 1;
    }else if(typ == 17){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      lps[prt[ps1[1]]] = 1;
      makeind(ccc, ind);
      ccc.innerHTML = ccc.innerHTML + 'int ' + prn[ps1[1]] + ' = 1;\n'
      makeind(ccc, ind);
      ccc.innerHTML = ccc.innerHTML + 'while(' + prn[ps1[1]] + '){\n';
      ind++;
      i = i + 1;
    }else if(typ == 18){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      for(l = (lps.length - 1); l > prt[ps1[1]]; l--){
        if(lps[l] == 1){
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + prn[lpn[l]] + ' = 0;\n';
        }
      }
      makeind(ccc, ind);
      ccc.innerHTML = ccc.innerHTML + "break;\n";
      i = i + 1;
    }else if(typ == 19){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      for(l = (lps.length - 1); !(l < prt[ps1[1]]); l--){
        if(lps[l] == 1){
          ind--;
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + '}\n';
          lps[l] = 0;
        }
      }
      i = i + 1;
    }else if(typ == 20){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      ps2 = ops[2].split(";");
      ps3 = ops[3].split(";");
      if(ops[0] == "plus"){
        if(ps2[0] == "p"){
          if(ps3[0] == "p"){
            makeind(ccc, ind);
            ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + prn[ps2[1]] + ' + ' + prn[ps3[1]] + ';\n';
          }else{
            makeind(ccc, ind);
            ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + prn[ps2[1]] + ' + ' + parseInt(ps3[1], 10) + ';\n';
          }
        }else{
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + parseInt(ps2[1], 10) + ' + ' + parseInt(ps3[1], 10) + ';\n';
        }
      }else if(ops[0] == "minus"){
        if(ps2[0] == "p"){
          if(ps3[0] == "p"){
            makeind(ccc, ind);
            ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + prn[ps2[1]] + ' - ' + prn[ps3[1]] + ';\n';
          }else{
            makeind(ccc, ind);
            ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + prn[ps2[1]] + ' - ' + parseInt(ps3[1], 10) + ';\n';
          }
        }else{
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + parseInt(ps2[1], 10) + ' - ' + parseInt(ps3[1], 10) + ';\n';
        }
      }else if(ops[0] == "times"){
        if(ps2[0] == "p"){
          if(ps3[0] == "p"){
            makeind(ccc, ind);
            ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + prn[ps2[1]] + ' * ' + prn[ps3[1]] + ';\n';
          }else{
            makeind(ccc, ind);
            ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + prn[ps2[1]] + ' * ' + parseInt(ps3[1], 10) + ';\n';
          }
        }else{
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + parseInt(ps2[1], 10) + ' * ' + parseInt(ps3[1], 10) + ';\n';
        }
      }else{
        if(ps2[0] == "p"){
          if(ps3[0] == "p"){
            makeind(ccc, ind);
            ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + prn[ps2[1]] + ' / ' + prn[ps3[1]] + ';\n';
          }else{
            makeind(ccc, ind);
            ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + prn[ps2[1]] + ' / ' + parseInt(ps3[1], 10) + ';\n';
          }
        }else{
          makeind(ccc, ind);
          ccc.innerHTML = ccc.innerHTML + prn[ps1[1]] + ' = ' + parseInt(ps2[1], 10) + ' / ' + parseInt(ps3[1], 10) + ';\n';
        }
      }
      i = i + 1;
    }else if(typ == 21){
      ops = opt[plc[i][j]].split(":");
      ps1 = ops[1].split(";");
      ps2 = ops[2].split(";");
      ps3 = ops[3].split(";");
      ps4 = ops[4].split(";");
      i = i + 1;
      makeind(ccc, ind);
      if(ps4[1] != ""){
        ccc.innerHTML = ccc.innerHTML + ps4[1] + " = ";
      }
      for(k = 1; k < ps3.length; k++){
        ps3[k] = ps3[k].split("#")
        if(ps3[k][0] == ""){
          arg = "";
        }else if(k > 1){
          arg = arg + ", " + ps3[k][1];
        }else{
          arg = ps3[k][1];
        }
      }
      ccc.innerHTML = ccc.innerHTML + ps1[1] + "(" + arg + ");\n";
      arg = "";
      for(k = 1; k < ps3.length; k++){
        if(ps3[k][0] == ""){
	  arg = "";
        }else if(k > 1){
          if(ps3[k][0] == tag[4]){
            arg = arg + ", " + ps3[k][0] + " *" + ps3[k][1];
          }else{
            arg = arg + ", " + ps3[k][0] + " " + ps3[k][1];
          }
        }else{
          if(ps3[k][0] == tag[4]){
            arg = ps3[k][0] + " *" + ps3[k][1];
          }else{
            arg = ps3[k][0] + " " + ps3[k][1];
          }
        }
      }
      k = search(ps4[1])
      if(k > -1){
        sbr.push(ps2[1] + ";" + prt[k] + ";" + ps1[1] + ";" + arg);
      }else{
        sbr.push(ps2[1] + ";void;" + ps1[1] + ";" + arg);
      }
    }else if(typ == 22){
      i = i + 1;
    }else if(typ == 23){
      return;
    }
  }
  if(sbr.length > 0){
    fun = ccc.innerHTML;
    ccc.innerHTML = "";
    for(k = 0; k < sbr.length; k++){
      ops = sbr[k].split(";");
      ccc.innerHTML = ops[1] + " " + ops[2] + "(" + ops[3] + "){\n";
      dcc(plx[ops[0]], ply[ops[0]], 1, 1);
      fun = ccc.innerHTML + "}\n\n" + fun;
      ccc.innerHTML = "";
    }
    ccc.innerHTML = fun;
  }
  ccc.innerHTML = '#include <span><</span>stdlib.h<span>></span>\n\n' + ccc.innerHTML;
  ccc.innerHTML = '#include <span><</span>stdio.h<span>></span>\n' + ccc.innerHTML;
  dlg.insertAdjacentHTML('beforeend', '<input id="bcc" type="button" value="閉じる" onclick="dlgcls(' + "'dlg-ccc', 'bcc'" + ')">\n');
  dlg.showModal();
  return;
}

function dblclk(){
  clc++;
  if(clc == 2){
    exec();
    return;
  }
  setTimeout(function(){ clc = 0; }, dcl);
}

function setprm(name, value, type){
  prn.push(name);
  prv.push(value);
  prt.push(type);
  if(type == tag[2] || type == tag[3]){
    $("print-param").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("scan-param").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("if-param1").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("if-param2").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("subst-param").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("math-param1").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("math-param2").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("math-param3").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
  }else if(type == tag[4]){
    $("print-param").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("scan-param").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("if-param1").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("if-param2").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
    $("subst-param").insertAdjacentHTML('beforeend', '<option value="' + name + '">' + name + '</option>');
  }
} 

function setlop(name, stat){
  lpn.push(name);
  lps.push(stat);
  $("loopb-name").insertAdjacentHTML('beforeend', '<option value="' + prn[name] + '">' + prn[name] + '</option>');
  $("loope-name").insertAdjacentHTML('beforeend', '<option value="' + prn[name] + '">' + prn[name] + '</option>');

}

function keep(){
  var i, j;
  var coo = new Array();
  var tar = $("keep");
  for(i = 1; i < img.length; i++){
    coo = div((i - 1), cis);
    plc[coo[0]][coo[1]] = -1;
  }
  plc[pst[0]][pst[1]] = -1;
  for(i = 0; i < cls; i++){
    for(j = 0; j < cls; j++){
      if(plc[i][j] > -1){
        tar.innerHTML = tar.innerHTML + '0#' + obj[plc[i][j]] + '#' + i + '#' + j + '#' + opt[plc[i][j]] + '\n';
      }
    }
  }
  for(i = 0; i < prn.length; i++){
    tar.innerHTML = tar.innerHTML + '1#' + prn[i] + '#' + prv[i] + '#' + prt[i] + '\n';
  }
  for(i = 0; i < lpn.length; i++){
    tar.innerHTML = tar.innerHTML + '2#' + lpn[i] + '#' + lps[i] + '\n';
  }
  $("fkeep").submit();
}

function cdsc(){
  if($("dlg-describe") === null || !($("clsdsc") === null)){
    dlgcls("dlg-describe", "");
    $("bkg-describe").style.display = 'none';
  }
}

function init(){
  var i, j;
  var coo = new Array();
  var dsc = $("dlg-describe");
  var bkg = $("bkg-describe");
  for(i = 0; i < cls; i++){
    plc[i] = new Array();
    for(j = 0; j < cls; j++){
      $("background").insertAdjacentHTML('beforeend', '<img style="position:absolute; left:' + (i * ihw) + 'px; top:' + (j * ihw) + 'px" src="' + background + '" height="' + ihw + 'px">\n');
      plc[i].push(-1);
    }
  }
  var describe = "icons/describe.png";
  $("body").insertAdjacentHTML('beforeend', '<img id="' + tag[0] + '" style="position:absolute; left:' + (pst[0] * ihw) + 'px; top:' + (pst[1] * ihw) + 'px;" src="' + img[0] + '" height="' + (ihw - 1) + 'px">\n');
  $("body").insertAdjacentHTML('beforeend', '<img style="position:absolute; left:' + (pst[0] * ihw) + 'px; top:' + ((pst[1] - 1) * ihw) + 'px;" src="' + describe + '" height="' + (ihw - 1) + 'px" onclick="ddescribe()">\n');
  $(tag[0]).addEventListener("mousedown", dblclk, false);
  $(tag[0]).addEventListener("touchstart", dblclk, false);
  plc[pst[0]][pst[1]] = 0;
  for(i = 1; i < img.length; i++){
    if(i != 22 && i != 23){
      coo = div((i - 1), cis);
      $("body").insertAdjacentHTML('beforeend', '<img style="position:absolute; left:' + (coo[0] * ihw) + 'px; top:' + (coo[1] * ihw) + 'px" src="' + img[i] + '" height="' + (ihw - 1) + 'px" onclick="summon(' + i + ', -1, -1, 0)">\n');
      plc[coo[0]][coo[1]] = 0;
    }
  }
  keepini();
  if(typeof dsc.showModal === "function"){
    bkg.style.width = ((ihw * cls) - cls + 1) + "px";
    bkg.style.height = ((ihw * cls) - cls + 1) + "px";
    bkg.addEventListener("mousedown", cdsc, false);
    bkg.addEventListener("touchstart", cdsc, false);
    bkg.style.display = "flex";
    dsc.show();
    window.scroll({top:0});
  }else{
    alert("このブラウザはモーダルに対応していません\nブラウザを変更してください");
  }
  return;
}

