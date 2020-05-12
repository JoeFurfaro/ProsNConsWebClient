var id = window.location.href.split("=")[1];

$.get("http://localhost:3000/posts/get?id=" + id, {}, function (x, y) {
  if (y == "success") {
    $("#title").html(x.title);
    $("#author").html("By " + x.author);
    for (pro of x.pros) {
      let el = document.createElement("p");
      el.setAttribute("class", "text-dark text-center");
      el.innerHTML = pro;
      document.getElementById("pros").appendChild(el);
    }
    for (con of x.cons) {
      let el = document.createElement("p");
      el.setAttribute("class", "text-dark text-center");
      el.innerHTML = con;
      document.getElementById("cons").appendChild(el);
    }
  } else {
    alert("An error occurred!");
  }
});

function copyshare() {
  const el = document.createElement("textarea");
  el.value = window.location.href;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
