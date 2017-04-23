import Expo from 'expo';
import React, {Component} from 'react';
import { StyleSheet, Text, View, AlertIOS } from 'react-native';
import {Button, Card, CardSection, Input, Header, Spinner} from './common';
import firebase from 'firebase';
import { Router } from '../App';


export default class AddReportsPage extends Component {
  constructor() {
		super();
		this.state = {
			title: '',
			longitude: '',
		 	latitude: '',
		 	date: '',
		 	loading: false
		};
	}
  
  render() {
    if (this.state.loading) {
			return (
				<Spinner size={'small'} />
			);
    }
    
    return (
      <View>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Add Report</Text>
        </View>
        
        <Card>

          <CardSection>
            <Input
              placeholder='title'
              label='Title'
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />
          </CardSection>
          

          <CardSection>
            <Input
              placeholder='longitude'
              label='Longitude'
              value={this.state.longitude}
              onChangeText={longitude => this.setState({ longitude })}
            />
          </CardSection>
          

          <CardSection>
            <Input
              placeholder='latitude'
              label='Latitude'
              value={this.state.latitude}
              onChangeText={latitude => this.setState({ latitude })}
            />
          </CardSection>
        
          <CardSection>
            <Input
              placeholder='date'
              label='Date'
              value={this.state.date}
              onChangeText={date => this.setState({ date })}
            />
          </CardSection>


          <CardSection>
            <Button onPress={() => this.props.navigator.pop()}>
              Save
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
    fontSize: 34
  }
}