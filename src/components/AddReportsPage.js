import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  AlertIOS,
  TouchableOpacity,
  Picker,
  ScrollView
} from 'react-native';
import { Button, Card, CardSection, Input, Header, Spinner, InputConstricted } from './common';
import DateInput from './common/DateInput'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Router } from '../App';
import firebase from 'firebase';


export default class AddReportsPage extends Component {
  constructor() {
		super();
		this.state = {
			title: '',
			longitude: '',
		 	latitude: '',
      date: '',
      waterCondition: 'WASTE', 
      waterType: 'BOTTLED',
      loading: false,
      datePickerVisible: false
		};
	}

  // static setUserMobile(userId, mobile) {

  //     let userMobilePath = "/user/" + userId + "/details";

  //     return firebase.database().ref(userMobilePath).set({
  //         mobile: mobile
  //     })

  // }

  
  render() {
    if (this.state.loading) {
			return (
				<Spinner size={'small'} />
			);
    }
    
    return (
      <View>
        <Header
          headerText='Add Report'
        />
        
        <Card>
          <ScrollView style={styles.pagescroll}>

            <CardSection>
              <Input
                placeholder='title'
                label='Title'
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
              />
            </CardSection>
            
            <CardSection>
              <InputConstricted
                placeholder='latitude'
                label='Latitude'
                value={this.state.latitude}
                onChangeText={latitude => this.setState({ latitude })}
                keyboardType='number-pad'
              />
            </CardSection>

            <CardSection>
              <InputConstricted
                placeholder='longitude'
                label='Longitude'
                value={this.state.longitude}
                onChangeText={longitude => this.setState({ longitude })}
                keyboardType='number-pad'
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
              <View style={styles.pickerView}>
                <Text style={styles.pickerTitle}>Water Condition</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.waterCondition}
                  onValueChange={(wc) => this.setState({waterCondition: wc})}>
                  <Picker.Item label="Waste" value="WASTE" />
                  <Picker.Item label="Treatable-Clear" value="TREATABLE_CLEAR" />
                  <Picker.Item label="Treatable-Muddy" value="TREATABLE_MUDDY" />
                  <Picker.Item label="Potable" value="POTABLE" />
                </Picker>
              </View>
            </CardSection>

            <CardSection>
              <View style={styles.pickerView}>
                <Text style={styles.pickerTitle}>Water Type</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.waterType}
                  onValueChange={(wt) => this.setState({waterType: wt})}>
                  <Picker.Item label="Bottled" value="BOTTLED" />
                  <Picker.Item label="Well" value="WELL" />
                  <Picker.Item label="Stream" value="STREAM" />
                  <Picker.Item label="Lake" value="LAKE" />
                  <Picker.Item label="Spring" value="SPRING" />
                  <Picker.Item label="Other" value="OTHER" />
                </Picker>
              </View>
            </CardSection>
          </ScrollView>

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
    this.setState({ date: d })
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
    // backgroundColor: '#1463b8'
  },
  picker: {
		width: 300,
		alignSelf: 'center'
	},
	pickerView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	pickerTitle: {
		fontSize: 20,
		alignItems: 'center',
		alignSelf: 'center'
  },
  pagescroll: {
    height: 500
  }
}