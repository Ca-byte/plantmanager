import React from 'react';
import { useNavigation } from '@react-navigation/core';
import {
    View, 
    Text, 
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';

import color from "../styles/colors";
import fonts from '../styles/fonts';



export function ConfirmationScreen() {
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('PlantSelect');

    }

  
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😉

                </Text>
                <Text style={styles.title}>
                    That's it!
                </Text>
                <Text style={styles.subtitle}>
                Now we are going to start taking care {'\n'} of your plants, give them some love.
                
                </Text>

                <View style={styles.footer}>
                <Button title="Start" onPress={handleStart} />

            </View>

            </View>
           

        </SafeAreaView>
       


     

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title:{
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,


    },
    subtitle:{
        fontFamily: fonts.text,
        alignItems: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: color.heading,

    },
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        padding: 30,

    },
    emoji:{
        fontSize: 76,
    
    },
    footer:{
        width:'100%',
        paddingHorizontal: 40,
        marginTop: 30

    }
})