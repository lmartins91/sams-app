import React from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import get from 'lodash/get';
import upperCase from 'lodash/upperCase';
import numeral from 'numeral';

import Colors from '../constants/Colors';

const Rating = ({ rating }) => (
    <View style={{ flexDirection: 'row' }}>
        {Array.from(Array(Math.floor(rating))).map((s,i) => (
            <Ionicons color={Colors.teal} name="md-star" size={24} key={i} />
        ))}
        {!!(rating % 1) && (
            <Ionicons color={Colors.teal} name="md-star-half" size={24} key="half" />
        )}
        {Array.from(Array(Math.floor(5 - rating))).map((s,i) => (
            <Ionicons color={Colors.teal} name="md-star-outline" size={24} key={5-i} />
        ))}
    </View>
);

const Price = ({ price = '' }) => (
    <View style={{ flexDirection: 'row' }}>
        {Array.from(Array(price.length)).map((el, i) => (
            <Text style={styles.text} key={i}>$</Text>
        ))}
        {Array.from(Array(4 - price.length)).map((el, i) => (
            <Text style={{ ...styles.text, color: 'lightgrey' }} key={4-i}>$</Text>
        ))}
    </View>
);

const Restaurant = ({ restaurant }) => {
    const { categories, coordinates, displayAddress, imageUrl, name, price, rating, reviewCount, url } = restaurant;
    return <View>
        <View style={styles.row}>
            <Text style={styles.header}>{upperCase(name)}</Text>
            <Ionicons
                name="md-open" size={20} color={Colors.teal}
                onPress={() => Linking.openURL(url)}
            />
        </View>
        <Text style={styles.text}>{displayAddress}</Text>
        <View style={styles.row}>
            <Rating rating={rating} />
            <Text style={styles.text}>{numeral(reviewCount).format('0,0')} Reviews</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <Price price={price}/>
            <Text style={{ ...styles.text, marginHorizontal: 5 }} key="separator">•</Text>
            <Text style={styles.text} key="category">{get(categories[0], 'title')}</Text>
        </View>
        {coordinates && (
            <MapView
                style={styles.map}
                initialRegion={{ ...coordinates, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                showsUserLocation
                showsMyLocationButton
                scrollEnabled={false}
            >
                <MapView.Marker coordinate={coordinates} />
            </MapView>
        )}
        <Image style={styles.img} resizeMode="cover" source={{ uri: imageUrl }} />
    </View>
}

export default Restaurant;

const styles = StyleSheet.create({
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        fontFamily: 'roboto-bold',
        fontSize: 36,
        marginBottom: 5,
    },
    text: {
        fontFamily: 'roboto',
    },
    map: {
        height: 200,
        marginTop: 32,
        borderWidth: 0.25,
        borderColor: 'black',
    },
    img: {
        height: 200,
        marginTop: 32,
        borderWidth: 0.25,
        borderColor: 'black',
    },
});