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
			loading: false
		}; //email, password, and loading states
	}

	/**
	 * This method is triggered when the login button is pressed.
	 * It's task is to sign the user in using an async Firebase request.
	 */
	onButtonPress() {
		const {email, password} = this.state;

		this.setState({ loading: true });

		firebase.auth().signInWithEmailAndPassword(email, password).then(
				this.onLoginSuccess.bind(this))
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
	onLoginSuccess() {
		this.setState({
			email: '',
			password: '',
			loading: false
		 });
		// Actions.reportsPage();
		this.props.navigator.push(Router.getRoute('reportsPage'));
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
				<View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Sign In</Text>
				</View>
				
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

const styles = {
	headerContentStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#2980b9'
	},
	headerTextStyle: {
		color: '#ffffff',
		fontSize: 30
	}
}