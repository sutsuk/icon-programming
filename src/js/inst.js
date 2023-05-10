function DefIcon(src, tag){
  this.src = src;
  this.tag = tag;
}

function Icon(type, DOM, x, y, attr){
  this.type = type;
  this.DOM = DOM;
  this.x = x;
  this.y = y;
  this.attr = attr;
}

function Attr(name="", val={t1:"",v1:"",t2:"",v2:"",t3:"",v3:""}, expr=""){
  this.name = name;
  this.val = val;
  this.expr = expr;
} 

function Loc(style_top, style_left){
  this.top = style_top;
  this.left = style_left;
}

function Pos(x, y){
  this.x = x;
  this.y = y;
}

function Var(name, type, scope){
  this.name = name;
  this.type = type;
  this.scope = scope;
  this.value = "";
}

function Loop(name, scope, begin, end=-1){
  this.name  = name;
  this.scope = scope;
  this.begin = begin;
  this.end   = end;
}

function If(x, y){
  this.x    = x;
  this.y    = y;
  this.skip = 0;
}

function Func(name, args, ret, begin){
  this.name  = name;
  this.type  = "void";
  this.args  = args;
  this.ret   = ret;
  this.src   = -1;
  this.begin = begin;
  this.end   = begin + 1;
}

