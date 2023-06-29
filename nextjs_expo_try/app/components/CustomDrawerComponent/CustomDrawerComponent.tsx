import React from 'react';

import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useTheme } from "@react-navigation/native";
import DimTheme from '../../themes/DimTheme';
import COLORS from '../../themes/colors';



export const CustomDrawerComponent = (props) => {
    const theme = useTheme();

    return (
        <DrawerContentScrollView {...props}>
            <View
                style={{
                    marginLeft: 20,
                    marginVertical: 40,

                }}>
                <Image
                    source={require('../../assets/person/person.jpg')}
                    style={{ height: 70, width: 70, borderRadius: 20 }}
                />
                <Text
                    style={{
                        color: theme === DimTheme ? COLORS.white : COLORS.dark,
                        fontWeight: 'bold',
                        fontSize: 18,
                        marginTop: 10,
                        marginBottom: 50
                    }}>
                    Comandante Fernández
                </Text>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    );
}