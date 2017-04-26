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
  constructor() {
    super()
    this.state = {
      entry: undefined
    }
  }
  
  ComponentWillMount() {
    marker = this.props.params.marker
    this.setState({
      entry: { marker }
    });
  }
  
  render() {
    entry = this.props.route.params.marker
    return (
      <View>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>
            {entry.title}
          </Text>
        </View>

        <Card>
					<CardSection>
            <View>
              <Text>Latitude: {entry.latlng.latitude}</Text>
              <Text>Longitude: {entry.latlng.longitude}</Text>
            </View>
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