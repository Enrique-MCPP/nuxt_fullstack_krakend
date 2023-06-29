import React, { cloneElement } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import COLORS from '../../themes/colors';
import { ProductCategories } from './productCategories';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../CustomButtonComponent/CustomButton';
import { useRouter } from 'expo-router';
import { translate } from '../../assets/i18n/Language';
type Props = {
    control: any;
    name: string;
    selectedCategoryIndex: number | null;
    setSelectedCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
    filterProduct: (index: number) => void;
};
const isPhone = Platform.OS === 'ios' || Platform.OS === 'android';
const { width, height } = Dimensions.get('window');
const CategoriesProductComponent: React.FC<Props> = ({ control, name, selectedCategoryIndex, setSelectedCategoryIndex, filterProduct }) => {
    const firstHalfCategories = isPhone ? ProductCategories.slice(0, 2) : ProductCategories.slice(0, 4);
    const secondHalfCategories = isPhone ? ProductCategories.slice(2, 4) : ProductCategories.slice(4, 8);
    const thirdHalfCategories = isPhone ? ProductCategories.slice(4, 6) : ProductCategories.slice(8, 12);
    const fourthHalfCategories = isPhone ? ProductCategories.slice(6, 8) : ProductCategories.slice(12, 16);
    const router = useRouter();

    return (
        <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
                const renderCategories = (categories, startIndex) => (
                    <View style={styles.categoryContainer}>
                        {categories.map((item, index) => (
                            <View key={'Product' + (index + startIndex)} style={[styles.categoryItem, { marginRight: 10 }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedCategoryIndex(index + startIndex);
                                        filterProduct(index + startIndex);
                                        onChange(index + startIndex);
                                    }}
                                    style={[
                                        styles.categoryBtn,
                                        {
                                            backgroundColor: selectedCategoryIndex === index + startIndex ? COLORS.appcolor : COLORS.white,
                                        },
                                    ]}
                                >
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> 
                                        {typeof item.icon === 'string' ? (
                                            <MaterialCommunityIcons
                                                name={item.icon}
                                                size={90}
                                                color={selectedCategoryIndex === index + startIndex ? COLORS.white : COLORS.appcolor}
                                            />
                                        ) : (
                                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                {cloneElement(item.icon, { fill: selectedCategoryIndex === index + startIndex ? COLORS.white : COLORS.appcolor })}
                                            </View>
                                        )}
                                        <Text style={styles.categoryBtnName}>{item.name as string}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        ))}
                    </View>
                );

                return (
                    <ScrollView>
                        {renderCategories(firstHalfCategories, 0)}
                        {renderCategories(secondHalfCategories, 2)}
                        {renderCategories(thirdHalfCategories, 4)}
                        {renderCategories(fourthHalfCategories, 6)}
                        {isPhone &&
                            <View style={styles.buttonContainer}>
                                <CustomButton width='80%'
                                    text={translate('categoryProduct.next')}
                                    onPress={() => router.push('/routes/verificationCode/verificationCode')}
                                    bgColor={undefined} fgColor={undefined}
                                />
                            </View>
                        }
                    </ScrollView>
                );
            }}
            name={name}
            defaultValue={null}
        />
    );

};





const styles = StyleSheet.create({
    categoryItem: {
        flex: 1,
        alignItems: 'center',
        margin: isPhone ? 10 : 20,
    },
    categoryBtn: {
        height: isPhone ? (height / 5) - 20 : 120,
        width: isPhone ? (width / 2) - 30 : 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    categoryBtnName: {
        color: COLORS.dark,
        fontSize: 10,
        marginTop: 5,
        fontWeight: 'bold',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: isPhone ? -30 : 0,
        marginTop: 30,
        paddingHorizontal: isPhone ? 20 : width * 0.2,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 10,
    },
});

export default CategoriesProductComponent;
