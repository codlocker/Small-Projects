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
// Default Global Variables
var url="https://codlocker.github.io/Small-Projects/orderTrack/orders.json";
var count_fetch_data = 0;
var total_data = 0;
function performAutocomplete() {
  /*Search Functonality */
  var values = [];
  var data = document.getElementsByClassName("orders-list")[0].getElementsByClassName("orderid");
  var data_len = data.length;
  for (var it = 0;it < data_len;it++) {
      var iden = data[it].getElementsByClassName("text-center")[0].textContent;
        //console.log(iden);
        values.push(iden);
        total_data+=1;
    }
    $( "#search-box" ).autocomplete({
      autoFocus: true,
      source: values,
      delay: 50,
      minLength: 1
    });
}
function getHistory() {
  var values = [];
  var div_searched_order = document.getElementsByClassName("searched-order")[0];
  var history = div_searched_order.getElementsByClassName("order-panel");
  if(history.length > 0) {
    for(var j = 0;j<history.length;j++) {
      var req_class = history[j].classList[2];
      values.push(req_class);
    }
  }
  else {
    values.push("No Suggestions");
  }
  $( "#search-box" ).autocomplete({
    source: values,
    delay: 0,
    autoFocus: true,
    minLength: 0
  }).focus(function(){
    $(this).autocomplete("search");
  });
}
function getOrderStatus() {
    var value = $("#search-box").val();
    var i;
    if(value != "") {
    var orderslist = document.getElementsByClassName("order-panel");
    for(i=0;i<orderslist.length;i++) {
      try {
        var classList = orderslist[i].classList[2];
        if(classList == value) {
          $(".searched-order").css({"display" : "block"});
          var temp = orderslist[i];
          $("."+value).css("background-color", "#ccffcc");
          $(temp).appendTo(".searched-order");
          break;
        }
      }
      catch(Exception) {
        console.log("Does Not Exists");
      }
    }
    if(i=== orderslist.length) {
      alert("Order ID does not exist");
    }
  }
  else {
    console.log("Empty String");
  }
}
