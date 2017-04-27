import React, {Component} from 'react';
import {Button, Card, CardSection, Header, Spinner, InfoBlock} from './common';
import firebase from 'firebase';
import {Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import ReportsDetail from './common/ReportsDetail';
import { Router } from '../App';

export default class ReportsPage extends Component {
    
    constructor() {
		super();
		this.state = {
			email: '',
            password: '',
            reports: [],
			loading: true
		}; //email, password, and loading states
	}

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

        firebase.database().ref('source_report').on('value', (snapshot) => {
            snapshot.forEach((child) => {
              this.setState({reports: this.state.reports.concat(child)});
            })
            this.setState({loading: false});

        });

        loginEmail = this.props.route.params.email
        loginPswd = this.props.route.params.password

        this.setState({
            email: loginEmail,
            password: loginPswd
        });   
    }
    
    /**
     * Renders reports and returns JSX of it.
     */
    renderReports() {
        return (<Text>render reports function</Text>);
	}

	render() {
        if (this.state.loading) {
            return (
                <Spinner size={'large'} />
            );
        }
		return(
            <View>
                <Header
                    headerText='Reports'
                />
                    
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
                    <ScrollView style={styles.reportsList}>
                        {this.state.reports.map(marker => (
                            <CardSection
                                key={marker.key}
                            >
                                <Text style={styles.listText}>{marker.val().title}</Text>
                        </CardSection>        
                    ))}      
                    </ScrollView>
                    <CardSection>
                        <Button onPress={() => this.props.navigator.pop()}>
                            Log Out
                        </Button>
                        <Button onPress={() => this.props.navigator.push(Router.getRoute('settingsPage', {
                            email: this.state.email,
                			password: this.state.password
                        }))}>
                            Settings
                        </Button>
                    </CardSection>            
                </Card>
            </View>
		);
	}
}

const styles = {
  reportsList: {
      height: 430,
    },
  listText: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
  }  
}

