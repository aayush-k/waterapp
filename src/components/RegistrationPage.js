import React, {Component} from 'react';
import {Button, Card, CardSection, Input, Header, Spinner} from './common';
import firebase from 'firebase';
import {
	AlertIOS,
	Picker,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { Router } from '../App';

export default class RegistrationPage extends Component {

	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
		 	confirm_password: '',
			loading: false,
			authLevel: 'user'
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
		loginEmail = this.state.email
		loginPswd = this.state.password
		this.setState({
			email: '',
			password: '',
			loading: false
		 });
		this.props.navigator.push(Router.getRoute('reportsPage', {
			email: loginEmail,
			password: loginPswd
		}));
	}

	render() {
		if (this.state.loading) {
			return (
				<Spinner size={'small'} />
			);
		}

		return(		
			<View>
				<Header
          headerText='Register'
        />
				
				<Card>

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
						<View style={styles.pickerView}>
							<Text style={styles.pickerTitle}>Authorization Level</Text>
							<Picker
								style={styles.picker}
								mode='dropdown'
								selectedValue={this.state.authLevel}
								onValueChange={(level) => this.setState({authLevel: level})}>
								<Picker.Item label="User" value="user" />
								<Picker.Item label="Worker" value="worker" />
								<Picker.Item label="Manager" value="manager" />
								<Picker.Item label="Administrator" value="admin" />
							</Picker>
						</View>
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
			</View>	
		);
	}
}

var styles = StyleSheet.create({
  picker: {
		width: 300,
		alignSelf: 'center'
	},
	pickerView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	pickerTitle: {
		fontSize: 18,
		alignItems: 'center',
		alignSelf: 'center'
	}
});

