function Checkout(){
  if (!sessionStorage.getItem('users'))
{
  if(window.location.origin.includes('github.io')){
    window.location.href=window.location.origin+'/proiect4/index.html';
  }else{
    window.location.href=window.location.origin+'/index.html'
  }
}
  const {useState}=React
  const [radioValue, setRadioValue] = useState(0);
 
  const onClick = (ev) => {

    sessionStorage.setItem('delivery',ev.target.value)
  };
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






    let template='';
    let template1='';
    fetch("https://magento-demo.tk/rest/default/V1/carts/mine",{
    method:"GET",
    headers: { "Authorization": "Bearer " + sessionStorage.getItem('users')}
  }).then(response=> response.text()).then((response)=>{

    let raspuns=JSON.parse(response)

if(raspuns.items == 0){
  if(window.location.origin.includes('github.io')){
    window.location.href=window.location.origin+'/proiect4/index.html';
  }else{
    window.location.href=window.location.origin+'/index.html'
  }
}else{
    for (const [key, value] of Object.entries(raspuns.items)) {
        template += '<div class="cumparaturi" data-id="' + value.item_id + '"><img id="imgsh" src="' + value.extension_attributes.image + '" /><div class="detfruct" ><p  class="numeFruct" >' + value.name + '</p><div class="quantity"><p id="quantyy">Qty:</p><input class="valuequanty" value="' + value.qty + '"></div><div class="pricebut"><p class="price">Price: ' + value.price + ' $</p></div></div></div> '
   
      } 
    jQuery('#cos').append(template)
    }
})

fetch("https://magento-demo.tk/rest/V1/customers/me",{
method:"GET",
headers: { "Authorization": "Bearer " + sessionStorage.getItem('users') }
}).then(response=> response.text()).then((response)=>{

let raspuns=JSON.parse(response)

sessionStorage.setItem('customers',response)
sessionStorage.setItem('adrese',response.addresses)
for (const [key, value] of Object.entries(raspuns.addresses)){


template1+='<input type="radio" name="radiobut" id="'+value.id+'" class="selectaddress"  value="'+value.id+'"/><label class="adrsel"  for="'+value.id+'"><span class="input-radio-faux"></span><p class="adresstext">'+value.firstname+' '+value.lastname+'</p><p class="adresstext">'+raspuns.dob+'</p><p class="adresstext">'+value.postcode+' '+value.street+'</p><p class="adresstext">'+value.city+' '+value.region.region_code+' '+value.region.region_id+'</p><p class="adresstext">'+value.country_id+'</p><p class="adresstext">'+value.telephone+'</p></label>';
}

jQuery("#adrese").append(template1)


$('.selectaddress').change(function() {

let id=$('input[name="radiobut"]:checked').val()

var filterData=adrese2.filter(function(item){
  return( id.indexOf(parseInt(item.id))>-1)
})
sessionStorage.setItem('adrsselectata',JSON.stringify(filterData[0]))
let payload= JSON.stringify({
  "addressInformation": {
    "shipping_address": {
      "region": filterData[0].region.region,
      "region_id": filterData[0].region.region_id,
      "region_code": filterData[0].region.region_code,
      "country_id": filterData[0].country_id,
      "street": [
        filterData[0].street[0]
      ],
      "postcode": filterData[0].postcode,
      "city":filterData[0].city,
      "firstname": filterData[0].firstname,
      "lastname": filterData[0].lastname,
      "customer_id": filterData[0].customer_id,
      "email": filterData[0].email,
      "telephone": filterData[0].telephone,
   
    },
   
    "shipping_carrier_code": sessionStorage.getItem('delivery'),
    "shipping_method_code":  sessionStorage.getItem('delivery')
  
}
});


let adrese=sessionStorage.getItem('customers')
let adresaprincpala=JSON.parse(adrese).addresses[0];
fetch("https://magento-demo.tk/rest/V1/carts/mine/estimate-shipping-methods",{
method:"POST",
headers: { "Authorization": "Bearer " + sessionStorage.getItem('users'),  'Content-Type': 'application/json' },

body: JSON.stringify({
"address": {
    "region": adresaprincpala.region.region,
    "region_id": adresaprincpala.region.region_id,
    "region_code": adresaprincpala.region.region_code,
    "country_id": adresaprincpala.country_id,
    "street": [
        adresaprincpala.street[0]
    ],
    "postcode": adresaprincpala.postcode,
    "city": adresaprincpala.city,
    "firstname": adresaprincpala.firstname,
    "lastname": adresaprincpala.lastname,
    "customer_id": adresaprincpala.customer_id,
    "email": adresaprincpala.email,
    "telephone": adresaprincpala.telephone,
    "same_as_billing": 1
}
}),
}).then(response=> response.text()).then((response)=>{

let raspuns=JSON.parse(response)
if(raspuns[0].carrier_title==="Store Pickup"){
jQuery("#ridicare").attr("checked",true)
sessionStorage.setItem('delivery','freeshipping')
}
if(raspuns[0].carrier_title==="Courier Shipping"){
jQuery("#curier").attr("checked",true)
sessionStorage.setItem('delivery','flatrate')
}

});
fetch("https://magento-demo.tk/rest/V1/carts/mine/shipping-information",{

  method:"POST",
  headers: { "Authorization": "Bearer " + sessionStorage.getItem('users'),  'Content-Type': 'application/json' },

  body:payload,
}).then(response=> response.text()).then((response)=>{
 
  let raspuns=JSON.parse(response)

jQuery('#subtotal').text(raspuns.totals.subtotal + "$")
setTimeout(function() {
  jQuery(".stilizareloader").css('display', 'none');

}, 1000)
});
})

if(raspuns.addresses[0].default_billing===true){
  if($('#ridciare').is(':checked')) {
    let ridicare=jQuery('#ridicare').val()
    sessionStorage.setItem('delivery',ridicare)
  }else{
    let curier=$('#curier').val()
    sessionStorage.setItem('delivery',curier)
    }
  
jQuery('input[name="radiobut"]:first').attr('checked',true)
let id=jQuery('input[name="radiobut"]:first').attr('checked',true).val()
var filterData=adrese2.filter(function(item){
  return( id.indexOf(parseInt(item.id))>-1)
  
})
sessionStorage.setItem('adrsselectata',JSON.stringify(filterData[0]))
let payload= JSON.stringify({
  "addressInformation": {
    "shipping_address": {
      "region": filterData[0].region.region,
      "region_id": filterData[0].region.region_id,
      "region_code": filterData[0].region.region_code,
      "country_id": filterData[0].country_id,
      "street": [
        filterData[0].street[0]
      ],
      "postcode": filterData[0].postcode,
      "city":filterData[0].city,
      "firstname": filterData[0].firstname,
      "lastname": filterData[0].lastname,
      "customer_id": filterData[0].customer_id,
      "email": filterData[0].email,
      "telephone": filterData[0].telephone,
   
    },
   
    "shipping_carrier_code": sessionStorage.getItem('delivery'),
    "shipping_method_code": sessionStorage.getItem('delivery'),
  
}
});
fetch("https://magento-demo.tk/rest/V1/carts/mine/shipping-information",{

  method:"POST",
  headers: { "Authorization": "Bearer " + sessionStorage.getItem('users'),  'Content-Type': 'application/json' },

  body:payload,
}).then(response=> response.text()).then((response)=>{
  if(response){
  setTimeout(function() {
    jQuery(".stilizareloader").css('display', 'none');
  
  }, 1000)}
  let raspuns=JSON.parse(response)

sessionStorage.setItem('paymethod',response)
jQuery('#subtotal').text(raspuns.totals.subtotal + "$")
});
}

})
let adrese=sessionStorage.getItem('customers')
console.log(JSON.parse(adrese).addresses)
let adrese2=JSON.parse(adrese).addresses


let adrsselect=JSON.parse(sessionStorage.getItem('adrsselectata'))
let email=JSON.parse(sessionStorage.getItem('customers')).email

function selectare(){fetch("https://magento-demo.tk/rest/V1/carts/mine/payment-information",{

  method:"POST",
  headers: { "Authorization": "Bearer " + sessionStorage.getItem('users'),  'Content-Type': 'application/json' },

  body:JSON.stringify({
    
      "paymentMethod": {
        "method": "cashondelivery"
      },
      "billing_address": {
        "email": email,
        "region": JSON.parse(sessionStorage.getItem('adrsselectata')).region.region,
        "region_id":JSON.parse(sessionStorage.getItem('adrsselectata')).region.region_id,
        "region_code": JSON.parse(sessionStorage.getItem('adrsselectata')).region.region_code,
        "country_id":JSON.parse(sessionStorage.getItem('adrsselectata')).country_id,
        "street": [
          JSON.parse(sessionStorage.getItem('adrsselectata')).street[0]
        ],
        "postcode": JSON.parse(sessionStorage.getItem('adrsselectata')).postcode,
        "city": JSON.parse(sessionStorage.getItem('adrsselectata')).city,
        "telephone": JSON.parse(sessionStorage.getItem('adrsselectata')).telephone,
        "firstname": JSON.parse(sessionStorage.getItem('adrsselectata')).firstname,
        "lastname": JSON.parse(sessionStorage.getItem('adrsselectata')).lastname
    }
  }),
}).then(response=> response.text()).then((response)=>{
 
  let raspuns=JSON.parse(response)

localStorage.setItem('yourcomandId',JSON.stringify(raspuns))
if(!raspuns.message){
  if(window.location.origin.includes('github.io')){
    window.location.href=window.location.origin+'/proiect4/succes.html';
  }else{
    window.location.href=window.location.origin+'/succes.html'
  }
}else{ $(".msj").text('Your submit is not posible').attr('id', 'fail').show();
}
})
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


function alegereTara()
{let templateRegiune='';
  fetch("https://magento-demo.tk/rest/V1/directory/countries/"+sessionStorage.getItem('idTara').replace(/['"]+/g, ''),{
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

  


return(
    <div>
    
<div className="comandamea"><h3>Cart summary</h3><div id="cos"></div><div className="subtotal"><p>Subtotal:</p><p id="subtotal"></p></div></div>
<div id="adrese"></div>

<form className="shipping"><h3>Shipping method</h3>
<label className="shopmethod" >Courier Shipping <input  onChange={onClick} value={'flatrate'} type="radio" name="delivery" id="curier"/></label>
<label className="shopmethod">Store Pickup <input  onChange={onClick} value={"freeshipping"} type="radio" name="delivery" id="ridicare"/></label>
</form>
<div className="butoane"> 
<button id="submitOrd"onClick={selectare}>Submit Order</button>
<button id="addAdres" onClick={open}>Add New Address</button>
</div>
<div className="popup-overlay">
<div className="headernewadres">
    <h2>New Adress</h2>
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
</div>


    </div>
)}
ReactDOM.render(<Checkout/>,document.querySelector("#checkout"))