

function Checkout(){
  const {useState}=React
  const [radioValue, setRadioValue] = useState(0);
  const onClick = (ev) => {
    console.log(ev.target.value);
    sessionStorage.setItem('delivery',ev.target.value)
  };
const open=()=>{
  $(".popup-overlay, .popup-content").addClass("active");
}
 const close=()=>{
  $(".popup-overlay, .popup-content").removeClass("active");
 }
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
  console.log(response.status)
  console.log(JSON.parse(response))
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
console.log()
    let template='';
    let template1='';
    fetch("https://magento-demo.tk/rest/default/V1/carts/mine",{
    method:"GET",
    headers: { "Authorization": "Bearer " + sessionStorage.getItem('users') }
  }).then(response=> response.text()).then((response)=>{
    console.log(JSON.parse(response))
    let raspuns=JSON.parse(response)

    for (const [key, value] of Object.entries(raspuns.items)) {
        template += '<div class="cumparaturi" data-id="' + value.item_id + '"><img id="imgsh" src="' + value.extension_attributes.image + '" /><div class="detfruct" ><p  class="numeFruct" >' + value.name + '</p><p id="quantyy">Qty:</p><input class="valuequanty" value="' + value.qty + '"><div class="pricebut"><p class="price">Price: ' + value.price + ' $</p></div></div></div> '
   
      } 
    jQuery('#cos').append(template)

})

fetch("https://magento-demo.tk/rest/V1/customers/me",{
method:"GET",
headers: { "Authorization": "Bearer " + sessionStorage.getItem('users') }
}).then(response=> response.text()).then((response)=>{
  console.log(JSON.parse(response))
let raspuns=JSON.parse(response)
sessionStorage.setItem('customers',response)
for (const [key, value] of Object.entries(raspuns.addresses)){
console.log(value.city)

template1+='<label class="addresbx" for="radiobut"><input  type="radio" name="radiobut" class="selectaddress"  value="'+value.id+'"/><p class="adresstext">'+value.firstname+'</p><p class="adresstext">'+value.lastname+'</p><p class="adresstext">'+raspuns.dob+'</p><p class="adresstext">'+value.postcode+' '+value.street+'</p><p class="adresstext">'+value.city+' '+value.region.region_code+' '+value.region.region_id+'</p><p class="adresstext">'+value.country_id+'</p><p class="adresstext">'+value.telephone+'</p></label>';
}

jQuery("#adrese").append(template1)
jQuery("#subtotal").html(value.subtotal)
$('input[name="radiobut"]').change(function() {
console.log([$('input[name="radiobut"]:checked').val()])
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
fetch("https://magento-demo.tk/rest/V1/carts/mine/shipping-information",{

  method:"POST",
  headers: { "Authorization": "Bearer " + sessionStorage.getItem('users'),  'Content-Type': 'application/json' },

  body:payload,
}).then(response=> response.text()).then((response)=>{
 
  let raspuns=JSON.parse(response)
console.log(raspuns)
jQuery('#subtotal').text(raspuns.totals.subtotal + "$")
});
})

if(raspuns.addresses[0].default_billing===true){
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
    "shipping_method_code":  sessionStorage.getItem('delivery')
  
}
});
fetch("https://magento-demo.tk/rest/V1/carts/mine/shipping-information",{

  method:"POST",
  headers: { "Authorization": "Bearer " + sessionStorage.getItem('users'),  'Content-Type': 'application/json' },

  body:payload,
}).then(response=> response.text()).then((response)=>{
 
  let raspuns=JSON.parse(response)
console.log(raspuns)
jQuery('#subtotal').text(raspuns.totals.subtotal + "$")
});
}

})
let adrese2=JSON.parse(adrese).addresses
console.log(adrese2);
let adrsselect=JSON.parse(sessionStorage.getItem('adrsselectata'))
function selectare(){fetch("https://magento-demo.tk/rest/V1/carts/mine/payment-information",{

  method:"POST",
  headers: { "Authorization": "Bearer " + sessionStorage.getItem('users'),  'Content-Type': 'application/json' },

  body:JSON.stringify({
    
      "paymentMethod": {
        "method": "cashondelivery"
      },
      "billing_address": {
        "email": adrsselect.email,
        "region": adrsselect.region.region,
        "region_id":adrsselect.region_id,
        "region_code": adrsselect.region_code,
        "country_id":adrsselect.country_id,
        "street": [
          adrsselect.street[0]
        ],
        "postcode": adrsselect.postcode,
        "city": adrsselect.city,
        "telephone": adrsselect.telephone,
        "firstname": adrsselect.firstname,
        "lastname": adrsselect.lastname
      
    }

  }),
}).then(response=> response.text()).then((response)=>{
 
  let raspuns=JSON.parse(response)
console.log(raspuns)

});}
  


return(
    <div>
    
<div className="comandamea"><h3>Cart summary</h3><div id="cos"><div className="subtotal"><p>Subtotal:</p><p id="subtotal"></p></div></div></div>
<div id="adrese"></div>

<form className="shipping"><h3>Shipping method</h3>
<label className="shopmethod" >Courier Shipping <input  onChange={onClick} value={'flatrate'} type="radio" name="delivery" id="curier"/></label>
<label className="shopmethod">Store Pickup <input  onChange={onClick} value={"freeshipping"} type="radio" name="delivery" id="ridicare"/></label>
</form>
<div className="butoane"> 
<button id="submitOrd" onClick={selectare}>Submit Order</button>
<button id="addAdres" onClick={open}>Add New Address</button>
</div>
<div className="popup-overlay">
<div className="headernewadres">
    <h2>New Adress</h2>
     <button id="close" onClick={close}>X</button> </div>
  <form className="popup-content">

     
     <div className="names">
<div className="nume"><p>First Name </p> <input className="first" type="text" placeholder="First Name" required/></div>
<div className="nume"><p>Last Name</p>  <input className="last" type="text" placeholder="Last Name" required/></div></div>
<p>Address</p>  <input className="date" type="text" placeholder="Address" required/>
<p>Country </p> <input className="date" type="text" placeholder="Country" required/>
<p>State </p> <input className="date"  type="text" placeholder="State" required/>
<p>City</p>  <input className="date"  type="text" placeholder="City" required/>
<p>Zip Code</p>  <input className="date"  type="text" placeholder="Zip Code" required/>
<p>Telephone</p> <input  className="date" type="text" placeholder="Telephone" required/>

   </form>
<button id="addadres">Add Adress</button>
</div>


    </div>
)}
ReactDOM.render(<Checkout/>,document.querySelector("#checkout"))