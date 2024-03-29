function exec_run(){
  console.log("[CALL] exec_run()");
  data.vars  = new Array();
  data.loops = new Array();
  target.DOM = $id("exec-output");
  target.DOM.innerHTML = "";
  exec.x = [def_icon.start.x];
  exec.y = [def_icon.start.y];
  exec.loops = new Array(); // index of data.loops[]
  exec.nest = 0;
  exec.error = 0;
  exec.run = 1;
  for(count.exec = 0; exec.run; count.exec++){
    if(count.exec == exec.max){
      exec_error(text.execlimit);
      break;
    }
    if(exec.y[exec.nest] < 0 || exec.y[exec.nest] >= def_table.hgt){
      exec_error(text.border_y);
      break;
    }
    if(exec.x[exec.nest] < 0 || exec.x[exec.nest] >= def_table.wdt){
      exec_error(text.border_x);
      break;
    }
    target.icon = data.table[exec.y[exec.nest]][exec.x[exec.nest]];
    if(target.icon < 0){
      exec_error(text.noicon);
      break;
    }
    target.attr = cpyObj(data.icons[target.icon].attr);
    target.type = (data.icons[target.icon].type).split("_");
    if(target.type.length > 1){
      target.id = target.type.pop();
    }
    target.type = target.type.pop();
    switch(target.type){
      case "start":     exec_start();     break;
      case "end":       exec_end();       break;
      case "int":       exec_int();       break;
      case "double":    exec_double();    break;
      case "char":      exec_char();      break;
      case "print":     exec_print();     break;
      case "scan":      exec_scan();      break;
      case "if":        exec_if();        break;
      case "up":        exec_up();        break;
      case "down":      exec_down();      break;
      case "rightup":   exec_rightup();   break;
      case "rightdown": exec_rightdown(); break;
      case "right":     exec_right();     break;
      case "conf":      exec_conf();      break;
      case "subst":     exec_subst();     break;
      case "loopstart": exec_loopstart(); break;
      case "loopbreak": exec_loopbreak(); break;
      case "loopend":   exec_loopend();   break;
      case "math":      exec_math();      break;
      case "funcf":     exec_funcf();     break;
      case "funct":     exec_funct();     break;
      case "funce":     exec_funce();     break;
      default:          exec_error();     break;
    }
  }
  if(!exec.error){
    events.close();
    $id("dlg-exec").showModal();
    events.close = ()=>{
      $id("dlg-exec").close();
    };
  }
}

function exec_add_var(name, type, scope){
  console.log("[CALL] exec_add_var()");
  data.vars.push(new Var(name, type, scope));
  console.log("[NEWVAR] "+type+" "+name+" in "+scope);
}

function exec_add_loop(name, begin){
  console.log("[CALL] exec_add_loop()");
  data.loops.push(new Loop(name, exec.scope[exec.nest], begin));
  console.log("[NEWLOOP] "+name+" at icons["+begin+"]")
}

function exec_add_func(id, name, type){
  console.log("[CALL] exec_add_func()");
  data.vars.push(new Var(name, type, "global"));
  console.log("[NEWVAR] "+type+" "+name+" in "+"global");
  data.funcs[id].type = type;
  console.log("[NEWFUNC] "+type+" "+name+"()");
}

function exec_search_var(name, type="any", scope="any"){
  console.log("[CALL] exec_search_var()");
  console.log("[SEARCH] "+type+" "+name+" in "+scope);
  for(var i = 0; i < data.vars.length; i++){
    if(name  != "any" && data.vars[i].name  != name)  continue;
    if(type  != "any" && data.vars[i].type  != type)  continue;
    if(scope != "any" && data.vars[i].scope != scope) continue;
    return i;
  }
  return -1;
}

function exec_search_loop(name, scope){
  console.log("[CALL] exec_search_loop()");
  console.log("[SEARCH] "+"loop"+" "+name+" in "+scope);
  for(var i = 0; i < data.loops.length; i++){
    if(data.loops[i].name  != name)  continue;
    if(data.loops[i].scope != scope) continue;
    return i;
  }
  return -1;
}

