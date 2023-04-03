
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
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      body:JSON.stringify(data)
    }).then((response)=>{
      console.log(response)
      sessionStorage.setItem('users',response)
    })
}

return(
  <div>
   <form onSubmit={Submit}>
      <label htmlFor="email">Email: </label>
      <input
        type="text"
        value={email}
        placeholder="enter a Email"
onInput={(e)=>setEmail(e.target.value)}
      />
      <div>
        <label htmlFor="password">password: </label>
        <input
          type="password"
          value={password}
          placeholder="enter a password"
          onInput={(e)=>setPassword(e.target.value)}
        />
      </div>
      <button type="submit" >Login</button>
    </form>
  </div>
)
}
ReactDOM.render(<Form/>,document.querySelector("#root"))