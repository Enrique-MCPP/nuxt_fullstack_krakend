import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
        {error && (
          <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
        )}
          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' : '#e8e8e8' },
            ]}
          >
            <TextInput
              value={value || ''} // Asegúrate de proporcionar un valor inicial vacío
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              placeholderTextColor="#A8A8A8"
            />
          </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },
  input: {
    paddingHorizontal: 10,
    height: 40,
  },
});

export default CustomInput;