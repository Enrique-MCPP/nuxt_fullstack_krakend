

import React, { useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Platform,
    Dimensions,
} from 'react-native';
import COLORS from '../../themes/colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');
const isPhone = Platform.OS === 'android' || Platform.OS === 'ios';
const isTablet = width / height < 0.6;
const isDevicePhone = isPhone && !isTablet;  
const imageSize = isDevicePhone ? 140 : 100; 
const detailsSize = isDevicePhone ? 120 : 80; 
import { useRouter } from 'expo-router';
const AddProductCardComponent = ({ navigation }) => {
    const theme = useTheme();
    const isDark = theme.dark;
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const style = getStyles(isPressed);
    const router = useRouter();
    const handleInteraction = isPhone
        ? {
            onPressIn: () => setIsHovered(true),
            onPressOut: () => setIsHovered(false),
        }
        : {
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
        };


    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/routes/addProduct/addProduct')}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={style.AddProductCardContainer}
            {...handleInteraction}
        >
            <FontAwesome5 name="plus" size={50} color={COLORS.grey} />
        </TouchableOpacity>
    );

    function getStyles(isPressed) {
        return StyleSheet.create({
            AddProductCardContainer: {
                height: imageSize, 
                width: imageSize,
                backgroundColor: COLORS.background,
                borderRadius: 20,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: isDark ? (isHovered ? "rgb(10, 132, 255)" : "rgb(255,255,255)") : (isHovered ? "#000" : "#888"),


                shadowOffset: {
                    width: isDark ? (isHovered ? 3 : 0) : 0,
                    height: isDark ? (isHovered ? 3 : 0) : 2,
                },
                shadowOpacity: isHovered ? 0.7 : 0.25,
                shadowRadius: isHovered ? 3.84 : 2,
                elevation: isHovered ? 5 : 2,
            },
        });
    }
};
export default AddProductCardComponent;