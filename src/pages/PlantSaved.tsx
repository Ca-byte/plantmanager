import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Platform,
    TouchableOpacity,
    Image
} from 'react-native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { useNavigation, useRoute } from '@react-navigation/core';


import fonts from '../styles/fonts';
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';

import { SvgFromUri } from 'react-native-svg';

import { Button } from '../components/Button';
import { getBottomSpace } from 'react-native-iphone-x-helper';


import { format, isBefore } from 'date-fns';
import { PlantsProps, savePlants } from '../libs/storage';


interface Params {
    plant: PlantsProps;
}



export function PlantSaved(){
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const route = useRoute();
    const { plant } = route.params as Params;

    const navigation = useNavigation();



    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker((oldState) => !oldState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('"Oh noes!" This hour alreary gone!⌛');
        }

        if (dateTime)
            setSelectedDateTime(dateTime);


    }
    function handleopenDatetimePickerForAndroid() {
        setShowDatePicker((oldState) => !oldState);
    }

    async function handleSave() {
        try {
          await savePlants({
            ...plant,
            dateTimeNotification: selectedDateTime
          });
            navigation.navigate('ConfirmationScreen',{
                title: ' Allright!',
                subtitle: `Don't worry be happy! We are here to remind you to care of you plants.`,
                buttonTitle: 'Thank you :D',
                icon: 'leaf',
                nextScreen: 'MyPlants',
            });

        } catch {
            Alert.alert('I could not save it.😢');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>

                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}

                />
                <Text style={styles.plantName}>
                    {plant.name}

                </Text>
                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>
                <Text style={styles.alertLabel}>
                    Choose the best time to be remembered:
                </Text>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                    />
                )}
                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity
                            style={styles.dateTimePickerTextButton}
                            onPress={handleopenDatetimePickerForAndroid}
                        >
                            <Text style={styles.dateTimePickerText}>
                                {`Set Reminder${format(selectedDateTime, 'HH:mm')} `}
                            </Text>
                        </TouchableOpacity>
                    )
                }
                <Button
                    title="Add plant"
                    onPress={handleSave}
                />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,

    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,

    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20

    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,

    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,

    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,

    },
    tipImage: {
        width: 56,
        height: 56,

    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'

    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,

    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text

    },
    dateTimePickerTextButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,

    }

});
