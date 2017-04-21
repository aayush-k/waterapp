import React, {Component} from 'react';
import {View, Text} from 'react-native';
import firebase from 'firebase';
import {Header} from './components/common';

import LoginScreen from './components/LoginScreen';
import RegistrationPage from './components/RegistrationPage';
import ReportsPage from './components/ReportsPage';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';

export const Router = createRouter(() => ({
  loginScreen: () => LoginScreen,
  registrationPage: () => RegistrationPage,
  reportsPage: () => ReportsPage
}));

/**
 * This is the main/driver app.
 */
class App extends Component {

	render() {
		return (
			<NavigationProvider router={Router}>
				<StackNavigation initialRoute={Router.getRoute('loginScreen')} />			
			</NavigationProvider>
		)
	}

	state = { loggedIn: false}; //state will be used in the future to determine if user is logged in
	
	/**
	 * Before the component mounts, we initialize firebase.
	 */
	componentWillMount() {
		firebase.initializeApp({
			apiKey: "AIzaSyCdwVFqfzXFOun3N9lxrut0XnWbNI3wkok",
			authDomain: "cs2340-spring-2017-team-4.firebaseapp.com",
			databaseURL: "https://cs2340-spring-2017-team-4.firebaseio.com",
			projectId: "cs2340-spring-2017-team-4",
			storageBucket: "cs2340-spring-2017-team-4.appspot.com",
			messagingSenderId: "547594433734"
		})

		//the following code lets the app directly take the user to the loginPage if he/she is already
		// logged in.
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
		
		// firebase.database().ref('source_report').on('value', snap => this.setState({ reports: snap }));
	}
	

	// getDataReports() {
    //     firebase.database.ref('source_report').on('value', snap => this.setState({ reports: snap }));
    // }
	
	/**
	 * The router determines which page to be rendered.
	 * loginScreen is rendered first because of the initial tag.
	 * To add more screens, simply add it as a scene to this router.
	 */
	// render () {
	// 	return (
	// 		<Router>
	// 			<Scene key="root">
	// 				<Scene
	// 					key="loginScreen"
	// 					component={LoginScreen}
	// 					initial
	// 					hideNavBar
	// 				/>
	// 				<Scene
	// 					key="registrationPage"
	// 					component={RegistrationPage}
	// 					title="Registration Page"
	// 				/>
	// 				<Scene
	// 					key="reportsPage"
	// 					component={ReportsPage}
	// 					title="Reports Page"
	// 					initial
	// 					hideNavBar				
	// 				/>

	// 				<Scene
	// 					key="reportsPage"
	// 					component={ReportsPage}
	// 					title="Reports Page"				
	// 				/>

	// 			</Scene>
	// 		</Router>
	// 	);
	// }
}

export default App;
