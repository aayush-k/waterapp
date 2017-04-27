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
			userUID: null,
			loginAttempts: 0,
			loginTitle: 'Sign In'
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
			this.setState({userUID: user.uid});
			this.onLoginSuccess().bind(this);
			})
			.catch(this.onLoginFail.bind(this))
		}

	/**
	 * This method is called if the firebase authentication fails.
	 * Alerts the user that the login attempt has failed
	 */
	onLoginFail() {
		attempts = this.state.loginAttempts + 1;
		this.setState({
			loading: false,
			loginAttempts: attempts
		 });
		if (this.state.loginAttempts == 3) {
			AlertIOS.alert('Too many incorrect attempts.');
			this.setState({
				loginTitle: 'Locked Out'
			})
		} else {
			AlertIOS.alert('Incorrect email or password.');	
		}
	}

	/**
	 * This method is called if the user is successfully logged in.
	 * It clears the login fields and takes the user to the reports page.
	 */
	onLoginSuccess() {

		loginEmail = this.state.email;
		loginPswd = this.state.password;
		this.setState({
			email: '',
			password: '',
			loading: false
		 });
		// Actions.reportsPage();
		this.props.navigator.push(Router.getRoute('reportsPage', {
			email: loginEmail,
			password: loginPswd,
			userUID: this.state.userUID
		}));
	}

	bypassLogin() {
		console.log('bypassing login')
		this.setState({
			email: 'debug@gatech.edu',
			password: 'abc123',
		});
		this.onButtonPress();
	}
	
	loginAttemptCheck() {
		if (this.state.loginAttempts == 3) {
			return (
				<Text style={styles.errorMessage}>Too many login attempts</Text>
			);
		} else {
			return (
				<View>
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
					</View>
			);
		}
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
          headerText={this.state.loginTitle}
        />
				
				<Card>
					{this.loginAttemptCheck()}

					<CardSection>
						<Button onPress={this.onButtonPress.bind(this)}>
							Log in
						</Button>

						<Button onPress={() => this.props.navigator.push(Router.getRoute('registrationPage'))}>
							Register
						</Button>
					</CardSection>
					<CardSection>
						<Button onPress={() => this.bypassLogin()}>
							Bypass Login
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

const styles = {
	errorMessage: {
		fontSize: 18,
		alignSelf: 'center',
		color: '#FF0000',
		padding: 10
	},
}