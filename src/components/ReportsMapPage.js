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
import firebase from 'firebase';


//Replace with firebase data
var isEqual = require('lodash.isequal');

export default class ReportsMapPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            loading: true,
            myPosition: null
        };
    }

    getDataReports() {
        firebase.database().ref('source_report').on('value', (snapshot) => {
            snapshot.forEach((child) => {
              this.setState({reports: this.state.reports.concat(child)});
            })
            this.setState({loading: false});
        });

    }
    componentDidMount() {
      this.mounted = true;
      this.watchLocation()
    }

  watchLocation() {
    // eslint-disable-next-line no-undef
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const myLastPosition = this.state.myPosition;
      const myPosition = position.coords;
      if (!isEqual(myPosition, myLastPosition)) {
        this.setState({ myPosition });
      }
    }, null, this.props.geolocationOptions);
  }

   componentWillUnmount() {
    this.mounted = false;
    // eslint-disable-next-line no-undef
    if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
  }
    

    componentWillMount() {
      this.getDataReports();      
    }
  
    addReport() {
    
  }

     

  render() {
    if (this.state.loading || this.state.reports == []) {
			return (
				<Spinner size={'small'} />
			);
		}
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
        {this.state.reports.map(marker => (
          <MapView.Marker
            key={marker.key}  
            coordinate={marker.val().location}
            
          >
            <MapView.Callout style={styles.plainView}>
              <View style={styles.marker} >
                <TouchableOpacity
                  onPress={() => this.props.navigator.push(Router.getRoute('reportInfoPage', {marker: marker.val()}))}>
                  <View  style={styles.btnView}>
                    <Text style={styles.markerText}>{marker.val().title}</Text>
                  </View>
                </TouchableOpacity>
                </View>
              </MapView.Callout>  
          </MapView.Marker>
        ))}
  
        <Card>
          <CardSection>
            <Button onPress={() => this.props.navigator.pop()}
              style={styles.buttonWrapper}>
              Back
            </Button>
            <Button onPress={() => this.addReport()}
              style={styles.buttonWrapper}>
              Add Report
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
    // backgroundColor: '#1463b8'
  },
  markerView: {
    // flex: 1,
    // padding: 5,
  },
  markerText: {
    color: '#1463b8',
    fontSize: 18,
    fontWeight: 'bold',

  },
  btnView: {
    padding: 10
  },
  backView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    margin: 5
  },
  buttonWrapper: {
    width: 80
  },
  backBtn: {
    width: 75
  }
});