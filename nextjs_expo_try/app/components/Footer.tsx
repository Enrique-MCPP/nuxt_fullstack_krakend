import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native'

export const Footer = () => {
  return (
    <ImageBackground source={{ uri: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} style={styles.footer}>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  footer: {

    width: '100%',
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

