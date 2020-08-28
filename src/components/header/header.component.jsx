import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';

// to pull off values from the redux store
import { connect } from 'react-redux';

const Header = ( { currentUser } ) => {
	return(
		<div className='header'>
			<Link className='logo-container' to='/'>
				<Logo className='logo' />
			</Link>
			<div className='options'>
				<Link className='option' to='/shop'>
					SHOP
				</Link>
				<Link className='option' to='/contact'>
					CONTACT
				</Link>

				{
					currentUser ?
					<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
					:
					<Link className='option' to='/signin'>SIGN IN</Link>
				}

			</div>

		</div>
	);
}

// Here define what you want to pass in to Header component from the reducer
const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
})

/*
	Connect is a higher order component, i.e. function that gives back modified function
	Below connect 'powers up' Header component with state pulled from the redux state
	So we don't need to pass props from App.js like <Header currentUser={this.state.currentUser} />
*/
export default connect(mapStateToProps)(Header);