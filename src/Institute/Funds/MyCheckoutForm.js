import React from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';



const MyCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

const handleSubmit = async (event) => {
  event.preventDefault();

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type :'card',
    card : elements.getElement(CardElement)
  });

  if(!error){
    // const { id } = paymentMethod;
    console.log(paymentMethod)
  }

  try{
    let values = {
      id : paymentMethod.id, amount : 1200
    }
    const data = await fetch('./secret', values);
    const json = data.json();
    console.log(json);
  }catch(error){

  }
  }

  return (
    <form style={{maxWidth : '400px' , margin : '0 auto'}} onSubmit={handleSubmit}>
      <CardElement />
      <br/>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

export default MyCheckoutForm;


// export default class MyCheckoutForm extends React.Component{

//     async handleSubmit(event){
//         event.preventDefault();
//         const {stripe, elements} = this.props;

//         if (!stripe || !elements) {

//           return;
//         }
    
//         const cardElement = elements.getElement(CardElement);
    
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//           type: 'card',
//           card: cardElement,
//         });
    
//         if (error) {
//           console.log('[error]', error);
//         } else {
//           console.log('[PaymentMethod]', paymentMethod);
//         }
//     }

//     render(){
//         const { elements, stripe } = this.props;
//         console.log(stripe );
//         console.log(elements);
//         return(
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <CardElement   options={{
//                         style: {
//                           base: {
//                             fontSize: '16px',
//                             color: '#424770',
//                             '::placeholder': {
//                               color: '#aab7c4',
//                             },
//                           },
//                           invalid: {
//                             color: '#9e2146',
//                           },
//                         },
//                       }} />
//                     <button type="submit">
//                     Pay
//                     </button>
//                 </form>
//             </div>
//         )
//     }
// }

// const InjectedCheckoutForm = () => {
//     return (
//       <ElementsConsumer>
//         {({elements, stripe}) => (
//           <MyCheckoutForm elements={elements} stripe={stripe} />
//         )}
//       </ElementsConsumer>
//     );
//   };