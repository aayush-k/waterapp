import React, {
	Component, 
	View,
	Stylesheet
} from 'react';
import {Button, Card, CardSection, Input, Header, Spinner} from './common';
import firebase from 'firebase';
import {AlertIOS} from 'react-native';
import { Router } from '../App';

class LoginScreen extends Component {

	state = { email: '', password: '', loading: false }; //email, password, and loading states

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
	 * This button determines if the button space should be a loading spinner or button.
	 */
	renderButton() {
		if (this.state.loading) {
			return (
				<Spinner size={'small'} />
			);
		}
		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log in
			</Button>
		);
	}
	
	/**
	 * Main render function
	 */
	render() {
		return(
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
					{this.renderButton()}
				</CardSection>

				<CardSection>
					<Button onPress={() => this.props.navigator.push(Router.getRoute('registrationPage'))}>
						Register
					</Button>
				</CardSection>

			</Card>
		);
	}
}



export default LoginScreen;
