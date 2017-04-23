import React, {Component} from 'react';
import {Button, Card, CardSection, Header, Spinner} from './common';
import firebase from 'firebase';
import {Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import ReportsDetail from './common/ReportsDetail';
import { Router } from '../App';

export default class ReportsPage extends Component {
    
    state = { reports: [] };

    /**
     * Retrieve data to display source reports
     */
    getDataReports() {
        firebase.database().ref('source_reports/').on('value', (snapshot) => {
            const report = snapshot.val();
            console.log(report);
        });
    }

    componentWillMount() { //This method will automatically be rendered as soon as class is ready
		//debugger; //can be used to help debug

		//this is an async task, and because of that we need to know when we get the data
		//this is called a promise, so we have to define what happens after that info comes with .then.
		
        // getDataReports();
        
        // axios.get('https://rallycoding.herokuapp.com/api/music_albums')
		// .then(response => this.setState({ reports: response.data })); //must update state with setState

        firebase.database().ref('source_reports/').on('value', (snapshot) => {
            const report = snapshot.val();
            console.log(report);
        });
	}
    
    /**
     * Renders reports and returns JSX of it.
     */
    renderReports() {
		return this.state.reports.map(report => 
		<ReportsDetail key={report.title} report={report} />); //creates an array
	}

	render() {
		return(
            <View>
                <View style={styles.headerContentStyle}>
                    <Text style={styles.headerTextStyle}>Reports</Text>
                </View>
                <Card>
                    <CardSection>
                        <Button onPress={() => this.props.navigator.push(Router.getRoute('reportsMapPage'))}>
                            Report Map
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => this.props.navigator.push(Router.getRoute('addReportsPage'))}>
                            Add Report
                        </Button>
                    </CardSection>
                    <ScrollView>
                        {this.renderReports()}
                    </ScrollView>
                    <CardSection>
                        <Button onPress={() => this.props.navigator.pop()}>
                            Log Out
                        </Button>
                        <Button onPress={() => this.props.navigator.push(Router.getRoute('settingsPage'))}>
                            Settings
                        </Button>
                    </CardSection>            
                </Card>
            </View>
		);
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
  }
}

