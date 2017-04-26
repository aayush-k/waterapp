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
import { Button, Header, Spinner, Card, CardSection } from './common';
// import InfoBlock from './common/InfoBlock'



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
      <View style={styles.containerStyle}>
        
        

        <MapView
          style={styles.singleReportMap}
          initialRegion={{
            latitude: entry.latlng.latitude,
            longitude: entry.latlng.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          }}
        >
          <Header
            headerText={entry.title}
          />
          <MapView.Marker
            key={entry.key}  
            coordinate={entry.latlng} 
          />
          
        </ MapView>  

        <View style={styles.infoStyle}>
          
          <Text style={styles.infoTextStyle}>Latitude: {entry.latlng.latitude}</Text>
          <Text style={styles.infoTextStyle}>Longitude: {entry.latlng.longitude}</Text>
          <Text style={styles.infoTextStyle}>Date: {entry.date}</Text>
          <Text style={styles.infoTextStyle}>Water Type: {entry.latlng.latitude}</Text>
          <Text style={styles.infoTextStyle}>Water Condition: {entry.latlng.longitude}</Text>
        </View>
        
        <Card>
          <CardSection>
            <Button onPress={() => this.props.navigator.pop()}>
              Back
            </Button>
          </CardSection>
        </Card>

      </View>
    );
  }
}


const styles = {
  infoStyle: {
    padding: 5
  },
  infoTextStyle: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10
  },
  singleReportMap: {
    flex: 1,
  },
  containerStyle: {
    flex: 1
  }
}