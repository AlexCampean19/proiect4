
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
const open=()=>{
  $(".popup-overlay, .popup-content").addClass("active");
}
 const close=()=>{
  $(".popup-overlay, .popup-content").removeClass("active");
 }
const tara= (ev)=>{
  sessionStorage.setItem('idTara',JSON.stringify(ev.target.value));

  alegereTara()
};
const region=(ev)=>{

  sessionStorage.setItem('orasSelectat',JSON.stringify(ev.target.value))
  let coduriOrase=JSON.parse(sessionStorage.getItem('taraAleasa')).available_regions;
let judetgasit=coduriOrase.filter(judet=>judet.name == ev.target.value)
sessionStorage.setItem('judetSelectat',JSON.stringify(judetgasit))
}
let templateCountry='';

  fetch("https://magento-demo.tk/rest/V1/directory/countries",{
    method:"GET",
  })
.then(response=> response.text()).then((response)=>{

  let raspuns=JSON.parse(response)

  for (const [key, value] of Object.entries(raspuns)) {
   
    templateCountry+='    <option value='+value.id+'>'+value.full_name_english+'</option>';
 
  }
  jQuery('#country').append(templateCountry)

})

let templateRegiune='';
function alegereTara()
{fetch("https://magento-demo.tk/rest/V1/directory/countries/"+sessionStorage.getItem('idTara').replace(/['"]+/g, ''),{
  method:"GET",
})
.then(response=> response.text()).then((response)=>{
  
let raspuns=JSON.parse(response)
for (const [key, value] of Object.entries(raspuns.available_regions)) {
  templateRegiune+='<option class="judet" value="'+value.name+'">'+value.name+'</option>'
}
jQuery('#state').html(templateRegiune)


sessionStorage.setItem('taraAleasa',response)

})}

function addAdres(){
fetch("https://magento-demo.tk/rest/V1/curs/adresa",{
  method:"POST",
  headers: { "Authorization": "Bearer " + sessionStorage.getItem('users'),  'Content-Type': 'application/json'},
  body:JSON.stringify({
    "customer_id": JSON.parse(sessionStorage.getItem('customers')).id,
    "first_name":jQuery('#firstname').val(),
    "last_name":jQuery('#lastname').val(),
    "region_id": JSON.parse(sessionStorage.getItem('judetSelectat'))[0].id,
    "country_id": JSON.parse(sessionStorage.getItem('idTara')),
    "street":  jQuery('#address').val(),
    "telephone": jQuery('#telefon').val(),
    "city": jQuery('#city').val(),
    "zip_code":  jQuery('#zipcode').val(),
  }),
}).then(response=> response.text()).then((response)=>{

  let raspuns=JSON.parse(response)

window.location.reload(true)
})
}

let template='';    
fetch("https://magento-demo.tk/rest/V1/customers/me",{
method:"GET",
headers: { "Authorization": "Bearer " + sessionStorage.getItem('users') }
}).then(response=> response.text()).then((response)=>{
  
let raspuns=JSON.parse(response)
sessionStorage.setItem('customers',response)
for (const [key, value] of Object.entries(raspuns.addresses)){

template+='<div class="addresbx"><p class="adresstext">'+value.firstname+'</p><p class="adresstext">'+value.lastname+'</p><p class="adresstext">'+raspuns.dob+'</p><p class="adresstext">'+value.postcode+' '+value.street+'</p><p class="adresstext">'+value.city+' '+value.region.region_code+' '+value.region.region_id+'</p><p class="adresstext">'+value.country_id+'</p><p class="adresstext">'+value.telephone+'</p></div>';
}
jQuery("#addres").append(template)
setTimeout(function() {
  jQuery(".stilizareloader").css('display', 'none');

}, 1000)
})
    return(
<div id="continut">
<h2>My account</h2>
    <div id="boxAdress"><div id="boxText"><a id="btnaccountinfo" onClick={userinfolink} >Account Info</a><a onClick={userOrders} id="btnorders" >Orders</a><div className="popup-overlay">

<div className="headernewadres">
    <h2 >New Adress</h2>
     <button id="close" onClick={close}>X</button> </div>
  <form className="popup-content">

     
     <div className="names">
<div className="nume"><p>First Name </p> <input className="first" type="text" id="firstname" placeholder="First Name" required/></div>
<div className="nume"><p>Last Name</p>  <input className="last" id="lastname" type="text" placeholder="Last Name" required/></div></div>
<p>Address</p>  <input className="date" id="address" type="text" placeholder="Address" required/>
<p >Country</p> <select  onChange={tara} required id="country"><option value="Country">Country</option></select>
<p>State </p><select  onChange={region} required id="state"><option  value="State">State</option></select>
<p>City</p>  <input className="date"  type="text" id="city" placeholder="City" required/>
<p>Zip Code</p>  <input className="date"  type="text" id="zipcode"placeholder="Zip Code" required/>
<p>Telephone</p> <input  className="date" type="text" id="telefon" placeholder="Telephone" required/>

   </form>
<button id="addadres" onClick={addAdres}>Add Adress</button>
</div><a id="btnlogout" onClick={logout}>Logout</a></div><div id="addres"></div></div>
<button id="btnnewaddress" onClick={open}>Add Address</button>
    </div>

    )}
    ReactDOM.render(<Infousers/>,document.querySelector("#infouser"))