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




export default class ReportsMapPage extends Component {
  constructor() {
    super()
    this.state = {
      markers: [
        {
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324
          },
          title: 'Golden Gate',
          key: 1
        },
        {
          latlng: {
            latitude: 37.774929,
            longitude: -122.419416
          },
          title: 'SOMA Water',
          key: 2
        },
        {
          latlng: {
            latitude: 37.803190,
            longitude: -122.381832
          },
          title: 'Mission District',
          key: 3
        }
      ]
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
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.key}  
            coordinate={marker.latlng}
            
          >
            <MapView.Callout style={styles.plainView}>
              <View style={styles.marker} >
                <TouchableOpacity
                  onPress={() => this.props.navigator.push(Router.getRoute('reportInfoPage', {title: marker.title}))}>
                  <View  style={styles.btnView}>
                    <Text style={styles.markerText}>{marker.title}</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </MapView.Callout>  
          </MapView.Marker>
        ))}
  
        <Card style={styles.banner}>
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
  banner: {
    paddingTop: 200
  },
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