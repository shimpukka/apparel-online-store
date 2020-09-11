import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ( { price } ) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_51HQ5ULDJyz00BwPVNUUrlxR0GhOu14NIqzcgrkBmjfvUVsZsQTQN3sDEyoMxpzbQRGAjKFPQVivnuHitbjiz8efp00VeI6200E';

	// This function fires on submit and this handles the submission
	// We are not going to process the payment for now, will be handled in backend
	const onToken = token => {
		console.log(token);
		alert('Payment successgul');
	}

	return (
		<StripeCheckout
			label='Pay Now'
			name='Test apparel comapany'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;