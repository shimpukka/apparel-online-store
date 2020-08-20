import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ email: '', password: '' });
	};

	handleChange = (e) => {
		const { value, name } = e.currentTarget;
		this.setState({ [ name ] : value });
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

					<CustomButton type="submit">Sign in</CustomButton>
					<CustomButton onClick={signInWithGoogle} >Sign in with Google</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignIn;