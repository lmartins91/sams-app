import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import get from 'lodash/get';

import Colors from '../constants/Colors';
import DateService from '../services/DateService';
import Restaurant from '../components/Restaurant';
import HeaderTitle from '../components/HeaderTitle';
import Spinner from '../components/Spinner';

export default class DateDetailScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            criteria: null,
            date: {},
            isSearching: true,
        }
        this.dateService = new DateService();
    }
    
    componentDidMount() {
        this.getDate();
    }
    
    async getDate() {
        if (!this.state.isSearching) {
            this.setState({ isSearching: true });
        }
        const criteria = this.props.navigation.getParam('criteria');
        const date = await this.dateService.getDate(criteria);
        this.setState({ criteria, date, isSearching: false });
    }
    
    render() {
        const { activity, restaurant } = this.state.date;
        return <>
            <ScrollView style={styles.container}>
                <LinearGradient
                    colors={[Colors.teal, Colors.turquoise]}
                    style={headerStyles.gradient}
                    start={[0.2,0.2]} end={[0.8,1]}
                >
                    {(this.state.isSearching || !activity)
                        ? <Spinner color={Colors.white} />
                        : <Text style={headerStyles.text}>{get(activity, 'name')}</Text>
                    }
                </LinearGradient>
                <LinearGradient style={headerStyles.fade} colors={['rgba(7, 133, 135, 1)', 'rgba(7, 133, 135, 0)']} />
                <View style={styles.content}>
                    {(this.state.isSearching || !restaurant)
                        ? <Spinner color={Colors.teal} />
                        : <Restaurant restaurant={restaurant} />
                    }
                </View>
            </ScrollView>
            <View style={styles.nav}>
                <Ionicons name="md-arrow-back" size={32} color="white" onPress={() => this.props.navigation.goBack()} />
                <HeaderTitle title="DATE" />
                <Ionicons name="md-refresh" size={32} color="white" onPress={() => this.getDate()} />
            </View>
        </>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.teal,
        paddingTop: 88,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        left: 0, right: 0, top: 50,
        marginHorizontal: 10,
    },
    content: {
        height: '100%',
        minHeight: '100%',
        backgroundColor: Colors.white,
        marginTop: -15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 30,
        marginBottom: 80,
    },
});

const headerStyles = StyleSheet.create({
    gradient: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 200,
    },
    fade: {
        position: 'absolute',
        left: 0, right: 0, top: 0,
        height: 40,
    },
    text: {
        color: Colors.white,
        fontFamily: 'roboto-bold',
        fontSize: 24,
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
});