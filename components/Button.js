import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

const Button = ({ onPress, selected, title }) => (
    <TouchableOpacity
        style={[styles.button, selected && styles.selected]}
        onPress={onPress}
    >
        <Text style={[styles.text, selected && styles.selectedText]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        minWidth: 80,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.white,
    },
    text: {
        color: Colors.white,
        fontFamily: 'roboto',
    },
    selected: {
        backgroundColor: Colors.white,
    },
    selectedText: {
        color: 'black',
    },
});

export default Button;