import React from 'react'
import { View, Text } from 'react-native'

export default () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ fontSize: 24 }}>Acerca de nosotros</Text>
      <Text style={{ marginVertical: 20 }}>
        Esta es una aplicación móvil que te ayuda a encontrar información sobre cualquier tema que desees. Puede buscar en la web y obtener resultados relevantes en segundos.
      </Text>
      <Text style={{ fontStyle: 'italic' }}>Versión 1.0.0</Text>
    </View>
  )
}
