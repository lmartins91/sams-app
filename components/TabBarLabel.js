import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Colors from '../constants/Colors';

const TabBarLabel = ({ focused, label }) => (
    <Text style={{ ...styles.label, color: focused ? Colors.teal : Colors.tabIconDefault }}>{label}</Text>
);

export default TabBarLabel;

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        fontFamily: 'roboto',
    },
});