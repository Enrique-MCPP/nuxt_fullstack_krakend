import * as SecureStore from 'expo-secure-store';

// Guardar el email y la contraseña
export const saveCredentials = async (email, password) => {
    try {
        await SecureStore.setItemAsync('email', email);
        await SecureStore.setItemAsync('password', password);
    } catch (error) {
        console.log('Error al guardar las credenciales:', error);
    }
};

// Obtener el email y la contraseña guardados
export const getCredentials = async () => {
    try {
        const email = await SecureStore.getItemAsync('email');
        const password = await SecureStore.getItemAsync('password');
        return { email, password };
    } catch (error) {
        return { email: null, password: null };
    }
};

// Borrar el email y la contraseña guardados
export const clearCredentials = async () => {
    try {
        await SecureStore.deleteItemAsync('email');
        await SecureStore.deleteItemAsync('password');
    } catch (error) {
        console.log('Error al borrar las credenciales:', error);
    }
};
