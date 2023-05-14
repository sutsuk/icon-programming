function gen_c(){
  console.log("[CALL] gen_c()");
  gen.call.start     = gen_c_start;
  gen.call.end       = gen_c_end;
  gen.call.int       = gen_c_int;
  gen.call.double    = gen_c_double;
  gen.call.char      = gen_c_char;
  gen.call.print     = gen_c_print;
  gen.call.scan      = gen_c_scan;
  gen.call.if        = gen_c_if;
  gen.call.up        = gen_c_up;
  gen.call.down      = gen_c_down;
  gen.call.rightup   = gen_c_rightup;
  gen.call.rightdown = gen_c_rightdown;
  gen.call.right     = gen_c_right;
  gen.call.conf      = gen_c_conf;
  gen.call.subst     = gen_c_subst;
  gen.call.loopstart = gen_c_loopstart;
  gen.call.loopbreak = gen_c_loopbreak;
  gen.call.loopend   = gen_c_loopend;
  gen.call.math      = gen_c_math;
  gen.call.funcf     = gen_c_funcf;
  gen.call.funct     = gen_c_funct;
  gen.call.funce     = gen_c_funce;
  gen_run();
}

function gen_c_start(){
  console.log("[CALL] gen_c_start()");
  gen_code("#include &lt;stdio.h&gt;");
  gen_code("#include &lt;stdlib.h&gt;");
  gen_code();
  gen_code("int main(void){", true, _);
  gen.x += 1; 
}

function gen_c_end(){
  console.log("[CALL] gen_c_end()");
  gen_code("return 0;");
  gen_code("}", _, true);
  if(gen.funcs.length > 0){
    gen.func = gen.funcs.pop();
    target.id = gen.func.begin;
    if(target.id < 0){
      gen_error(text.nofuncbegin);
      return;
    }
    gen.x = data.icons[target.id].x;
    gen.y = data.icons[target.id].y;
  }else{
    gen.run = 0;
  }
}

function gen_c_int(){
  console.log("[CALL] gen_c_int()");
  target.name = data.icons[target.icon].attr.name;
  gen_add_var(target.name, target.type, gen.scope);
  gen_code("int "+target.name+";");
  gen.x += 1;
}

function gen_c_double(){
  console.log("[CALL] gen_c_double()");
  target.name = data.icons[target.icon].attr.name;
  gen_add_var(target.name, target.type, gen.scope);
  gen_code("double "+target.name+";");
  gen.x += 1;
}

function gen_c_char(){
  console.log("[CALL] gen_c_char()");
  target.name = data.icons[target.icon].attr.name;
  gen_add_var(target.name, target.type, gen.scope);
  gen_code("char *"+target.name+";");
  gen.x += 1;
}

function gen_c_print(){
  console.log("[CALL] gen_c_print)");
  if(target.attr.val.t1 == "var"){
    target.id = gen_search_var(target.attr.val.v1, _, gen.scope);
    if(target.id < 0){
      gen_error(text.wrongscope);
      return;
    }
    target.type = data.vars[target.id].type;
    target.name = data.vars[target.id].name;
    switch(target.type){
      case "int":    gen_code('printf("%d\\n", '+target.name+');'); break;
      case "double": gen_code('printf("%f\\n", '+target.name+');'); break;
      case "char":   gen_code('printf("%s\\n", '+target.name+');'); break;
    }
  }else{
    gen_code('printf("'+target.attr.val.v1+'\\n");');
  }
  gen.x += 1;
}

function gen_c_scan(){
  console.log("[CALL] gen_c_scan()");
  target.id = gen_search_var(target.attr.name, _, gen.scope);
  if(target.id < 0){
    gen_error(text.wrongscope);
    return;
  }
  target.type = data.vars[target.id].type;
  switch(target.type){
    case "int":    gen_code('scan("%d", &'+target.name+');'); break;
    case "double": gen_code('scan("%f", &'+target.name+');'); break;
    case "char":   gen_code('scan("%s", '+target.name+');');  break;
  }
  gen.x += 1;
}

function gen_c_if(){
  console.log("[CALL] gen_c_if()");
  target.id = [target.id, -1, -1];
  gen.ifs.push(new If(gen.x, gen.y));
  if(target.attr.val.t1 == "var"){
    target.id[1] = gen_search_var(target.attr.val.v1, _, gen.scope);
    if(target.id[1] < 0){
      gen_error(text.wrongscope);
      return;
    }
    target.name = [data.vars[target.id[1]].name, ""]
    if(target.attr.val.t2 == "var"){
      target.id[2] = gen_search_var(target.attr.val.v2, _, gen.scope);
      if(target.id[2] < 0){
        gen_error(text.wrongscope);
        return;
      }
      target.name[1] = data.vars[target.id[2]].name
      gen_code('if('+target.name[0]+' == '+target.name[1]+'){', true, _);
    }else{
      if(isNumType(data.vars[target.id[1]].type)){
        gen_code('if('+target.name[0]+' == '+target.attr.val.v2+'){', true, _);
      }else{
        gen_code('if(strcmp('+target.name[0]+', "'+target.attr.val.v2+'") == 0){', true, _);
      }
    }
  }else{
    if(target.attr.val.v1 == "false"){
      gen_code('if(0){', true, _);
    }else{
      gen_code('if(1){', true, _);
    }
  }
  if(gen.ifs[gen.ifs.length - 1].skip){
    gen.x += 1;
  }else if(target.id[0] == "1"){
    gen.y += 1;
  }else{
    gen.y -= 1;
  }
}

function gen_c_up(){
  console.log("[CALL] gen_c_up()");
  gen.y -= 1;
}

function gen_c_down(){
  console.log("[CALL] gen_c_down()");
  gen.y += 1;
}

function gen_c_rightup(){
  console.log("[CALL] gen_c_rightup()");
  gen.y -= 1;
}

function gen_c_rightdown(){
  console.log("[CALL] gen_c_rightdown()");
  gen.x += 1;
}

