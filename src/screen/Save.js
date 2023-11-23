import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
const Save = () => {
  const [name, setname] = useState('');
  console.log(name, 'name');
  const [Password, setpassword] = useState('');
  const [number, Setnumber] = useState('');
  const [edit, setEdit] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let tempcontact = [];
    contact = [];

    let x = JSON.parse(await AsyncStorage.getItem('CONTACT'));
    x.map(item => {
      contact.push(item);
      if (
        item?.Password === route?.params?.Password &&
        item?.name === route?.params?.name
      ) {
        console.log('done');
        setname(route?.params?.name);
        setpassword(route?.params?.Password);
        Setnumber(route?.params?.number);
      }
    });
    setEdit(contact);
  };
  const savecontact = async () => {
    if (route?.params) {
      await AsyncStorage.clear().then(async () => {
        const contact = edit.map(item => {
          if (
            item?.Password === route?.params?.Password &&
            item?.name === route?.params?.name
          ) {
            return {Password: Password, name: name, number: number};
          }
          return item;
        });
        await AsyncStorage.setItem('CONTACT', JSON.stringify(contact));
        console.log(contact);
        navigation.goBack();
      });
    } else {
      const contact = [];
      contact.push(...edit, {name: name, Password: Password, number: number});
      await AsyncStorage.setItem('CONTACT', JSON.stringify(contact));
      console.log(contact);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your Name"
        style={styles.Textinputstyle}
        value={name}
        onChangeText={val => setname(val)}
      />
      <TextInput
        placeholder="Enter Password"
        style={styles.Textinputstyle}
        defaultValue={Password}
        onChangeText={val => setpassword(val)}
      />
      <TextInput
        placeholder="Enter PhonNumber"
        style={styles.Textinputstyle}
        defaultValue={number}
        onChangeText={val => Setnumber(val)}
      />
      <TouchableOpacity style={styles.Toucstyle} onPress={() => savecontact()}>
        <Text style={styles.Textstylea}>Save Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
  },
  Toucstyle: {
    backgroundColor: 'black',
    marginTop: 40,
    width: '80%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
  },
  Textstylea: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  Textinputstyle: {
    fontSize: 20,
    borderWidth: 1,
    width: '80%',
    height: 50,
    paddingLeft: 10,
    marginTop: 40,
    borderRadius: 10,
  },
});
export default Save;
