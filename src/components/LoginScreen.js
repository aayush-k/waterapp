import React, {Component} from 'react';
import {Button, Card, CardSection, Input, Header, Spinner} from './common';
import firebase from 'firebase';
import {AlertIOS, Text, View} from 'react-native';
import { Router } from '../App';

export default class LoginScreen extends Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			loading: false,
			userUID: ''
		}; //email, password, and loading states
	}

	/**
	 * This method is triggered when the login button is pressed.
	 * It's task is to sign the user in using an async Firebase request.
	 */
	onButtonPress() {
		const {email, password} = this.state;

		this.setState({ loading: true });

		firebase.auth().signInWithEmailAndPassword(email, password).then( (user) => {
			this.onLoginSuccess(user).bind(this)
			})
			.catch(
				this.onLoginFail.bind(this));
		}

	/**
	 * This method is called if the firebase authentication fails.
	 * Alerts the user that the login attempt has failed
	 */
	onLoginFail() {
		this.setState({
			loading: false
		 });
		AlertIOS.alert('Incorrect email or password.');
	}

	/**
	 * This method is called if the user is successfully logged in.
	 * It clears the login fields and takes the user to the reports page.
	 */
	onLoginSuccess(user) {
		loginEmail = this.state.email;
		loginPswd = this.state.password;
		userID = this.state.userUID;
		this.setState({
			email: '',
			password: '',
			loading: false,
			userUID: user.uid
		 });
		// Actions.reportsPage();
		this.props.navigator.push(Router.getRoute('reportsPage', {
			email: loginEmail,
			password: loginPswd,
			userUID: userID
		}));
	}
	
	/**
	 * Main render function
	 */
	render() {
		if (this.state.loading) {
			return (
				<Spinner size={'small'} />
			);
		}
		return (
			<View>
				<Header
          headerText='Sign In'
        />
				
				<Card>
					<CardSection>
						<Input
							placeholder='user@email.com'
							label='Email'
							value={this.state.email}
							onChangeText={email => this.setState({ email })}
						/>
					</CardSection>

					<CardSection>
						<Input
							secureTextEntry
							placeholder='password'
							label='Password'
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
						/>
					</CardSection>

					<CardSection>
						<Button onPress={this.onButtonPress.bind(this)}>
							Log in
						</Button>

						<Button onPress={() => this.props.navigator.push(Router.getRoute('registrationPage'))}>
							Register
						</Button>
					</CardSection>
					<CardSection>
						<Button onPress={() => this.props.navigator.push(Router.getRoute('reportsPage'))}>
							Report Page
						</Button>
						<Button onPress={() => this.props.navigator.push(Router.getRoute('reportsMapPage'))}>
							Map Page
						</Button>
						<Button onPress={() => this.props.navigator.push(Router.getRoute('addReportsPage'))}>
							Add Report
						</Button>
					</CardSection>

				</Card>
			</View>
		);
	}
}