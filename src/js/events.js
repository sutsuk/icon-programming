function icon_summon(tag, x, y, attr){
  console.log("[CALL] icon_summon()");
  var len_icons = data.icons.length;
  var body = $id("body");
  var icon = def_icon.icons[tag];
  var id = icon.tag+"-"+len_icons;
  var src = icon.src;
  var pos = {x: x, y: y};
  if(x < 0 || y < 0){
    pos.x = def_icon.x;
    pos.y = def_icon.y;
  }else{
    pos.x *= def_icon.wdt;
    pos.y *= def_icon.hgt;
  }
  add_html(body, make_html_img(id, _, src, def_icon.hgt, new Loc(pos.y, pos.x)));
  data.icons.push(new Icon(icon.tag, $id(id), x, y, attr));
  data.icons[len_icons].DOM.addEventListener("mousedown", icon_hold);
  data.icons[len_icons].DOM.addEventListener("touchstart", icon_hold);
  data.icons[len_icons].DOM.addEventListener("mouseup", icon_release);
  data.icons[len_icons].DOM.addEventListener("touchend", icon_release);
}

function icon_hold(event){
  console.log("[CALL] icon_hold()");
  events.DOM = this;
  target.DOM = this;
  target.icon = (events.DOM.id).split('-')[1];
  if(data.icons[target.icon].x >= 0 && data.icons[target.icon].y >= 0){
    data.table[data.icons[target.icon].y][data.icons[target.icon].x] = -1;
  }
  if(event.type == "touchstart"){
    event = event.changedTouches[0];
    def_icon.y = def_icon.hgt * (def_icon.start.y + 3 / 2);
    def_icon.x = def_icon.wdt * (def_icon.start.x + 3 / 2);
  }
  target.x = event.pageX - (target.DOM).offsetLeft;
  target.y = event.pageY - (target.DOM).offsetTop;
  if(count.click == 1){
    icon_release();
    input_attr(target.icon);
  }else{
    count.click += 1;
    setTimeout(()=>{
      count.click = 0;
    }, reset_delay);
  }
}

function icon_move(event){
  if(events.DOM != null){
    // console.log("[CALL] icon_move()");
    event.preventDefault();
    if(event.type == "touchmove"){
      event = event.changedTouches[0];
    }
    (events.DOM).style.left = (event.pageX - target.x) + "px";
    (events.DOM).style.top = (event.pageY - target.y) + "px";
  }
}

