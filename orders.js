function Orders(){
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
    console.log(JSON.parse(response))
    let raspuns=JSON.parse(response)
    for (const [key, value] of Object.entries(raspuns)){
template+='<div class="comanda"><p>'+value.order_id.slice(-2)+'</p><p>'+value.order_items+'</p><p>'+value.order_date.slice(0,10)+'</p><p>'+value.order_status+'</p><p>'+value.order_subtotal+'</p><p>'+value.order_total+'</p></div>'
    }
    jQuery('.comenzi').append(template)
})
return (<div>
<div id="continut">
<h2>My account</h2>
    <div id="boxAdress"><div id="boxText"><a id="btnaccountinfo" onClick={userinfolink} >Account Info</a><a id="btnorders" onClick={userOrders} >Orders</a><a id="btnlogout" onClick={logout}>Logout</a></div><div id="orders"><div id="OrdersHeadTable"><p>Order #</p><p>Product Qty</p><p>Order Date</p><p>Order Status</p><p>Order Subtotal</p><p>Total</p></div><div className="comenzi"></div></div></div>
    </div>
</div>

)}
ReactDOM.render(<Orders/>,document.querySelector("#orders"))