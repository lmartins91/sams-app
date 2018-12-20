import React from 'react';
import { ScrollView, Slider, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';

import Colors from '../constants/Colors';
import Button from '../components/Button';

export default class DateSearchScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            criteria: {
                chillRageFactor: 0.5,
                fromFavRestaurants: true,
            }
        }
    }
    
    updateCriteria(field, value) {
        this.setState({
            criteria: { ...this.state.criteria, [field]: value }
        });
    }
    
    render() {
        const { criteria, criteria: { chillRageFactor, fromFavRestaurants }} = this.state;
        return <ScrollView>
            <LinearGradient
                colors={[Colors.teal, Colors.turquoise]}
                style={headerStyles.gradient}
                start={[0.2,0.2]} end={[0.8,1]}
            >
                <View style={styles.container}>
                    <View style={styles.field}>
                        <Text style={styles.title}>RESTAURANT</Text>
                        <View style={styles.btnGroup}>
                            <View style={styles.btn}>
                                <Button
                                    title="Favorites"
                                    onPress={() => this.updateCriteria('fromFavRestaurants', true)}
                                    selected={fromFavRestaurants}
                                />
                            </View>
                            <View style={styles.btn}>
                                <Button
                                    title="Nearby"
                                    onPress={() => this.updateCriteria('fromFavRestaurants', false)}
                                    selected={!fromFavRestaurants}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.title}>MOOD</Text>
                            <Text style={styles.title}>
                                {(() => {
                                    if (chillRageFactor < 1/3) return 'Chill';
                                    if (chillRageFactor < 2/3) return 'ChillRage';
                                    return 'Rage';
                                })()}
                            </Text>
                        </View>
                        <Slider
                            style={{ width: '100%' }}
                            minimumTrackTintColor={Colors.white}
                            maximumTrackTintColor={Colors.white}
                            minimumValue={0} maximumValue={1}
                            onValueChange={(val) => this.updateCriteria('chillRageFactor', val)}
                            value={chillRageFactor}
                        />
                    </View>
                    <View style={styles.searchBtn}>
                        <Button
                            title="Search"
                            selected
                            onPress={() => this.props.navigation.navigate('DateDetail', { criteria })}
                        />
                    </View>
                </View>
            </LinearGradient>
            <LinearGradient style={headerStyles.fade} colors={['rgba(7, 133, 135, 1)', 'rgba(7, 133, 135, 0)']} />
        </ScrollView>
    }
}

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 60,
    },
    field: {
        minWidth: '100%',
        paddingVertical: 10,
        marginBottom: 32,
    },
    title: {
        color: Colors.white,
        fontFamily: 'roboto-light',
        fontSize: 16,
    },
    btnGroup: {
        flexDirection: 'row',
        marginTop: 8,
    },
    btn: {
        marginRight: 24,
    },
    searchBtn: {
        alignSelf: 'center',
        margin: 8,
    },
});