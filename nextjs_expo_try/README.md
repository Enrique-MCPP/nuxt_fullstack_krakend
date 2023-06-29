# Expo Router Example

Use [`expo-router`](https://expo.github.io/router) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Notes

- [Expo Router: Docs](https://expo.github.io/router)
- [Expo Router: Repo](https://github.com/expo/router)

# ProductCareTotal

Aplicación ProductCareTotal

## Instalación

Al descargar el proyecto, se recomienda utilizar el administrador de paquetes pnpm para instalar las dependencias en lugar de npm. Asegúrate de tener [pnpm](https://pnpm.io/) instalado globalmente en tu sistema.

Ejecuta el siguiente comando para instalar las dependencias utilizando pnpm:

```sh
pnpm install
```

Si pnpm no está disponible, puedes utilizar npm de la siguiente manera:

```sh
npm install
```

## Configuración de ESLint

Antes de comenzar, asegúrate de tener [npm](https://www.npmjs.com/) instalado globalmente en tu sistema.

Ejecuta el siguiente comando para iniciar la configuración de ESLint:

```sh
npm init @eslint/config
```

Se te presentarán varias preguntas para personalizar la configuración de ESLint. A continuación se muestra una guía basada en las opciones que proporcionaste:

- **How would you like to use ESLint?**: Selecciona `style`.
- **What type of modules does your project use?**: Selecciona `esm`.
- **Which framework does your project use?**: Selecciona `none`.
- **Does your project use TypeScript?**: Selecciona `Yes`.
- **Where does your code run?**: Selecciona `browser` y `node` tecleando la letra a o con el espacio del teclado.
- **How would you like to define a style for your project?**: Selecciona `guide`.
- **Which style guide do you want to follow?**: Selecciona `standard-with-typescript`.
- **What format do you want your config file to be in?**: Selecciona `JavaScript`.

Una vez que hayas completado las preguntas, se te mostrará una lista de dependencias requeridas. Asegúrate de tener pnpm o npm instalado y selecciona `Yes` cuando se te pregunte si deseas instalar las dependencias y utiliza pnpm.

Asegúrate de que tu archivo `.eslintrc.js` tenga la siguiente configuración:

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'warn',
    'react/display-name': 'off'
  }
};
```

Asegúrate de revisar y ajustar la configuración según tus necesidades específicas.

Con estas instrucciones, podrás instalar las dependencias utilizando pnpm y configurar ESLint adecuadamente para tu proyecto ProductCareTotal.