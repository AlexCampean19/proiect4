
function Succes(){
let idcomand=sessionStorage.getItem('yourcomandId')
      return(
        <div>
            <a  className="succes"><span>Succes</span></a>
       <h1>Thank your for your purchase!</h1>
       <p>Your order # is {idcomand}<span></span></p>
        </div>
      )
      }
      ReactDOM.render(<Succes/>,document.querySelector("#root"))