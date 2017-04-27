import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import firebase from 'firebase';
import {Header} from './components/common';

import LoginScreen from './components/LoginScreen';
import RegistrationPage from './components/RegistrationPage';
import ReportsPage from './components/ReportsPage';
import ReportsMapPage from './components/ReportsMapPage';
import AddReportsPage from './components/AddReportsPage';
import SettingsPage from './components/SettingsPage';
import ReportInfoPage from './components/ReportInfoPage';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';

export const Router = createRouter(() => ({
  loginScreen: () => LoginScreen,
  registrationPage: () => RegistrationPage,
  reportsPage: () => ReportsPage,
	reportsMapPage: () => ReportsMapPage,
	reportInfoPage: () => ReportInfoPage,
  addReportsPage: () => AddReportsPage,
  settingsPage: () => SettingsPage
}));

/**
 * This is the main/driver app.
 */
class App extends Component {

	//state will be used in the future to determine if user is logged in	
	constructor(props) {
		super(props);
		firebase.initializeApp({
			apiKey: "AIzaSyCdwVFqfzXFOun3N9lxrut0XnWbNI3wkok",
			authDomain: "cs2340-spring-2017-team-4.firebaseapp.com",
			databaseURL: "https://cs2340-spring-2017-team-4.firebaseio.com",
			projectId: "cs2340-spring-2017-team-4",
			storageBucket: "cs2340-spring-2017-team-4.appspot.com",
			messagingSenderId: "547594433734"
		});
		this.state = {
				dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
				}),
				loggedIn: false
		};
	}

	render() {
		return (
			<NavigationProvider router={Router}>
				<StackNavigation initialRoute={Router.getRoute('loginScreen')} />			
			</NavigationProvider>
		)
	}

	
	/**
	 * Before the component mounts, we initialize firebase.
	 */
	componentWillMount() {
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

}

export default App;
