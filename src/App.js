import React from 'react';
import './App.css';
import HomePage from '././pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null
		}
	};

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if(userAuth) { // if user is logged in,
				const userRef = await createUserProfileDocument(userAuth); // create user if it doesn't exist in firestore and return userRef

				// store user data in the state of this app
				userRef.onSnapshot(snapShot => {
					this.setState({
						currentUser : {
							id: snapShot.id,
							...snapShot.data()
						}
					}, ()=> console.log(this.state));

					console.log(this.state);
				})
			} else { // if user is not logged in (i.e. userAuth = null)
				this.setState({currentUser: userAuth});
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
					<Route path='/signin' component={SignInAndSignUpPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
