import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    Alert,
} from 'react-native';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import { loadPlants, PlantsProps, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { Load } from '../components/Load';


export function MyPlants() {

    const [myPlants, SetMyPlants] = useState<PlantsProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantsProps) {
        Alert.alert("Remove", `Are you sure about to delet ${plant.name}?`,[
            {
                text: 'No 😇 ',
                style: 'cancel'
            },
            {
                text: 'Yes 😈',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);
                        
                        SetMyPlants((oldData) => 
                            oldData.filter((item)=> item.id != plant.id)

                        );    
                        

                    } catch (error){
                        Alert.alert('I could not delete 😒');

                    }
                },
            },
        ]);
    }

    useEffect(() => {
        (async function loadStorageData() {
            const plantsStoraged = await loadPlants();
            console.log(plantsStoraged)
            if(plantsStoraged.length>0){
                const nextTime = formatDistance(
                    new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                    new Date().getTime(),
                    { locale: pt }
                );
                setNextWatered(
                    `Don't forget to watering ${plantsStoraged[0].name} in ${nextTime}.`
                )
            }else{
                setNextWatered('You did not select any plant!😢')
            }
            SetMyPlants(plantsStoraged);
            setLoading(false);
        })()

    
    }, []);

    if(loading)
        return <Load />;
    
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.spolight}>
                <Image
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWaterd}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                 Next Watering
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                    <PlantCardSecondary 
                    handleRemove={() => {handleRemove(item)}}

                    data={item} 
                    />

                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}

                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,

    },
    spolight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage: {
        width: 60,
        height: 60,

    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,


    },
    plants: {
        flex: 1,
        width: '100%',

    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }


});
