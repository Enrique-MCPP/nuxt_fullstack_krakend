import React, { useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';


const ProductsComponentTwo = ({ navigation }) => {
    const [selectedData, setSelectedData] = useState(null);

    const handleSelectRow = (row) => {
        setSelectedData(row);
        // Aquí puedes realizar acciones adicionales al seleccionar una fila, como mostrar el panel de edición.
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
    return (
        <View style={styles.container}>


            <Text>Hola desde el product component two</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    panel: {
        marginTop: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default ProductsComponentTwo;
