function setcookie(a, b, c) {
  if (c) {
    var d = new Date();
    d.setDate(d.getDate() + c);
  }
  if (a && b) {
    document.cookie = a + '=' + b + (c ? '; expires=' + d.toUTCString() : '');
  }
  else {
    return false;
  }
}

function getcookie(a) {
  var b = new RegExp(a + '=([^;]){1,}');
  var c = b.exec(document.cookie);
  if (c) c = c[0].split('=');
  else {
    return false; return c[1] ? c[1] : false;
  }
}

setcookie("block", "yes", 10) //Cтавим кук (10 - число действующих дней

var block = getcookie("block");
if (block != "yes") {
  console.log('Проверка');
}
else {
  $("#errorbody").show("fast");
}
