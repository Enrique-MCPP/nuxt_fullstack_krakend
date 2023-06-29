import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import COLORS from '../../themes/colors';

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor, disabled = false, width = '100%' }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {width: width},
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
        disabled ? styles.disabled : {},
        pressed ? styles.pressed : {}
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: COLORS.appcolor,
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },


  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: 'white',
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',

  },
  disabled: {
    backgroundColor: '#D3D3D3', 
  },
  pressed: {
    backgroundColor: '#1E90FF',
  },
});

export default CustomButton;