function exec_search_func(name){
  console.log("[CALL] exec_search_func()");
  console.log("[SEARCH] "+"func"+" "+name);
  for(var i = 0; i < data.funcs.length; i++){
    if(data.funcs[i].name != name) continue;
    return i;
  }
  return -1;
}

function exec_error(err_msg=""){
  console.log("[CALL] exec_error()");
  if(err_msg == ""){
    msg("["+exec.y[exec.nest]+"]["+exec.x[exec.nest]+"]"+text.unknown);
    console.log("[ERROR] "+text.unknown);
  }else{
    msg("["+exec.y[exec.nest]+"]["+exec.x[exec.nest]+"]"+err_msg);
    console.log("[ERROR] "+err_msg);
  }
  exec.error = 1;
  exec.run = 0;
}

function exec_start(){
  console.log("[CALL] exec_start()");
  exec.x[exec.nest] += 1;
}

function exec_end(){
  console.log("[CALL] exec_end()");
  exec.run = 0;
}

function exec_int(){
  console.log("[CALL] exec_int()");
  target.name = data.icons[target.icon].attr.name;
  exec_add_var(target.name, target.type, exec.scope[exec.nest]);
  exec.x[exec.nest] += 1;
}

function exec_double(){
  console.log("[CALL] exec_double()");
  target.name = data.icons[target.icon].attr.name;
  exec_add_var(target.name, target.type, exec.scope[exec.nest]);
  exec.x[exec.nest] += 1;
}

function exec_char(){
  console.log("[CALL] exec_char()");
  target.name = data.icons[target.icon].attr.name;
  exec_add_var(target.name, target.type, exec.scope[exec.nest]);
  exec.x[exec.nest] += 1;
}

function exec_print(){
  console.log("[CALL] exec_print()");
  target.DOM = $id("exec-output");
  if(target.attr.val.t1 == "var"){
    target.id = exec_search_var(target.attr.val.v1, _, exec.scope[exec.nest]);
    if(target.id < 0){
      exec_error(text.wrongscope);
    }else{
      target.DOM.innerHTML += data.vars[target.id].value+"\n";
      console.log("[STDOUT] "+data.vars[target.id].value);
    }
  }else{
    target.DOM.innerHTML += target.attr.val.v1+"\n";
    console.log("[STDOUT] "+target.attr.val.v1);
  }
  exec.x[exec.nest] += 1;
}

function exec_scan(){
  console.log("[CALL] exec_scan()");
  target.id = exec_search_var(target.attr.name, _, exec.scope[exec.nest]);
  if(target.id < 0){
    exec_error(text.wrongscope);
    return;
  }
  data.vars[target.id].value = prompt(text.scan);
  console.log("[STDIN] "+data.vars[target.id].value);
  target.type = data.vars[target.id].type;
  if(isNumType(target.type)){
    if(!isNum(data.vars[target.id].value)){
      exec_error(text.difftype);
      return;
    }
  }
  data.vars[target.id].value = Cast(data.vars[target.id].value, target.type);
  exec.x[exec.nest] += 1;
}

function exec_if(){
  console.log("[CALL] exec_if()");
  var id = target.id;
  if(target.attr.val.t1 == "var"){
    target.id = exec_search_var(target.attr.val.v1, _, exec.scope[exec.nest]);
    if(target.id < 0){
      exec_error(text.wrongscope);
    }else{
      target.attr.val.v1 = data.vars[target.id].value;
      if(target.attr.val.t2 == "var"){
        target.id = exec_search_var(target.attr.val.v2, _, exec.scope[exec.nest]);
        if(target.id < 0){
          exec_error(text.wrongscope);
        }else{
          target.attr.val.v2 = data.vars[target.id].value;
        }
      }
    }
    if(target.attr.val.v1 == target.attr.val.v2){
      target.attr.val.v1 = "true";
    }else{
      target.attr.val.v1 = "false";
    }
  }
  if(target.attr.val.v1 == "false"){
    exec.x[exec.nest] += 1;
  }else if(id == "1"){
    exec.y[exec.nest] += 1;
  }else{
    exec.y[exec.nest] -= 1;
  }
}

