import React from 'react';
// to pull off values from the redux store
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ( { currentUser, hidden } ) => {
	return(
		<HeaderContainer>
			<LogoContainer to='/'>
				<Logo className='logo' />
			</LogoContainer>
			<OptionsContainer>
				<OptionLink to='/shop'>
					SHOP
				</OptionLink>
				<OptionLink to='/contact'>
					CONTACT
				</OptionLink>

				{
					currentUser ?
					<OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
					:
					<OptionLink to='/signin'>SIGN IN</OptionLink>
				}

			<CartIcon />
			</OptionsContainer>
			{ hidden ? null : <CartDropdown /> }
		</HeaderContainer>
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