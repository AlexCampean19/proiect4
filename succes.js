
function Succes(){
let idcomand=localStorage.getItem('yourcomandId')

        let url = ''
          url = 'https://magento-demo.tk/rest/default/V1/carts/mine'
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
            <a  className="succes"><span>Succes</span></a>
       <h1>Thank your for your purchase!</h1>
       <p>Your order # is {idcomand}<span></span></p>
        </div>
      )
      }
      ReactDOM.render(<Succes/>,document.querySelector("#root"))