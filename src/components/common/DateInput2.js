
import React from 'react';
import {View, TextInput, Text} from 'react-native';

const DateInput2 = ({ visible, value, onChangeDate, placeholder, _handleDatePicked }) => {

	const { labelStyle, containerStyle, valueStyle, defaultValueStyle, dateEntryStyle } = styles;

  if (this.state.date == '') {
    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>Date</Text>
        <TouchableOpacity
          onPress={_showDateTimePicker}
          style={dateEntryStyle}
        >
          <Text style={defaultValueStyle}>date</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={visible}
          onConfirm={_handleDatePicked}
          onCancel={_hideDateTimePicker}
        />
      </View>
    );
  }

	return (
		<View style={containerStyle}>
      <Text style={labelStyle}>Date</Text>
      <TouchableOpacity
        onPress={this._showDateTimePicker}
        style={dateEntryStyle}
      >
        <Text style={valueStyle}>{date.toString()}</Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={visible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
      />
    </View>
	);

};



_showDateTimePicker = () => this.setState({ datePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ datePickerVisible: false });

  _handleDatePicked = (d) => {
    console.log('A date has been picked: ', d);
    dateString = d.toString()
    this.setState({
      date: d
    })
    this._hideDateTimePicker();
  };
  

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
    // backgroundColor: '#2980b9'
  }
};

export {Input};
