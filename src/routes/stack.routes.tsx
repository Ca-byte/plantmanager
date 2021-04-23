import React from 'react';
import{ createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import { Welcome } from '../pages/Welcome';
import { UserIndentification } from '../pages/UserIdentification';
import { ConfirmationScreen } from '../pages/ConfirmationScreen';
import { PlantSelect } from '../pages/PlantSelect';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = ( ) => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
            
        }}
    >
        <stackRoutes.Screen
        name= "Welcome"
        component={Welcome}
        />
         <stackRoutes.Screen
        name= "UserIndentification"
        component={UserIndentification}
        />
         <stackRoutes.Screen
        name= "ConfirmationScreen"
        component={ConfirmationScreen}
        />
         <stackRoutes.Screen
        name= "PlantSelect"
        component={PlantSelect}
        />

    </stackRoutes.Navigator>
)
 export default AppRoutes;