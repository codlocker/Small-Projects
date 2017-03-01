//console.log(json);
getJSONFile(url,function(json){
    for(x in json) {
      var order_panel = document.createElement("div");
      $(order_panel).addClass("order-panel row "+x);
      var ex_element = document.getElementsByClassName("orders-list")[0];
      /*Now append the contents for order-id*/
      var orderid_div = document.createElement("div");
      $(orderid_div).addClass("col-large-2 col-medium-2 col-small-2 orderid");
      orderid_div.innerHTML='<p class = "text-center">'+x+"</p>";
      order_panel.append(orderid_div);
      /*Now append the contents for status*/
      var status_div = document.createElement("div");
      $(status_div).addClass("col-large-9 col-medium-7 col-small-7 status");
      status_text = json[x].status;
      if(json[x].status =="Repair") {
        status_text+=(" :: <b> Date - "+json[x].repair_date+"</b>");
      }
      else if(json[x].status == "Pickup") {
        status_text+=(" :: <b> Date - "+json[x].pickup_date+"</b>");
      }
      else if(json[x].status == "Delivery") {
        status_text+=(" :: <b> Date - "+json[x].Delivery_date+"</b>");
      }
      else {
        status_text+=(" :: <b>No Status Exists</b>");
      }
      status_div.innerHTML='<p class = "text-center">'+status_text+"</p>";
      order_panel.append(status_div);

      /*Now append the contents for Options Div Element*/
      var options_div = document.createElement("div");
      $(options_div).addClass("col-large-1 col-medium-3 col-small-3 options");
      var options_text = '<p class="text-center"><span class="fa fa-envelope"></span><span class="fa fa-caret-down sh-symbol"></span></p>';
      options_div.innerHTML = options_text;
      order_panel.append(options_div);
      /*Append Description of the Orders*/
      var desc_div = document.createElement("div");
      $(desc_div).addClass("col-large-12 col-medium-12 col-small-12 order-description");
      var desc_text = "";
      /*Fill Description regarding the order*/
      if(json[x].status =="Repair") {
        desc_text+=("<b> Time - "+json[x].repair_time+"</b><br>" + "<b>Comments : </b>" + json[x].comments);
      }
      else if(json[x].status == "Pickup") {
        desc_text+=("<b> Time - "+json[x].pickup_time+"</b>" + "&nbsp;&nbsp;&nbsp;<b>Executive Name : </b>" + json[x].executive_name + "<b>&nbsp;&nbsp;&nbsp;Number : </b>" + json[x].number);
      }
      else if(json[x].status == "Delivery") {
        desc_text+=("<b> Time - "+json[x].Delivery_time+"</b>" + "&nbsp;&nbsp;&nbsp;<b>Executive Name : </b>" + json[x].executive_name + "<b>&nbsp;&nbsp;&nbsp;Number : </b>" + json[x].number);
      }
      else {
        desc_text+=(" :: <b>No Description Exists</b>");
      }
      desc_div.innerHTML = desc_text;
      order_panel.append(desc_div);
      ex_element.append(order_panel);
    }
});
