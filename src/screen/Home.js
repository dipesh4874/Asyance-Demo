import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [contact, setcontact] = useState('');

  useEffect(() => {
    if (isFocused) getdata();
  }, [isFocused]);

  const getdata = async () => {
    try {
      const contacts = await AsyncStorage.getItem('CONTACT');
      setcontact(JSON.parse(contacts));
    } catch (e) {
      console.log(e);
    }
  };

  const deletedatindex = async index => {
    const DELdata = contact;
    const seletdedata = DELdata.filter((item, ind) => {
      return ind != index;
    });
    setcontact(seletdedata);
    await AsyncStorage.setItem('CONTACT', JSON.stringify(seletdedata));
  };

  const setEdit = item => {
    navigation.navigate('Save', item);
  };

  return (
    <SafeAreaView style={styles.conatanier}>
      <FlatList
        data={contact}
        renderItem={({item, index}) => {
          console.log();
          return (
            <View style={styles.flatview}>
              <View style={styles.viewdata}>
                <Text style={styles.texdata}>{item?.name}</Text>
                <Text style={styles.texdata}>{item?.Password}</Text>
                <Text style={styles.texdata}>{item?.number}</Text>
              </View>
              <View style={styles.touchview}>
                <TouchableOpacity
                  style={styles.touchtext}
                  onPress={() => {
                    deletedatindex(index);
                  }}>
                  <Text style={styles.deletebutton}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.touchtext}
                  onPress={() => {
                    setEdit(item);
                  }}>
                  <Text style={styles.deletebutton}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity style={styles.touchstyle}>
        <Text
          style={styles.buttontext}
          onPress={() => navigation.navigate('Save')}>
          Add Data
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  conatanier: {
    flex: 1,
  },
  touchstyle: {
    backgroundColor: 'black',
    width: 200,
    height: 50,
    borderRadius: 30,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  flatview: {
    width: '90%',
    paddingVertical: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  touchtext: {
    backgroundColor: 'blue',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  texdata: {
    paddingVertical: 2,
  },
  touchview: {
    flexDirection: 'row',
    gap: 5,
    marginHorizontal: 10,
  },
  viewdata: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '60%',
    justifyContent: 'space-between',
  },
  deletebutton: {
    color: 'white',
    fontWeight: '600',
  },
});
export default Home;
