import React, {useEffect} from 'react';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { PlantsProps } from './src/libs/storage';


export default function App(){
  const [ fontLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantsProps;
        console.log(data)
      }
    )

      return () => subscription.remove();

       // async function notifications() {
  //   await Notifications.cancelAllScheduledNotificationsAsync();

  //   const data = await Notifications.getAllScheduledNotificationsAsync();
  //   console.log('NOTIFICAÇÕES AGENDADAS #####')
  //   console.log(data)
  // }

  // notifications()

    
  },[])
  // holding the splash screen until the fonts is loading.

  if (!fontLoaded){
    return (
      <AppLoading />

    )
  }
  return (
    <Routes />
   

  )
 
    
  
}





