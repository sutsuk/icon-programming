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

