import React from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Dimensions, View
} from 'react-native';

import { Feather } from '@expo/vector-icons';


import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from "../styles/fonts";
import { useNavigation } from '@react-navigation/core';




export function Welcome() {
    const navigation = useNavigation();

    function handleStart() {
        navigation.navigate('UserIndentification');

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Manage{'\n'}
                    your plants is {'\n'}
                    Easy Peasy now! {'\n'}
                </Text>

                <Image
                    source={wateringImg}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.subtitle}>
                    Don't forget to water your plants anymore.{'\n'}
                    We take care to remember you {'\n'}whenever you need.
                </Text>
                <TouchableOpacity
                    onPress={handleStart}
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text>
                        <Feather name="chevron-right"
                            style={styles.buttonIcon}
                        />
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,

    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 30

    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,

    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 16,
        height: 56,
        width: 56,

    },
    buttonIcon: {
        fontSize: 34,
        color: colors.white,


    },

    image: {
        height: Dimensions.get('window').width * 0.7
    }

});

