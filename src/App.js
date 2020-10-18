import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from '././pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckOutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
	// constructor() {
	// 	super();

	// 	this.state = {
	// 		currentUser: null
	// 	}
	// };

	unsubscribeFromAuth = null;

	componentDidMount() {
		const {setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if(userAuth) { // if user is logged in,
				const userRef = await createUserProfileDocument(userAuth); // create user if it doesn't exist in firestore and return userRef

				// whenever our user snapshot updates, we are setting our user reducer value with our new auth object
				userRef.onSnapshot(snapShot => {
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data()
					});

					console.log(this.state);
				})
			} else { // if user is not logged in (i.e. userAuth = null)
				setCurrentUser(userAuth);
				//  addCollectionAndDocuments('collections', collectionsArray.map( ({title, items}) => ({title, items})));
			}
		})
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth(); // close the subscription
	}

	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route exact path='/checkout' component={CheckOutPage} />
					<Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
				</Switch>
			</div>
		);
	}
}

// get state
const mapStateToProps = createStructuredSelector ({
	currentUser: selectCurrentUser,
	// collectionsArray: selectCollectionForPreview
});

// update state (reducer)
const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
