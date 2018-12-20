import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HeaderTitle from '../components/HeaderTitle';
import TabBarIcon from '../components/TabBarIcon';
import TabBarLabel from '../components/TabBarLabel';
import HomeScreen from '../screens/HomeScreen';
import DateDetailScreen from '../screens/DateDetailScreen';
import DateSearchScreen from '../screens/DateSearchScreen';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerTransparent: true,
            headerTitle: <HeaderTitle title="HOME" />,
        },
    },
});

HomeStack.navigationOptions = {
    tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Home" />,
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
};

const DatesStack = createStackNavigator({
    DateSearch: {
        screen: DateSearchScreen,
        navigationOptions: {
            headerTransparent: true,
            headerTitle: <HeaderTitle title="SEARCH" />,
        },
    },
    DateDetail: {
        screen: DateDetailScreen,
        navigationOptions: {
            header: null,
        },
    },
});

DatesStack.navigationOptions = {
    tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} label="Dates" />,
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calendar" />,
};

export default createBottomTabNavigator({
    HomeStack,
    DatesStack,
});
