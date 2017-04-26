import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Header, Spinner, Card, CardSection} from './common';


export default class SettingsPage extends React.Component {
  render() {
    return (
      <View>
				<Header
          headerText='Settings'
        />
				
      </View>
    );
  }
}