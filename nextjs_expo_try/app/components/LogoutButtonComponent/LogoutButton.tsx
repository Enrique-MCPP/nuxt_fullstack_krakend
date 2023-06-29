import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, Modal, StyleSheet, View, Text } from 'react-native';
import { useAuth } from '../../context/auth';
import { useRouter } from 'expo-router';
import { translate } from '../../assets/i18n/Language';
import { Image } from 'react-native';
import ImageButtonComponent from '../ImageButtonComponent/ImageButtonComponent';

export const LogoutButton = ({ color }) => {
  const { signOut } = useAuth();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = () => {
    signOut();
    router.push({ pathname: 'routes//(auth)/SignInScreen', params: { loggedOut: true } });
    closeMenu();
  };

  return (
    <>
      <ImageButtonComponent
        onPress={openMenu}
        source={require('../../assets/person/person.jpg')}
        style={styles.imageStyle}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={closeMenu}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{translate('logout.logoutMessage')}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
                <Text style={styles.buttonText}>{translate('logout.logout')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeMenu} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>{translate('logout.cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
  },
  logoutButton: {
    backgroundColor: 'red',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    marginHorizontal: 10,


  }
});
