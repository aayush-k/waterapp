import React from 'react';
import {View} from 'react-native';


//when an item is wrapped inside of a card component,
//it'll be passed to the card component here as props.children
const Card = (props) => {

	return (
		<View style={styles.containerStyle}>

			{props.children}

		</View>
	);

};

//This is a styles object that we will use to style our specific component
const styles = {
	containerStyle: {
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10
	}
};

export {Card};
