
function Infousers(){
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
let template='';    
fetch("https://magento-demo.tk/rest/V1/customers/me",{
method:"GET",
headers: { "Authorization": "Bearer " + sessionStorage.getItem('users') }
}).then(response=> response.text()).then((response)=>{
  console.log(JSON.parse(response))
let raspuns=JSON.parse(response)
sessionStorage.setItem('customers',response)
for (const [key, value] of Object.entries(raspuns.addresses)){
console.log(value.city)
template+='<div class="addresbx"><p class="adresstext">'+value.firstname+'</p><p class="adresstext">'+value.lastname+'</p><p class="adresstext">'+raspuns.dob+'</p><p class="adresstext">'+value.postcode+' '+value.street+'</p><p class="adresstext">'+value.city+' '+value.region.region_code+' '+value.region.region_id+'</p><p class="adresstext">'+value.country_id+'</p><p class="adresstext">'+value.telephone+'</p></div>';
}
jQuery("#addres").append(template)
})
    return(
<div id="continut">
<h2>My account</h2>
    <div id="boxAdress"><div id="boxText"><a id="btnaccountinfo" onClick={userinfolink} >Account Info</a><a onClick={userOrders} id="btnorders" >Orders</a><a id="btnlogout" onClick={logout}>Logout</a></div><div id="addres"></div></div>
    </div>

    )}
    ReactDOM.render(<Infousers/>,document.querySelector("#infouser"))