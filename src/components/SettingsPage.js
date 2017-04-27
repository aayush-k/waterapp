import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text, 
  View,
  Picker
} from 'react-native';
import {Button, Header, Input, Card, CardSection, InfoBlock} from './common';
import firebase from 'firebase';

export default class SettingsPage extends React.Component {
  // change auth level
  constructor() {
    super()
    this.state = {
			email: '',
			password: '',
		 	confirm_password: '',
			loading: false,
			authLevel: 'user'
		};
	}
	
	componentWillMount() {
        loginEmail = this.props.route.params.email
        loginPswd = this.props.route.params.password

        this.setState({
            email: loginEmail,
            password: loginPswd
        });   
    }

	updateChanges() {
		let userProfilePath = "profile/" + userId + "/details";

        return firebase.database().ref(userProfilePath).set({
            mobile: mobile
        })
	}

  render() {
    return (
      <View>
				<Header
          headerText='Settings'
        />

        <Card>

					<CardSection>
						<View style={styles.containerStyle} >
							<Text style={styles.labelStyle}>
								Email
							</Text>
							<Text style={styles.defaultValueStyle}>
								{this.state.email}
							</Text>
						</View>	
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
            <Button onPress={() => this.props.navigator.pop()}>
              Back
            </Button>
            <Button onPress={() => this.props.navigator.pop()}>
              Save
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
	},
	inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 18,
		lineHeight: 23,
		flex: 2
	},
	labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1
	},
	containerStyle: {
		height: 40,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	defaultValueStyle: {
    color: '#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 21,
		lineHeight: 23,
  },
});