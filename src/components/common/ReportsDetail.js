import React from 'react';
import {Text, View, Image, Linking} from 'react-native';
import { Card, CardSection, Button } from './';

const ReportsDetail = ({report}) => { //here we are receiving our props object from the call
	//In this case we are sending in the text component as a prop to the card component
	//make sure to do source = {{ uri: link }} for image tag

	//here we destructured the report contents
	const {
		title,
		artist,
		thumbnail_image,
		image,
		url
	} = report;
	const {
		headerContentStyle, 
		thumbnailStyle,
		thumbnailContainerStyle,
		headerTextStyle,
		imageStyle
	} = styles;

	//VERY IMPORTANT TO SPECIFY OCCUPYING SIZE FOR IMAGE TAG
	return (
		<Card>

			<CardSection>
				<View style={thumbnailContainerStyle}>
					<Image
						style={thumbnailStyle}
						source={{ uri: thumbnail_image }}/>
				</View>

				<View style={headerContentStyle}>
					<Text style={headerTextStyle}>{title}</Text>
					<Text>{artist}</Text>
				</View>
			</CardSection>

			<CardSection>
				<Image
				style={imageStyle}
				source={{ uri: image }}/>
			</CardSection>

			<CardSection>
				<Button onPress={() => Linking.openURL(url)}>
					Buy Now
				</Button>
			</CardSection>

		</Card>
	);
};


//flex: 1 and width: null allows the image to take up the full space of the container
const styles = {
	headerContentStyle: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	headerTextStyle: {
		fontSize: 18
	},
	thumbnailStyle: {
		height: 50,
		width: 50
	},
	thumbnailContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginRight: 10
	},
	imageStyle: {
		height: 300,
		flex: 1,
		width: null
	}
};

export default ReportsDetail;
