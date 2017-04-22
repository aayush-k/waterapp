import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Components } from 'expo';
import {Button, Card, CardSection, Input, Header, Spinner} from './common';



export default class ReportsMapPage extends React.Component {
  render() {
    return (
      <Components.MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}