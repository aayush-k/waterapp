import React from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {
  MapView
} from 'expo';
import {Button, Card, CardSection, Input, Header, Spinner} from './common';



export default class ReportsMapPage extends React.Component {
  constructor() {
    super()
    this.state = {
      coordinate1: {
        latitude: 37.78825,
        longitude: -122.4324
      },
      coordinate2: {
        latitude: 37.774929,
        longitude: -122.419416
      },
      coordinate3: {
        latitude: 37.803190,
        longitude: -122.381832
      }
    }
  }
  render() {
    return (
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker 
        coordinate={this.state.coordinate1} 
        onPress={() => this.props.navigator.pop()}
        />
        <MapView.Marker 
        coordinate={this.state.coordinate2} 
        onPress={() => this.props.navigator.pop()}
        />
        <MapView.Marker 
        coordinate={this.state.coordinate3} 
        onPress={() => this.props.navigator.pop()}
        />
      </MapView>
    );
  }
}