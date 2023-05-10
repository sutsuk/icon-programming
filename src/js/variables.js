var params = (new URL(location.href)).searchParams;
var lang = "ja";
var text = new Object();
var NEXT = ()=>{};
var _ = undefined;
var def_table = new Object();
  def_table.hgt = 20;
  def_table.wdt = 20;
var def_icon = new Object();
  def_icon.hgt   = 70;
  def_icon.wdt   = 70;
  def_icon.bg    = null;
  def_icon.start = new Object();
    def_icon.start.x = 4;
    def_icon.start.y = 1;
  def_icon.icons = new Array(); // {src, tag}
  def_icon.rows  = parseInt(window.innerHeight / def_icon.hgt);
  def_icon.x     = (window.innerWidth - def_icon.wdt) / 2;
  def_icon.y     = (window.innerHeight - def_icon.hgt) / 2;
var reset_delay  = 700;
var count = new Object();
  count.click   = 0;
  count.exec    = 0;
  count.codegen = 0;
var target = new Object();
  target.DOM   = null;
  target.type  = "";
  target.attr  = new Attr();
  target.icon  = -1;
  target.name  = "";
  target.id    = 0;
  target.x     = 0;
  target.y     = 0;
  target.left  = 0;
  target.top   = 0;
var events = new Object();
  events.mode   = "";
  events.DOM    = null;
  events.close  = ()=>{};
  events.ok     = ()=>{};
  events.cancel = ()=>{};
var data = new Object();
  data.table = new Array(); // (int)[def_icon.hgt][def_icon.wdt]
  data.icons = new Array(); // {type, DOM, x, y, attr}
  data.vars  = new Array(); // {name, type, scope, value}
  data.loops = new Array(); // {name, scope, begin, end}
  data.funcs = new Array(); // {name, type, args, ret, src, begin, end}
var exec = new Object();
  exec.max   = 1000;
  exec.run   = 0;
  exec.error = 0;
  exec.loops = new Array(); // index of data.loops[]
  exec.x     = new Array();
  exec.y     = new Array();
  exec.scope = ["global"];
  exec.nest  = 0;
var gen = new Object();
  gen.max    = 1000;
  gen.run    = 0;
  gen.error  = 0;
  gen.ifs    = new Array(); // {x, y, skip}
  gen.loops  = new Array(); // index of data.loops[]
  gen.func   = new Object();
  gen.funcs  = new Array();
  gen.scope  = "global";
  gen.x      = 0;
  gen.y      = 0;
  gen.indent = 0;
  gen.tab    = "  ";
  gen.call   = new Object();
    gen.call.start     = ()=>{};
    gen.call.end       = ()=>{};
    gen.call.int       = ()=>{};
    gen.call.double    = ()=>{};
    gen.call.char      = ()=>{};
    gen.call.print     = ()=>{};
    gen.call.scan      = ()=>{};
    gen.call.if        = ()=>{};
    gen.call.up        = ()=>{};
    gen.call.down      = ()=>{};
    gen.call.rightup   = ()=>{};
    gen.call.rightdown = ()=>{};
    gen.call.right     = ()=>{};
    gen.call.conf      = ()=>{};
    gen.call.subst     = ()=>{};
    gen.call.loopstart = ()=>{};
    gen.call.loopbreak = ()=>{};
    gen.call.loopend   = ()=>{};
    gen.call.math      = ()=>{};
    gen.call.funcf     = ()=>{};
    gen.call.funct     = ()=>{};
    gen.call.funce     = ()=>{};
