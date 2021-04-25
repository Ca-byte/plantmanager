import React, { useState } from 'react';
import {
    View,
    Text, 
    StyleSheet,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/core';

import AsyncStorage from '@react-native-async-storage/async-storage';


export function UserIndentification(){
    const navigation = useNavigation();
    const [isFocused, setIsFocused] =useState(false);
    const [isFilled, setIsFilled] =useState(false);

    const [name, setName] = useState<string>();

    function handleIputBlur(){
        setIsFocused(true);
        setIsFilled(!!name);
    }

    
    function handleIputFocus(){
        setIsFilled(true);
    }
    
    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit(){
        if(!name)
            return Alert.alert('Lets be friends... tell me your name 😊');

        try{
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('ConfirmationScreen',{
                title: ' Here you go!',
                subtitle: " We are going to start taking care of your plants let's give them some love now!",
                buttonTitle:'Start',
                icon: 'blink',
                nextScreen: 'PlantSelect',
            });

        }catch{
            Alert.alert('Sorry, I could not get your name 😢');

        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height' }
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            
                            <View style={styles.header}>
                                <Text style={styles.emoji}> 
                            {  isFilled ? '😆' : '😃' }
                                </Text>
                                <Text style={styles.title}>
                                    How we can{'\n'}
                                    call you?
                                </Text>
                            </View>
                            <TextInput
                            style={[
                                styles.input,
                                (isFocused || isFilled ) && {borderColor: colors.green}
                            ]}
                            placeholder='Enter your name'
                            onBlur={handleIputBlur}
                            onFocus={handleIputFocus}
                            onChangeText={handleInputChange}
                        

                            />
                            <View style={styles.footer}>
                             <Button 
                              title="Submit" 
                              onPress={handleSubmit} />

                            </View>
                        
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        width: '100%',
       

    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    

    },
    header:{
        alignItems: 'center',

    },

    emoji: {
       fontSize: 44,
       
    },
    title:{
        fontSize: 24,
        lineHeight: 32,
        textAlign:'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop:20,
      

    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    footer:{
        marginTop: 40,
        width:'100%',

     }



});