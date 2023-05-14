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

