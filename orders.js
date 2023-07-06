function Orders(){
  if (!sessionStorage.getItem('users'))
  {

    if(window.location.origin.includes('github.io')){
      window.location.href=window.location.origin+'/proiect4/index.html';
    }else{
      window.location.href=window.location.origin+'/index.html'
    }
  }
    const logout=()=>{
        sessionStorage.removeItem('users')
        if(window.location.origin.includes('github.io')){
            window.location.href=window.location.origin+'/proiect4/login.html';
          }else{
            window.location.href=window.location.origin+'/login.html'
          }
    }
    const userinfolink=()=>{
        if(window.location.origin.includes('github.io')){
            window.location.href=window.location.origin+'/proiect4/userinfo.html';
          }else{
            window.location.href=window.location.origin+'/userinfo.html'
          }
    }
    const userOrders=()=>{
        if(window.location.origin.includes('github.io')){
            window.location.href=window.location.origin+'/proiect4/orders.html';
          }else{
            window.location.href=window.location.origin+'/orders.html'
          }
    }
    let template="";
    let date=sessionStorage.getItem('customers');
    let iduser=JSON.parse(date).id
        fetch("https://magento-demo.tk/rest/V1/customer/orders/"+iduser,{
    method:"GET",
    headers: { "Authorization": "Bearer " + sessionStorage.getItem('users') }
  }).then(response=> response.text()).then((response)=>{

    let raspuns=JSON.parse(response)
    for (const [key, value] of Object.entries(raspuns)){
template+='<div class="comanda"><div class="tableSmall"><p class="tableCell">Order #</p><p class="tableCell" data-label="OrderdId">'+value.order_id.slice(-2)+'</p></div><div class="tableSmall"><p class="tableCell" class="tableCell">Product Qty</p><p  class="tableCell" data-label="OrderItems">'+value.order_items+'</p></div><div class="tableSmall"><p class="tableCell">Order Date</p><p class="tableCell" data-label="OrderDate">'+value.order_date.slice(0,10)+'</p></div><div class="tableSmall"><p class="tableCell">Order Staus</p><p class="tableCell" data-label="OrderStatus">'+value.order_status+'</p></div><div class="tableSmall"><p class="tableCell">Order SubTotal</p><p class="tableCell" data-label="OrderSubtotal">'+value.order_subtotal+'</p></div><div class="tableSmall"><p class="tableCell">Order Total</p><p class="tableCell" data-label="OrderTotal">'+value.order_total+'</p></div></div>'
    }
    jQuery('#orders').append(template)
    setTimeout(function() {
      jQuery(".stilizareloader").css('display', 'none');
    
    }, 1000)
})
return (<div>
<div id="continut">
<h2>My account</h2>
    <div id="boxAdress">
      <div id="boxText">
        <a id="btnaccountinfo" onClick={userinfolink} >Account Info</a>
        <a id="btnorders" onClick={userOrders} >Orders</a>
        <a id="btnlogout" onClick={logout}>Logout</a>
        </div>
        <div id="orders">
          <div id="OrdersHeadTable">
            <p className="table_header"> Order #</p>
            <p className="table_header">Product Qty</p>
            <p className="table_header">Order Date</p>
            <p className="table_header">Order Status</p>
            <p className="table_header">Order Subtotal</p>
            <p className="table_header">Total</p>
            </div>
            </div>
            </div>
    </div>
</div>

)}
ReactDOM.render(<Orders/>,document.querySelector("#continut"))