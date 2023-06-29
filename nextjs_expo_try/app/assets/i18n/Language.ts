import { Platform, NativeModules } from 'react-native';

const defaultLanguage = 'es-ES';
let currentLanguage = defaultLanguage;

const languages: { [key: string]: any } = {
    "es-ES": require('./es-ES.json'),
    "en-EN": require('./en-EN.json'),
    "ca-CA": require('./ca-CA.json'),
    "eu-EU": require('./eu-EU.json'),
    "gl-GL": require('./gl-GL.json'),
    // Agrega aquí más idiomas si es necesario
};

const getDeviceLanguage = () => {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
        switch (navigator.language) {
            case 'es':
                return 'es-ES';
            case 'en':
                return 'en-EN';
            case 'ca':
                return 'ca-CA';
            case 'eu':
                return 'eu-EU';
            case 'gl':
                return 'gl-GL';
            default:
                return defaultLanguage;
        }
    } else {
        const { I18nManager } = NativeModules;
        return I18nManager.localeIdentifier;
    }

};

export function translate(key: string): string {
    let language = languages[getDeviceLanguage()];
    if (!language) {
        language = languages[currentLanguage];
    }

    let keys = key.split('.');
    for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];
        if (language && language[currentKey] && i !== keys.length - 1) {
            language = language[currentKey];
        } else {
            return language[currentKey];
        }
    }
    return '';
}