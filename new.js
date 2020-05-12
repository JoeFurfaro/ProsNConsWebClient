var next_pro = 1;
var next_con = 1;

function enter_pro(event) {
  event = event || window.event;
  var key_code = event.keyCode || event.which;
  if (key_code == 13) {
    add_pro();
  }
}

function enter_con(event) {
  event = event || window.event;
  var key_code = event.keyCode || event.which;
  if (key_code == 13) {
    add_con();
  }
}

function remove_pro(id) {
  $("#pro-row-" + id).remove();
}

function remove_con(id) {
  $("#con-row-" + id).remove();
}

function add_pro() {
  let div = document.createElement("div");
  div.setAttribute("class", "row pro-row mt-3");
  div.setAttribute("id", "pro-row-" + next_pro);
  let input = document.createElement("input");
  input.setAttribute("id", "pro-" + next_pro);
  input.setAttribute("onkeyup", "enter_pro(event)");
  input.style.width = "70%";
  input.setAttribute("class", "pro-data form-control text-center ml-auto");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter pro");
  let btn = document.createElement("button");
  btn.setAttribute("class", "btn btn-danger mr-auto ml-2");
  btn.setAttribute("onclick", "remove_pro(" + next_pro + ")");
  btn.innerHTML = "&times;";
  div.appendChild(input);
  div.appendChild(btn);
  document.getElementById("pros").appendChild(div);
  $("#pro-" + next_pro).focus();
  next_pro++;
}

function add_con() {
  let div = document.createElement("div");
  div.setAttribute("class", "row con-row mt-3");
  div.setAttribute("id", "con-row-" + next_con);
  let input = document.createElement("input");
  input.setAttribute("id", "con-" + next_con);
  input.setAttribute("onkeyup", "enter_con(event)");
  input.style.width = "70%";
  input.setAttribute("class", "con-data form-control text-center ml-auto");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter con");
  let btn = document.createElement("button");
  btn.setAttribute("class", "btn btn-danger mr-auto ml-2");
  btn.setAttribute("onclick", "remove_con(" + next_con + ")");
  btn.innerHTML = "&times;";
  div.appendChild(input);
  div.appendChild(btn);
  document.getElementById("cons").appendChild(div);
  $("#con-" + next_con).focus();
  next_con++;
}

function submit() {
  let author = $("#author").val();
  if (author == "") {
    alert("You must enter your name!");
    return;
  }
  let title = $("#title").val();
  if (title == "") {
    alert("You must enter today's topic!");
    return;
  }

  let pros = [];
  let cons = [];

  let pro_inputs = document.getElementsByClassName("pro-data");
  for (input of pro_inputs) {
    pros.push(input.value);
  }
  let con_inputs = document.getElementsByClassName("con-data");
  for (input of con_inputs) {
    cons.push(input.value);
  }

  packet = {
    title: title,
    author: author,
    pros: pros.join("|||||"),
    cons: cons.join("|||||"),
  };

  console.log(packet);

  $("#submit-button").prop("disabled", true);
  $("#submit-button").html("Publishing...");

  $.post("http://localhost:3000/posts/add", packet, function (x, y) {
    if (y == "success") {
      window.location.href = "view.html?id=" + x.post_id;
    } else {
      alert("An error occurred!");
    }
    $("#submit-button").prop("disabled", false);
    $("#submit-button").html("Publish");
  });
}
