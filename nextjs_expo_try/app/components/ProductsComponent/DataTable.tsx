import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const DataTable = ({ data, columns, onSelectRow }) => {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowSelect = (row) => {
        setSelectedRow(row);
        onSelectRow(row);
    };

    return (
        <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
                {columns.map((column, index) => (
                    <Text style={styles.tableHeaderText} key={index}>
                        {column.title}
                    </Text>
                ))}
            </View>
            {data.map((item, index) => (
                <TouchableOpacity
                    style={[
                        styles.tableRow,
                        index % 2 === 0 && styles.tableRowEven,
                        selectedRow && selectedRow.id === item.id && styles.tableRowSelected,
                    ]}
                    onPress={() => handleRowSelect(item)}
                    key={item.id}
                >
                    {columns.map((column) => (
                        <View style={styles.tableCell} key={column.field}>
                            <Text style={styles.tableText}>{item[column.field]}</Text>
                        </View>
                    ))}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 10,
        width: '100%', // Ajusta el ancho de la tabla al 100% del contenedor
        overflow: 'hidden', // Oculta el desbordamiento horizontal de la tabla
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    tableHeaderText: {
        flex: 1,
        paddingHorizontal: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    tableRow: {
        flexDirection: 'row',


    },
    tableRowEven: {
        backgroundColor: '#f9f9f9',
    },
    tableRowSelected: {
        backgroundColor: '#e6e6e6',
    },
    tableCell: {
        flex: 1,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tableText: {
        fontSize: 16,
        color: '#333',
    },
});

export default DataTable;
