import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as Notifications from 'expo-notifications';

export interface PlantsProps{

    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: string[],
    frequency: {
        times: number;
        repeat_every: string;
    },
    dateTimeNotification:Date,
    hour:string;
    
}

export interface EnviromentsProps{
    key:string;
    title:string;
}

export interface StoragePlantProps{
    [id: string]: {
        data: PlantsProps;
        notificationId: string;
    }
}
//erro identificado na DateTimeNotification
//provavelmente seria um comflito entra a estrutura salva com a estrutura
//carregada
export async function savePlants(plant:PlantsProps):Promise<void> {
    try{
        const nexTime = new Date(plant.dateTimeNotification);
        const now = new Date();

        
        const { times, repeat_every } = plant.frequency;
        if(repeat_every === 'week'){
            const interval = Math.trunc(7 / times);
            nexTime.setDate(now.getDate() + interval);
        }
        else 
          nexTime.setDate(nexTime.getDate() + 1)

        const seconds = Math.abs(
            Math.ceil(now.getTime() - nexTime.getTime()) / 1000);
        

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Heey,🌱',
                body: `It's time to watering your babies ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger:{
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        })



        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlants = data? (JSON.parse(data) as StoragePlantProps):{};

        const newPlant ={
            [plant.id]:{
                data: plant,
                notificationId            
            }
        }
        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
            })
        );

    } catch(error){
       
        throw new Error(error);
    }
}


export async function loadPlants():Promise<PlantsProps[]> {
    try{
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data? (JSON.parse(data) as StoragePlantProps):{};
      
        
        const plantSorted = Object.keys(plants).map((plant) => {
        
            return{
                ...plants[plant].data,
                hour:format(new Date(plants[plant].data.dateTimeNotification),'HH:mm')
            }
        })
        .sort((a, b) => 
            Math.floor(
                new Date(a.dateTimeNotification).getTime() / 1000 -
                Math.floor( new Date(b.dateTimeNotification).getTime() / 1000)
            )
        );

        return plantSorted;
    }catch(error){
        throw new Error(error);
    }
}

export async function removePlant(id: number): Promise<void> {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
  
    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);
    delete plants[id];
  
    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants));
  }
