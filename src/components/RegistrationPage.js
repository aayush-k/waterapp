import React, {Component} from 'react';
import {Button, Card, CardSection, Input, Header, Spinner} from './common';
import firebase from 'firebase';
import {AlertIOS} from 'react-native';
import { Router } from '../App';

class RegistrationPage extends Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		 	username: '',
		 	confirm_password: '',
		 	loading: false
		};
	}

	onButtonPress() {
		const {email, password, username, confirm_password} = this.state;

		this.setState({ loading: true });

		firebase.auth().createUserWithEmailAndPassword(email, password).then(
				this.onUserCreateSuccess.bind(this))
			.catch(
				this.onUserCreateFail.bind(this));
	}

	onUserCreateFail() {
		this.setState({
			loading: false
		 });
		AlertIOS.alert('Bad email or Password is not long enough.');
	}

	onUserCreateSuccess() {
		this.setState({
			email: '',
			password: '',
			loading: false
		 });
		this.props.navigator.push(Router.getRoute('reportsPage'));
	}

	render() {
		if (this.state.loading) {
			return (
				<Spinner size={'small'} />
			);
		}

		return(		
			<Card>

				<CardSection>
					<Input
						placeholder='username'
						label='Username'
						value={this.state.username}
						onChangeText={username => this.setState({ username })}
					/>
				</CardSection>

				<CardSection>
					<Input
						placeholder='user@gmail.com'
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
					<Input
						secureTextEntry
						placeholder='confirm password'
						label='Confirm'
						value={this.state.confirm_password}
						onChangeText={confirm_password => this.setState({ confirm_password })}
					/>
				</CardSection>

				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Register
					</Button>
					<Button onPress={() => this.props.navigator.pop()}>
						Cancel
					</Button>
				</CardSection>

			</Card>
		);
	}
}

export default RegistrationPage;
