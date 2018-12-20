import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import moment from 'moment';

import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
    render() {
        return <ScrollView>
            <LinearGradient
                colors={[Colors.teal, Colors.turquoise]}
                style={headerStyles.gradient}
                start={[0.2,0.2]} end={[0.8,1]}
            >
                <View style={styles.container}>
                    <View style={styles.item}>
                        <Text style={[styles.text, styles.header]}>Merry Christmas, Sam!</Text>
                        <Text style={styles.date}>{moment(new Date('12/25/18')).fromNow()}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.text}>You've been invited to a date with Luis at Uncle Boons 12/27.</Text>
                        <Text style={styles.date}>{moment(new Date('12/24/18')).fromNow()}</Text>
                    </View>
                    <View style={styles.item}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.text}>Check out the new </Text>
                            <Text
                                style={[styles.text, styles.link]}
                                onPress={() => this.props.navigation.navigate('DateSearch')}
                            >
                                Date Picker
                            </Text>
                            <Text style={styles.text}> feature.</Text>
                        </View>
                        <Text style={styles.date}>{moment(new Date('12/23/18')).fromNow()}</Text>
                    </View>
                </View>
            </LinearGradient>
            <LinearGradient style={headerStyles.fade} colors={['rgba(7, 133, 135, 1)', 'rgba(7, 133, 135, 0)']} />
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
    },
    item: {
        marginBottom: 32,
    },
    text: {
        fontFamily: 'roboto-bold',
        fontSize: 16,
        color: Colors.white,
    },
    header: {
        fontSize: 28,
    },
    link: {
        fontFamily: 'roboto-bold',
        color: Colors.yellow,
    },
    date: {
        fontFamily: 'roboto-light',
        color: Colors.white,
        fontSize: 12,
    },
});

const headerStyles = StyleSheet.create({
    gradient: {
        minHeight: '100%',
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