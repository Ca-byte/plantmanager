import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';


export function Welcome(){

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Manage{'\n'}
                your plants {'\n'}
                the easy way {'\n'}
            </Text>

            <Image 
            source={wateringImg} 
            style={styles.image} 
            />

            <Text style={styles.subtitle}>
                 Don't forget to water your plants anymore.{'\n'}
                 We take care to remember you whenever{'\n'} you need.
            </Text>
            <TouchableOpacity style={styles.button} 
                activeOpacity={0.7}>
                <Text style={styles.buttonText}>
                    &gt;
                    </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
      
    },
    subtitle: {
        textAlign:'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,

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
    buttonText: {

        color: colors.white,
        fontSize: 24,
    },

    image: {
        width: 292,
        height: 284,
    }

});

