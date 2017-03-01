function getJSONFile(path, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                if (callback) callback(data);
            }
        }
    };
    request.open('GET', path, false);
    request.send();
}
var url="https://codlocker.github.io/WebDev-Projects/orderTrack/orders.json";
function performAutocomplete() {
  /*Search Functonality */
  var values = [];
  getJSONFile(url,function(json){
    for (x in json) {
        values.push(x);
    }
    $( "#search-box" ).autocomplete({
      autoFocus: true,
      source: values,
      delay: 50,
      minLength: 0
    });
  });
}
function getHistory() {
  var values = ["P0111","P0020"];
  var div_searched_order = document.getElementsByClassName("searched-order")[0];
  var history = div_searched_order.getElementsByClassName("order-panel");
  for(var j = 0;j<history.length;j++) {
    var req_class = history[j].classList[2];
    values.push(x);
  }
  $( "#search-box" ).autocomplete({
    source: values,
    delay: 0,
    minLength: 0
  });
}
function getOrderStatus() {
    var value = $("#search-box").val();
    if(value != "") {
    var orderslist = document.getElementsByClassName("order-panel");
    for(var i=0;i<orderslist.length;i++) {
      try {
        var classList = orderslist[i].classList[2];
        if(classList == value) {
          $(".searched-order").css({"display" : "block"});
          var temp = orderslist[i];
          $("."+value).css("background-color", "#ccffcc");
          $(temp).appendTo(".searched-order");
        }
      }
      catch(Exception) {
        console.log("Does Not Exists");
      }
    }
  }
  else {
    console.log("Empty String");
  }
}
