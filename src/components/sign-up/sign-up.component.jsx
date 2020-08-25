import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
       
        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});
           
            // initialize state
            this.setState ({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch (error){
            console.error(error);
        }
    }

    handleChange = (e) => {
        const { value, name } = e.currentTarget; 
        this.setState( { [name] : value} );
    }

    render(){
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2>I do not have an account.</h2>
                <span>Sign up with your email and password.</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                        type='text'
                        name='displayName'
                        label='Display name'
                        value={displayName}
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        type='email'
                        name='email'
                        label='Email'
                        value={email}
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        type='password'
                        name='password'
                        label='Password'
                        value={password}
                        onChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        type='password'
                        name='confirmPassword'
                        label='Confirm password'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        required
                    />
                    <CustomButton type="submit">Sign Up</CustomButton>
                </form>
            </div>
        )
    }  
}

export default SignUp;