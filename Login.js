

function Form(){
const {useState}=React
const [email,setEmail]=useState("")
const[password,setPassword]=useState("")
let data={
  "username":email, 
  "password":password,
}
function Submit(e){
  e.preventDefault()
  console.log("email",email)
  console.log("password",password)
    fetch("https://magento-demo.tk/rest/V1/integration/customer/token",{
      method:"POST",
    headers:{
      'Content-Type': 'application/json'
    },
      body:JSON.stringify(data)
    }).then(response=> response.text()).then((response)=>{
      console.log(response),
      sessionStorage.setItem('users',response.replace(/['"]+/g, '')),
      $(".msj").text('You have logged in').attr('id', 'succes').show();
      setTimeout(function() { $("#succes").hide(); }, 5000);
      window.location.reload(false)
    }
    )
}

return(
  <div>
   <form onSubmit={Submit}>
   <i id="lgpagelogo"><span>Logo</span></i>
      <label htmlFor="email">Email: </label>
      <div id="emailpass">
      <i id="emailAdress"><span>Email</span></i>
      <input
        type="text"
        value={email}
        placeholder="Enter a Email"
onInput={(e)=>setEmail(e.target.value)}
      /></div>
        <label htmlFor="password">Password: </label>
        <div id="emailpass">
        <i id="pass"><span>Pass</span></i>
        <input
          type="password"
          value={password}
          placeholder="Enter a Password"
          onInput={(e)=>setPassword(e.target.value)}
        /></div>
      <button  type="submit" >Login</button>
    </form>
  </div>
)
}
ReactDOM.render(<Form/>,document.querySelector("#root"))