function exec_up(){
  console.log("[CALL] exec_up()");
  exec.y[exec.nest] -= 1;
}

function exec_down(){
  console.log("[CALL] exec_down()");
  exec.y[exec.nest] += 1;
}

function exec_rightup(){
  console.log("[CALL] exec_rightup()");
  exec.y[exec.nest] -= 1;
}

function exec_rightdown(){
  console.log("[CALL] exec_rightdown()");
  exec.x[exec.nest] += 1;
}

function exec_right(){
  console.log("[CALL] exec_right()");
  exec.x[exec.nest] += 1;
}

function exec_conf(){
  console.log("[CALL] exec_conf()");
  exec.x[exec.nest] += 1;
}

function exec_subst(){
  console.log("[CALL] exec_subst()");
  target.id = exec_search_var(target.attr.name, _, exec.scope[exec.nest]);
  if(target.id < 0){
    exec_error(text.wrongscope);
  }else{
    target.type = data.vars[target.id].type;
    if(isNumType(target.type)){
      if(!isNum(target.attr.val.v1)){
        exec_error(text.difftype);
        return;
      }
    }
    data.vars[target.id].value = Cast(target.attr.val.v1, target.type);
  }
  exec.x[exec.nest] += 1;
}

function exec_loopstart(){
  console.log("[CALL] exec_loopstart()");
  exec_add_loop(target.attr.name, target.icon);
  exec.loops.push(exec_search_loop(target.attr.name, exec.scope[exec.nest]));
  exec.x[exec.nest] += 1;
}

function exec_loopbreak(){
  console.log("[CALL] exec_loopbreak()");
  target.id = exec_search_loop(target.attr.name, exec.scope[exec.nest]);
  if(target.id < 0){
    exec_error(text.wrongscope);
  }else{
    for(var i = 0; i < exec.loops.length; i++){
      if(exec.loops.pop() == target.id){
        break;
      }else if(i == exec.loops.length - 1){
        exec_error(text.noloopend);
        return;
      }
    }
  }
  target.icon = data.loops[target.id].end;
  if(target.icon < 0){
    exec_error(text.noloopend);
    return;
  }else{
    exec.x[exec.nest] = data.icons[target.icon].x + 1;
    exec.y[exec.nest] = data.icons[target.icon].y;
  }
}

function exec_loopend(){
  console.log("[CALL] exec_loopend()");
  target.id = exec_search_loop(target.attr.name, exec.scope[exec.nest]);
  if(target.id < 0){
    exec_error(text.wrongscope);
  }else{
    data.loops[target.id].end = target.icon;
    target.icon = data.loops[target.id].begin;
    exec.x[exec.nest] = data.icons[target.icon].x + 1;
    exec.y[exec.nest] = data.icons[target.icon].y;
  }
}

