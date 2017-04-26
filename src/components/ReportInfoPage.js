import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  MapView
} from 'expo';
import {Button, Card, CardSection, Input, Header, Spinner} from './common';



export default class ReportInfoPage extends Component {
  render() {
    return (
      <View style={styles.headerContentStyle}>
        <Text style={styles.headerTextStyle}>
          {this.props.route.params.title}
          </Text>
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