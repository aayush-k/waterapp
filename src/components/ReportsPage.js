import React, {Component} from 'react';
import {Button, Card, CardSection, Header, Spinner, InfoBlock} from './common';
import firebase from 'firebase';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
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
                            <TouchableOpacity
                                key={marker.key}
                                onPress={() => this.props.navigator.push(Router.getRoute('reportInfoPage', { marker: marker.val() }))}
                            >
                                <CardSection>
                                    <View style={styles.listItem}>
                                        <Text style={styles.listMainText}>{marker.val().title}</Text>
                                        <Text style={styles.listSubText}> See More </Text>
                                    </View>
                                </CardSection>
                            </TouchableOpacity>    
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
  listMainText: {
    color: '#1463b8',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    lineHeight: 23,
  },
  listSubText: {
      color: '#a7a7a7',
      fontSize: 18,
      padding: 5,
      lineHeight: 23
  },
  listItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
  }
}

