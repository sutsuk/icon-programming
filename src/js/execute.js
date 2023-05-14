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

