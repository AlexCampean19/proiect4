

function Infousers(){
    let template='';
fetch("https://magento-demo.tk/rest/V1/customers/me",{
    method:"GET",
    headers: { "Authorization": "Bearer " + sessionStorage.getItem('users') }
  }).then(response=> response.text()).then((response)=>{
    console.log(JSON.parse(response))
    let raspuns=JSON.parse(response)
    jQuery('#firstname').html(raspuns.firstname)
    jQuery('#lastname').html(raspuns.lastname)
    jQuery('#email').html(raspuns.email)
    jQuery('#dob').html(raspuns.dob)
    console.log(raspuns.addresses)
            for (const [key, value] of Object.entries(raspuns.addresses)){
console.log(value.city)
template+='<div class="addresbx"><h3 class="numeprincipal">City:</h3><p class="datesecundare">'+value.city+'</p><h3 class="numeprincipal">Street:</h3><p class="datesecundare">'+value.street[0]+'</p><h3 class="numeprincipal">Region:</h3><p class="datesecundare">'+value.region.region+'</p><h3 class="numeprincipal">Telephone:</h3><p class="datesecundare">'+value.telephone+'</p></div>';
            }
            jQuery("#addres").append(template)
})
   


    return(
<div id="continut"><div id="personaldata">
<h2>Personal Data:</h2><div>
    <h3 className="numeprincipal">Your First Name:</h3><p className="datesecundare" id="firstname"></p>
    <h3 className="numeprincipal">Your Last Name:</h3><p className="datesecundare"  id="lastname"></p>
    <h3 className="numeprincipal">Your Email:</h3><p className="datesecundare"  id="email"></p>
    <h3 className="numeprincipal">Your Date:</h3><p className="datesecundare"   id="dob"></p></div></div>
    <div className="adrese">
    <h2 id="myadres">My Adress:</h2>
    <div id="addres"></div></div>
</div>
    )}
    ReactDOM.render(<Infousers/>,document.querySelector("#infouser"))