import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Alert } from 'react-native';

export interface PlantsProps{

    id:number;
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
    [id:string]:{
        data:PlantsProps;
        notificationId:string;
    }
}
//erro identificado na DateTimeNotification
//provavelmente seria um comflito entra a estrutura salva com a estrutura
//carregada
export async function savePlants(plant:PlantsProps):Promise<void> {
    try{
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlants = data? (JSON.parse(data) as StoragePlantProps):{};
        const newPlant ={
            [plant.id]:{
                data: plant            
            }
        }
        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
            })
        );
    }catch(err){
        console.log(err)
        throw new Error(err);
    }
}
export async function removePlant(id:number):Promise<void>{

    try{
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data? (JSON.parse(data) as StoragePlantProps):{};
        console.log(plants)
        delete plants[id];
        await AsyncStorage.setItem(
            '@plantmanager:plants',
            JSON.stringify(plants)

        );
      
    }catch(err){
        console.log(err)
        throw new Error(err);

    }
}

export async function loadPlants():Promise<PlantsProps[]> {
    try{
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data? (JSON.parse(data) as StoragePlantProps):{};
      
        
        const plantSorted = Object
        .keys(plants)
        .map((plant)=>{
            return{
                ...plants[plant].data,
                hour:format(new Date(plants[plant].data.dateTimeNotification),'HH:mm')
            }
        })
        .sort((a , b) => 
            Math.floor(
                new Date(a.dateTimeNotification).getTime()/1000
                - Math.floor(
                    new Date(b.dateTimeNotification).getTime()/1000
                )
            )
        )
        return plantSorted;
    }catch(err){
        throw new Error(err);
    }
}
