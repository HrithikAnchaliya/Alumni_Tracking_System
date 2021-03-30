import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import MyCheckoutForm from './MyCheckoutForm'

const stripePromise = loadStripe('pk_test_uJpCl5urNjXS3xdeNWqjcKhT007dhp8OM9');

export default class Setup extends React.Component{
    render(){
        return(
            <div>
                  <Elements stripe={stripePromise}>
                        <MyCheckoutForm />
                  </Elements>
            </div>
        )
    }
}
