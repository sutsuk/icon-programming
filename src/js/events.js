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

