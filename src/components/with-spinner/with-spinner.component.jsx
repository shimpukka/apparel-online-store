import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

// Spinner is a higher order component (HOC), that takes an component to wrap as an prop, and returns new functional component
const WithSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        // is ifLoading prop of the wrapped component is true, then return spinner component, otherwise render the wrapped component 
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer/>
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps}/>
        )
    };
    return Spinner;    
};

export default WithSpinner;
