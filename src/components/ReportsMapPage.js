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
import { Button, Card, CardSection, Input, Header, Spinner } from './common';
import { Router } from '../App';

const dummyMarker = [
  {
    latlng: {
      latitude: 37.78825,
      longitude: -122.4324
    },
    title: 'Golden Gate',
    date: 'Wed Apr 26 2017 11:25:20 GMT-0400 (EDT)',
    key: 1
  },
  {
    latlng: {
      latitude: 37.774929,
      longitude: -122.419416
    },
    title: 'SOMA Water',
    date: 'Wed Apr 26 2017 11:25:20 GMT-0400 (EDT)',
    key: 2
  },
  {
    latlng: {
      latitude: 37.803190,
      longitude: -122.381832
    },
    title: 'Mission District',
    date: 'Wed Apr 26 2017 11:25:20 GMT-0400 (EDT)',
    key: 3
  }
];


export default class ReportsMapPage extends Component {
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
        {dummyMarker.map(marker => (
          <MapView.Marker
            key={marker.key}  
            coordinate={marker.latlng}
            
          >
            <MapView.Callout style={styles.plainView}>
              <View style={styles.marker} >
                <TouchableOpacity
                  onPress={() => this.props.navigator.push(Router.getRoute('reportInfoPage', {marker: marker}))}>
                  <View  style={styles.btnView}>
                    <Text style={styles.markerText}>{marker.title}</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </MapView.Callout>  
          </MapView.Marker>
        ))}
  
        <Card>
          <CardSection>
            <Button onPress={() => this.props.navigator.pop()}>
              Back
            </Button>
          </CardSection>
        </Card>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  // banner: {
  //   paddingTop: 200
  // },
  marker: {
    // padding: 0,
    // backgroundColor: '#2980b9'
  },
  markerView: {
    // flex: 1,
    // padding: 5,
  },
  markerText: {
    color: '#2980b9',
    fontSize: 18,
    fontWeight: 'bold',

  },
  btnView: {
    padding: 10
  }
});