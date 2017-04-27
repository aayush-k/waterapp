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

    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            loading: true
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
    

    componentWillMount() {
      // console.log("ENTERED GET DATA REPORTS\n\n\n\n\n\n\n");
      this.getDataReports();
      // console.log(this.state.reports);
    //   console.log(dataReports);

    //   this.setState( {
    //     reports: dataReports 
    //   });

    //  this.setState({loading: false});
      
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
  
        <View style={styles.backView}>
          <View style={styles.buttonWrapper}>
            <Card>
              <CardSection>
                <Button onPress={() => this.props.navigator.pop()}>
                  Back
                </Button>
              </CardSection>
            </Card>
          </View>
        </View>
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
  }
});