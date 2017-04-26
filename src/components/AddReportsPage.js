import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableOpacity
} from 'react-native';
import { Button, Card, CardSection, Input, Header, Spinner } from './common';
import DateInput from './common/DateInput'
import firebase from 'firebase';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Router } from '../App';


export default class AddReportsPage extends Component {
  constructor() {
		super();
		this.state = {
			title: '',
			longitude: '',
		 	latitude: '',
		 	date: '',
      loading: false,
      datePickerVisible: false
		};
	}

  
  render() {
    if (this.state.loading) {
			return (
				<Spinner size={'small'} />
			);
    }
    
    return (
      <View>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Add Report</Text>
        </View>
        
        <Card>

          <CardSection>
            <Input
              placeholder='title'
              label='Title'
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />
          </CardSection>
          

          <CardSection>
            <Input
              placeholder='longitude'
              label='Longitude'
              value={this.state.longitude}
              onChangeText={longitude => this.setState({ longitude })}
            />
          </CardSection>
          
          <CardSection>
            <Input
              placeholder='latitude'
              label='Latitude'
              value={this.state.latitude}
              onChangeText={latitude => this.setState({ latitude })}
            />
          </CardSection>
        
          <CardSection>
            <View style={styles.containerStyle}>
              <Text style={styles.labelStyle}>Date</Text>
              <TouchableOpacity
                onPress={this._showDateTimePicker}
                style={styles.dateEntryStyle}
              >
                {this.renderDate()}
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.datePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            </View>
          </CardSection>

          <CardSection>
            <DateInput
            />
          </CardSection>

          <CardSection>
            <Button onPress={() => this.props.navigator.pop()}>
              Save
            </Button>
            <Button onPress={() => this.props.navigator.pop()}>
              Cancel
            </Button>
          </CardSection>

        </Card>
      </View>
    );
  }

  _showDateTimePicker = () => this.setState({ datePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ datePickerVisible: false });

  _handleDatePicked = (d) => {
    this.setState({ date: d.toString() })
    this._hideDateTimePicker();
  };
  
  renderDate() {
    if (this.state.date == '') {
      return (<Text style={styles.defaultValueStyle}>date</Text>);
    }
    return (<Text style={styles.valueStyle}>{this.state.date.toString()}</Text>);
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
    fontSize: 34
  },
  labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		// flex: 2
    paddingRight: 75
  },
  containerStyle: {
		height: 40,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
  },
  valueStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 18,
		lineHeight: 23,
    // flex: 2,
    // alignSelf: 'center'
  },
  defaultValueStyle: {
    color: '#b3b3b3',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 21,
		lineHeight: 23,
  },
  dateEntryStyle: {
    flex: 1,
    justifyContent: 'center'
    // backgroundColor: '#2980b9'
  }
}