import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner = ({ color }) => (
    <View style={{ flex: 1, marginTop: 100 }}>
        <ActivityIndicator size="large" color={color} />
    </View>
);

export default Spinner;