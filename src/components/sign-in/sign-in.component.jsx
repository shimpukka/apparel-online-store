import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		// sign in with username and password using auth
		const { email, password } = this.state;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: '', password: '' }); // clear the state and form, when sign in succeeds
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = (e) => {
		const { value, name } = e.currentTarget;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account. </h2>
				<span>Sign in with your email and password.</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						value={this.state.email}
						handleChange={this.handleChange}
						label="Email"
					/>

					<FormInput
						name="password"
						type="password"
						value={this.state.password}
						onChange={this.handleChange}
						label="Password"
					/>

					<div className="buttons">
						<CustomButton type="submit">Sign in</CustomButton>
						<CustomButton type="button" onClick={signInWithGoogle} isGoogleSignedIn>Sign in with Google</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;