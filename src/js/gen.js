function gen_run(){
  console.log("[CALL] gen_run()");
  $id("gen-code").innerHTML = "";
  data.vars  = new Array();
  data.loops = new Array();
  gen.indent = 0;
  gen.ifs    = new Array();
  gen.loops  = new Array(); // index of data.loops[]
  gen.funcs  = data.funcs.concat();
  gen.x      = def_icon.start.x;
  gen.y      = def_icon.start.y;
  gen.error = 0;
  gen.run = 1;
  for(count.gen = 0; gen.run; count.gen++){
    if(count.gen == gen.max){
      gen_error(text.genlimit);
      break;
    }
    if(gen.y < 0 || gen.y >= def_table.hgt){
      gen_error(text.border_y);
      break;
    }
    if(gen.x < 0 || gen.x >= def_table.hgt){
      gen_error(text.border_x);
      break;
    }
    target.icon = data.table[gen.y][gen.x];
    if(target.icon < 0){
      gen_error(text.noicon);
      break;
    }
    target.attr = cpyObj(data.icons[target.icon].attr);
    target.type = (data.icons[target.icon].type).split("_");
    if(target.type.length > 1){
      target.id = target.type.pop();
    }
    target.type = target.type.pop();
    switch(target.type){
      case "start":     gen.call.start();     break;
      case "end":       gen.call.end();       break;
      case "int":       gen.call.int();       break;
      case "double":    gen.call.double();    break;
      case "char":      gen.call.char();      break;
      case "print":     gen.call.print();     break;
      case "scan":      gen.call.scan();      break;
      case "if":        gen.call.if();        break;
      case "up":        gen.call.up();        break;
      case "down":      gen.call.down();      break;
      case "rightup":   gen.call.rightup();   break;
      case "rightdown": gen.call.rightdown(); break;
      case "right":     gen.call.right();     break;
      case "conf":      gen.call.conf();      break;
      case "subst":     gen.call.subst();     break;
      case "loopstart": gen.call.loopstart(); break;
      case "loopbreak": gen.call.loopbreak(); break;
      case "loopend":   gen.call.loopend();   break;
      case "math":      gen.call.math();      break;
      case "funcf":     gen.call.funcf();     break;
      case "funct":     gen.call.funct();     break;
      case "funce":     gen.call.funce();     break;
      default:          gen_error();          break;
    }
  }
  if(!gen.error){
    events.close();
    $id("dlg-gen").showModal();
    events.close = ()=>{
      $id("dlg-gen").close();
    };
  }
}

function gen_add_var(name, type, scope){
  console.log("[CALL] gen_add_var()");
  data.vars.push(new Var(name, type, scope));
  console.log("[NEWVAR] "+type+" "+name+" in "+scope);
}

function gen_add_loop(name, begin){
  console.log("[CALL] gen_add_loop()");
  data.loops.push(new Loop(name, gen.scope, begin));
  console.log("[NEWLOOP] "+name+" at icons["+begin+"]")
}

function gen_add_func(id, name, type){
  console.log("[CALL] gen_add_func()");
  data.vars.push(new Var(name, type, "global"));
  console.log("[NEWVAR] "+type+" "+name+" in "+"global");
  data.funcs[id].type = type;
  console.log("[NEWFUNC] "+type+" "+name+"()");
}

function gen_search_var(name="any", type="any", scope="any"){
  console.log("[CALL] gen_search_var()");
  console.log("[SEARCH] "+type+" "+name+" in "+scope);
  for(var i = 0; i < data.vars.length; i++){
    if(name  != "any" && data.vars[i].name  != name)  continue;
    if(type  != "any" && data.vars[i].type  != type)  continue;
    if(scope != "any" && data.vars[i].scope != scope) continue;
    return i;
  }
  return -1;
}

function gen_search_loop(name, scope){
  console.log("[CALL] gen_search_loop()");
  console.log("[SEARCH] "+"loop"+" "+name+" in "+scope);
  for(var i = 0; i < data.loops.length; i++){
    if(data.loops[i].name  != name)  continue;
    if(data.loops[i].scope != scope) continue;
    return i;
  }
  return -1;
}

function gen_search_func(name){
  console.log("[CALL] gen_search_func()");
  console.log("[SEARCH] "+"func"+" "+name);
  for(var i = 0; i < data.funcs.length; i++){
    if(data.funcs[i].name != name) continue;
    return i;
  }
  return -1;
}

function gen_error(err_msg=""){
  console.log("[CALL] gen_error()");
  if(err_msg == ""){
    msg("["+gen.y+"]["+gen.x+"]"+text.unknown);
    console.log("[ERROR] "+text.unknown);
  }else{
    msg("["+gen.y+"]["+gen.x+"]"+err_msg);
    console.log("[ERROR] "+err_msg);
  }
  gen.error = 1;
  gen.run = 0;
}

