import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';



// #########################################################################
//                TODO: resolve date state variable update
// #########################################################################

export default class DateInput extends Component {
  constructor() {
		super();
		this.state = {
		 	date: '',
      datePickerVisible: false
		};
	}
  
  _showDateTimePicker = () => this.setState({ datePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ datePickerVisible: false });

  _handleDatePicked = (d) => {
    console.log('A date has been picked: ', d);
    dateString = d.toString()
    // ##### THIS NEEDS TO BE PROPEGATED TO THE PARENT DATE STATE VARIABLE #####
    this.setState({
      date: d
    })
    // #########################################################################
    this.props.onChangeDate(d)
    this._hideDateTimePicker();
  };
  
  render() {
    return (
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
    );
  }

  renderDate() {
    if (this.state.date == '') {
      return (
        <Text style={styles.defaultValueStyle}>date module</Text>  
      )
    }
    return (
      <Text style={styles.valueStyle}>{this.state.date.toString()}</Text>
    );
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
  }
}
