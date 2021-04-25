import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { RectButton, RectButtonProps, } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import format  from 'date-fns/format';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
        dateTimeNotification:Date;

    }
}

export const PlantCardSecondary = ({ data, ...rest }: PlantProps) => {
    return (
        <RectButton 
        style={styles.container}
        {...rest}
    >
        <SvgFromUri 
            uri={                    
                data.photo                    
            }
            width={50}
            height={50}
        />
        <Text style={styles.title}>
            {data.name}
        </Text>
        <View
            style={styles.details}
        >
            <Text
                style={styles.timeLabel}
            >
                water at
            </Text>
            <Text
                style={styles.time}
            >

                  {format(new Date(data.dateTimeNotification),'HH:mm')}
            </Text>
        </View>

    </RectButton>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:25,
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:colors.shape,
        marginVertical:5
        
    },
    title:{
        flex:1,
        marginLeft:10,
        color:colors.heading,
        fontFamily:fonts.heading,
        fontSize:17,

    },
    details:{
        alignItems:'flex-end'
    },
    timeLabel:{      
        fontSize:16,
        fontFamily:fonts.text,
        color:colors.body_light

    },
    time:{
        marginTop:5,
        fontSize:16,
        fontFamily:fonts.heading,
    },
    buttomRemove:{

        width:100,
        height:85,
        backgroundColor:colors.red,
        marginTop:15,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        right:20,
        paddingLeft:15
    }

});


