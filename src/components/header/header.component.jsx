import React from 'react';
import { Link } from 'react-router-dom';
// to pull off values from the redux store
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ( { currentUser, hidden } ) => {
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

			<CartIcon />
			</div>
			{ hidden ? null : <CartDropdown /> }
		</div>
	);
}

// Here define what you want to pass in to Header component from the reducer

// const mapStateToProps = (state) => ({
// 	currentUser: selectCurrentUser(state),
// 	hidden: selectCartHidden(state)
// })

// Using createStructuredSelector. This is equivalant to the code above
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
})

/*
	Connect is a higher order component, i.e. function that gives back modified function
	Below connect 'powers up' Header component with state pulled from the redux state
	So we don't need to pass props from App.js like <Header currentUser={this.state.currentUser} />
*/
export default connect(mapStateToProps)(Header);