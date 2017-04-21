import React from 'react';
import {View} from 'react-native';

const CardSection = (props) => {
	return (
		<View style={styles.containerStyle}>
			
			{props.children}

		</View>
	);
};


//Flex direction determines the orientation and justify content determines spacing
const styles = {
	containerStyle: {
		borderBottomWidth: 1,
		padding: 5,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		borderColor: '#ddd',
		position: 'relative'
	}
};

export { CardSection};
