import React from 'react';
import {
    Dimensions,
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import COLORS from '../../themes/colors';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');
const isPhone = Platform.OS === 'android' || Platform.OS === 'ios';
const isTablet = width / height < 0.6;
const isDevicePhone = isPhone && !isTablet;
const imageSize = isDevicePhone ? 140 : 100;
const detailsSize = isDevicePhone ? 120 : 80;

const CardProductComponent = ({ Product, navigation }) => {
    const theme = useTheme();
    const isDark = theme.dark;
    const [isHovered, setIsHovered] = useState(false);
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const style = getStyles(isPressed);
    const handleInteraction = isPhone
        ? {
            onPressIn: () => setIsHovered(true),
            onPressOut: () => setIsHovered(false),
        }
        : {
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
        };

    const handleEditInteraction = isPhone
        ? {}
        : {
            onMouseEnter: () => setIsEditHovered(true),
            onMouseLeave: () => setIsEditHovered(false),
        };

    let ProductContent;
    if (Product.image) {
        ProductContent = (
            <Image
                source={Product.image}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                }}
            />
        );
    } else {
        ProductContent = (
            <MaterialCommunityIcons
                name={Product.category}
                size={30}
                color={COLORS.grey}
                style={{
                    opacity: 0.5,
                    alignSelf: 'center',

                }}
            />


        );
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailsScreen', Product)}
            style={style.CardProductComponentContainer}
            {...handleInteraction}
        >
            <View style={style.CardProductComponentDetailsContainer}>
                <View style={style.innerRow}>
                    <View style={style.CardProductComponentImageContainer}>
                        {ProductContent}
                    </View>
                    <View style={style.textContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.dark, fontSize: 14 }}>
                                {Product?.name}
                            </Text>
                            <View style={{marginRight: '5%'}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('EditProductScreen', Product)}
                                    {...handleEditInteraction}
                                    style={isEditHovered ? style.editButtonHovered : style.editButton}
                                >
                                    <FontAwesome5 name="edit" color={COLORS.appcolor} size={18} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-around',  marginRight: isPhone ? '12%' : '40%', marginTop:15}}
                        >
                            <Text style={{ fontSize: 11, marginTop: 5, color: COLORS.grey, fontWeight: 'bold' }}>
                                {Product?.type}
                            </Text>
                            <Text style={{ fontSize: 11, marginTop: 5, color: COLORS.grey }}>
                                {Product?.age}
                            </Text>
                            <Text style={{ fontSize: 11, marginTop: 5, color: COLORS.grey }}>
                                {Product?.weight}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    function getStyles(isPressed) {
        return StyleSheet.create({
            CardProductComponentContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
                shadowColor: isHovered ? '#000' : '#888',
            },
            CardProductComponentImageContainer: {
                height: detailsSize,
                width: detailsSize,
                backgroundColor: COLORS.background,
                borderRadius: 10,
                marginHorizontal: 0, // set this to 0
                marginRight: isPhone ? '5%' : '5%',
                shadowColor: isDark ? (isEditHovered ? 'rgb(10, 132, 255)' : 'rgb(255,255,255)') : (isEditHovered ? '#000' : '#888'),
                shadowOffset: {
                    width: isDark ? (isHovered ? 3 : 0) : 0,
                    height: isDark ? (isHovered ? 3 : 0) : 2,
                },
                shadowOpacity: isHovered ? 0.7 : 0.25,
                shadowRadius: isHovered ? 3.84 : 2,
                elevation: isHovered ? 5 : 2,
                justifyContent: 'center',
            },

            CardProductComponentDetailsContainer: {
                flexDirection: 'column',
                height: detailsSize,
                backgroundColor: COLORS.white,
                flex: 1,
                borderRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                shadowColor: isDark ? (isEditHovered ? 'rgb(10, 132, 255)' : 'rgb(255,255,255)') : (isEditHovered ? '#000' : '#888'),
                shadowOffset: {
                    width: isDark ? (isHovered ? 3 : 0) : 0,
                    height: isDark ? (isHovered ? 3 : 0) : 2,
                },
                shadowOpacity: isHovered ? 0.7 : 0.25,
                shadowRadius: isHovered ? 3.84 : 2,
                elevation: isHovered ? 5 : 2,
            },
            innerRow: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            },
            editButton: {
                // Estilo original de tu botón de edición
            },
            editButtonHovered: {
                // Estilo de tu botón de edición cuando el mouse está encima
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            textContainer: {
                flex: 1,
            },
        });
    }
};

export default CardProductComponent;
