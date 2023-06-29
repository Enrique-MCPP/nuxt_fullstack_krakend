import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform,Text } from 'react-native';
import DataTable from './DataTable';
import CustomButton from '../CustomButtonComponent/CustomButton';
import { useRouter } from 'expo-router';

const ProductsComponent = ({navigation}) => {
    const [selectedData, setSelectedData] = useState(null);

    const handleSelectRow = (row) => {
        setSelectedData(row);
        // Aquí puedes realizar acciones adicionales al seleccionar una fila, como mostrar el panel de edición.
    };

    const handleSave = (row) => {

        console.log('handleSave')
    };


    // Datos de ejemplo
    const data = [
        { id: 1, name: 'Producto 1', price: 10 },
        { id: 2, name: 'Producto 2', price: 20 },
        { id: 3, name: 'Producto 3', price: 30 },
    ];
    const isPhone = Platform.OS === 'ios' || Platform.OS === 'android';
    const columns = [
        { title: 'ID', field: 'id' },
        { title: 'Nombre', field: 'name' },
        { title: 'Precio', field: 'price' },

    ];
    const router = useRouter();
    
    return (
        !isPhone ? (
            <View style={styles.container}>
                <DataTable data={data} columns={columns} onSelectRow={handleSelectRow} />
                {/* Aquí puedes renderizar el panel de edición con los inputs utilizando el estado selectedData */}
                <View style={styles.panel}>


                    <TextInput
                        value={selectedData?.name}
                        onChangeText={(text) => setSelectedData({ ...selectedData, name: text })}
                        style={styles.input}
                    />
                    <TextInput
                        value={selectedData?.price.toString()}
                        onChangeText={(text) =>
                            setSelectedData({ ...selectedData, price: parseInt(text, 10) || 0 })
                        }
                        style={styles.input}
                    />
                </View>
                <View >
                    <CustomButton
                        text="Guardar"
                        onPress={() => {
                            handleSave(selectedData);
                        }}
                        width={isPhone ? '100%' : '10%'}
                        disabled={false} bgColor={undefined} fgColor={undefined}
                    />

                    <CustomButton
                        text="Ir a products component two"
                        onPress={() => {
                            router.push('screens/ProductScreenTwo');
                        }}
                        width={isPhone ? '100%' : '10%'}
                        disabled={false} bgColor={undefined} fgColor={undefined}
                    />


                </View>
            </View>) : (
            <View style={styles.container}>
                <Text>Products Component</Text>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    panel: {
        marginTop: 20,
        width: '25%'
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default ProductsComponent;
