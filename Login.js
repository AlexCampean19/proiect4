
function Form(){
  setTimeout(function() {
    jQuery(".stilizareloader").css('display', 'none');
  
  }, 1000)
    const {useState}=React
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    let data={
      "username":email, 
      "password":password,
    }
    function Submit(e){
      e.preventDefault()
     
        fetch("https://magento-demo.tk/rest/V1/integration/customer/token",{
          method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
          body:JSON.stringify(data)
        }).then(response=>response.json())
    
        .then((response)=>{ 
        
          if(response.message==='The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.'){
            $(".msj").text('Email/password are invalid!').attr('id', 'fail').show();
            setTimeout(function() { $("#fail").hide(); 
          }, 3000);
          }else {
          sessionStorage.setItem('users',response),
          $(".msj").text('You have logged in').attr('id', 'succes').show();
          window.history.back()
    
      
        
      }
        }
        ).catch(error=>{
          console.log(error);
          $(".msj").text('We experince tehnical error! Try again later.').attr('id', 'fail').show();
          setTimeout(function() { $("#fail").hide(); 
        }, 5000);
        })
    }
   
          let url = '';
              url = 'https://magento-demo.tk/rest/default/V1/carts/mine';
   
              jQuery.ajax({
                  method: "POST",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  url: url,
                  headers: { "Authorization": "Bearer " + sessionStorage.getItem('users') }
              }).done(function(response) {
             
                  sessionStorage.removeItem('cartId')
                  sessionStorage.setItem('cartId', response)
              }).fail(function(response) {
                  console.log(response)
              });
      
  
    
    return(
      <div>
       <form onSubmit={Submit}>
   
          <label htmlFor="email">Email: </label>
          <div id="emailpass">
          <input
            type="text"
            value={email}
            placeholder="Enter a Email"
    onInput={(e)=>setEmail(e.target.value)}
          /></div>
            <label htmlFor="password">Password: </label>
            <div id="emailpass">
            <input
              type="password"
              value={password}
              placeholder="Enter a Password"
              onInput={(e)=>setPassword(e.target.value)}
            /></div>
          <button onClick={createCart} type="submit" >Login</button>
        </form>
      </div>
    )
    }
    ReactDOM.render(<Form/>,document.querySelector("#root"))