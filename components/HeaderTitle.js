import React from 'react';
import { StyleSheet, Text } from 'react-native';

const HeaderTitle = ({ title }) => (
    <Text style={styles.text}>
        {title}
    </Text>
);

export default HeaderTitle;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto-light',
        color: 'rgba(255,255,255,0.8)',
        fontSize: 20,
        letterSpacing: 4,
    },
});