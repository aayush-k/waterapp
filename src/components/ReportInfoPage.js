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
import { Button, Header, Spinner, Card, CardSection, InfoBlock } from './common';
// import InfoBlock from './common/InfoBlock'



export default class ReportInfoPage extends Component {
  constructor() {
    super()
    this.state = {
      entry: undefined
    }
  }
  

  componentWillMount() {
    marker = this.props.route.params.marker
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
            latitude: entry.location.latitude,
            longitude: entry.location.longitude,
            latitudeDelta: 0.0421,
            longitudeDelta: 0.0421,
          }}
        >
          <Header
            headerText={entry.title}
          />
          <MapView.Marker
            key={entry.key}  
            coordinate={entry.location} 
          />
          
        </ MapView>  

        <View style={styles.infoStyle}>
          
          <InfoBlock
            label={'Latitude'}
            value={entry.location.latitude}
          />
          <InfoBlock
            label={'Longitude'}
            value={entry.location.longitude}
          />
          <InfoBlock
            label={'Date'}
            value={entry.datetime.day}
          />
          <InfoBlock
            label={'Water Condition'}
            value={entry.waterCondition}
          />
          <InfoBlock
            label={'Virus PPM'}
            value={entry.virusPPM}
          />
          <InfoBlock
            label={'Contaminant PPM'}
            value={entry.contaminantPPM}
          />
          
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