function exec_math(){
  console.log("[CALL] exec_math()");
  if(target.attr.val.t2 == "var"){
    target.id = exec_search_var(target.attr.val.v2, _, exec.scope[exec.nest]);
    if(target.id < 0){
      exec_error(text.wrongscope);
      return;
    }
    if(!isNumType(data.vars[target.id].type)){
      exec_error(text.difftype);
      return;
    }
    target.attr.val.v2 = data.vars[target.id].value;
  }
  if(target.attr.val.t3 == "var"){
    target.id = exec_search_var(target.attr.val.v3, _, exec.scope[exec.nest]);
    if(target.id < 0){
      exec_error(text.wrongscope);
      return;
    }
    if(!isNumType(data.vars[target.id].type)){
      exec_error(text.difftype);
      return;
    }
    target.attr.val.v3 = data.vars[target.id].value;
  }
  if(!isNum(target.attr.val.v2) || !isNum(target.attr.val.v3)){
    exec_error(text.difftype);
    return;
  }
  target.id = exec_search_var(target.attr.val.v1, _, exec.scope[exec.nest]);
  if(target.id < 0){
    exec_error(text.wrongscope);
    return;
  }
  target.type = data.vars[target.id].type;
  target.attr.val.v2 = Cast(target.attr.val.v2, target.type);
  target.attr.val.v3 = Cast(target.attr.val.v3, target.type); 
  if(target.attr.expr == "plus"){ 
    data.vars[target.id].value = target.attr.val.v2 + target.attr.val.v3;
  }else if(target.attr.expr == "minus"){
    data.vars[target.id].value = target.attr.val.v2 - target.attr.val.v3;
  }else if(target.attr.expr == "times"){
    data.vars[target.id].value = target.attr.val.v2 * target.attr.val.v3;
  }else{
    data.vars[target.id].value = target.attr.val.v2 / target.attr.val.v3;
  }
  exec.x[exec.nest] += 1;
}

function exec_funcf(){
  console.log("[CALL] exec_funcf()");
  target.id = [exec_search_func(target.attr.name), -1];
  if(target.id[0] < 0){
    exec_error(text.nofunc);
    return;
  }
  if(target.attr.val.v3 == ""){
    target.type = "void";
  }else{
    target.id[1] = exec_search_var(target.attr.val.v3, _, exec.scope[exec.nest]);
    if(target.id[1] < 0){
      exec_error(text.wrongscope);
      return;
    }
    target.type = data.vars[target.id[1]].type;
  }
  exec_add_func(target.id[0], target.attr.name, target.type);
  target.id = data.funcs[target.id[0]].begin;
  if(target.id < 0){
    exec_error(text.nofuncbegin);
    return;
  }
  exec.x.push(data.icons[target.id].x);
  exec.y.push(data.icons[target.id].y);
  for(var i = 0; i < target.attr.val.v2.length; i++){
    target.id = exec_search_var(target.attr.val.v2[i], _, exec.scope[exec.nest]);
    if(target.id < 0){
      exec_error(text.wrongscope);
      return;
    }
    target.name = data.vars[target.id].name;
    target.type = data.vars[target.id].type;
    exec_add_var(target.name, target.type, target.attr.name);
    data.vars[data.vars.length - 1].value = data.vars[target.id].value;
  }
  exec.nest += 1;
  exec.scope.push(target.attr.name);
}

function exec_funct(){
  console.log("[CALL] exec_funct()");
  exec.x[exec.nest] += 1;
}

function exec_funce(){
  console.log("[CALL] exec_funce()");
  if(target.attr.val.v2 != ""){
    target.name = target.attr.val.v2;
    target.id = exec_search_var(target.name, _, exec.scope[exec.nest]);
    if(target.id < 0){
      exec_error(text.wrongscope);
      return;
    }
    target.attr.val.t1 = data.vars[target.id].type;
    target.attr.val.v1 = data.vars[target.id].value;
  }else{
    target.attr.val.t1 = "";
  }
  exec.nest -= 1;
  target.id = exec_search_func(target.attr.val.v3);
  if(target.id < 0){
    exec_error(text.nofunc);
    return;
  }
  target.name = data.funcs[target.id].ret;
  if(target.name != ""){
    target.id = exec_search_var(target.name, _, exec.scope[exec.nest]);
    if(target.id < 0){
      exec_error(text.wrongscope);
      return;
    }
    target.attr.val.t2 = data.vars[target.id].type;
    target.attr.val.v2 = target.id;
  }else{
    target.attr.val.t2 = "";
  }
  if(target.attr.val.t1 != "" && target.attr.val.t2 != ""){
    if(target.attr.val.t1 != target.attr.val.t2){
      exec_error(text.difftype);
      return;
    }
    data.vars[target.attr.val.v2].value = target.attr.val.v1;
  }
  exec.x.pop();
  exec.y.pop();
  exec.scope.pop();
  exec.x[exec.nest] += 1;
}

