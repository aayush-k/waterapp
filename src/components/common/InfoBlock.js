import React from 'react';
import {View, Text} from 'react-native';


//when an item is wrapped inside of a card component,
//it'll be passed to the card component here as props.children
const InfoBlock = ({ label, value }) => {
  
	return (
		<View style={styles.containerStyle}>

      <Text style={styles.labelStyle}>
				{label}
      </Text>
      
      <Text style={styles.valueStyle}>
				{value}
			</Text>

		</View>
	);

};

//This is a styles object that we will use to style our specific component
const styles = {
	containerStyle: {
    flexDirection: 'row',
    padding: 5
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
		paddingLeft: 20,
    flex: 1,
    color: '#1463b8'
  },
  valueStyle: {
    fontSize: 18,
		paddingLeft: 20,
    flex: 1,
    // color: '#1463b8'
  }
};

export {InfoBlock};
