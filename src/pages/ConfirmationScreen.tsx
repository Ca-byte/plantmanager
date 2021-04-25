import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'blink' | 'leaf',
    nextScreen: string;
}
const emojis = {
    leaf: '🍁',
    blink: '😉'
}



export function ConfirmationScreen() {
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen,

    } = routes.params as Params;

    function handleStart() {
        navigation.navigate(nextScreen);

    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}

                </Text>
                <Text style={styles.title}>
                   {title}
                </Text>
                <Text style={styles.subtitle}>
                   {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button title={buttonTitle} onPress={handleStart} />

                </View>

            </View>


        </SafeAreaView>





    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,


    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 18,
        paddingVertical: 10,
        color: colors.heading,

    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 30,

    },
    emoji: {
        fontSize: 76,

    },
    footer: {
        width: '100%',
        paddingHorizontal: 40,
        marginTop: 30

    }
})