/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import moment from 'moment';

const Main = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    parseDataTextMode()
  }
  const [isEnabledClockMode1, setIsEnabledClockMode1] = useState(false);
  const toggleSwitchClockMode1 = () =>
    setIsEnabledClockMode1(previousState => !previousState);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isEnabledClockMode2, setIsEnabledClockMode2] = useState(false);
  const toggleSwitchClockMode2 = () =>
    setIsEnabledClockMode2(previousState => !previousState);
  const [checked, setChecked] = React.useState('first');
  const [line, setLine] = useState('');
  const [line2, setLine2] = useState('');
  const [openSpeed, setOpenSpeed] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [value, setValue] = useState(null);
  const [valueSpeed, setValueSpeed] = useState(null);
  const [valueColor, setValueColor] = useState(null);
  const [itemsColor, setItemsColor] = useState([
    {label: 'Red', value: '1'},
    {label: 'Green', value: '2'},
    {label: 'Blue', value: '3'},
    {label: 'White', value: '4'},
    {label: 'RGB', value: '5'},
  ]);
  const [itemsSpeed, setItemsSpeed] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
  ]);
  const onSpeedOpen = useCallback(() => {
    setOpenColor(false);
  }, []);

  const onColorOpen = useCallback(() => {
    setOpenSpeed(false);
  }, []);
  const parseDataTextMode = ()=>{
    const dynamic = toggleCheckBox?1:0;
    axios.get('http://192.168.1.1:80/text',{params:{
      data:`{"command":${1},"data":[{"line1": "${line}"},{"line2": "${line2}"},{"speed": ${valueSpeed}},{"color": ${valueColor}},{"dynamic": ${dynamic}}]}`
    }}).then(()=>{
      Alert.alert('Thông báo','Gửi dữ liệu thành công')
    })
  }
  const parseDataWeatherMode = ()=>{
    const time = moment();
    axios.get('http://192.168.1.1:80/weather',{params:{
      data:`{"command": 2,"data":[{"gio": "${time.hours()}"},{"phut": "${time.minutes()}"},{"giay": "${time.seconds()}"},{"ngay": "${time.date()}"},{"thang": "${time.month()}"},{"nam": "${time.year()}"},{"dow": "${time.day()}"}]}`
    }}).then(()=>{
      Alert.alert('Thông báo','Gửi dữ liệu thành công')
    })
  }
  const parseDataTimeMode = ()=>{
    const time = moment();
    axios.get('http://192.168.1.1:80/time',{params:{
      data:`{"command": 2,"data":[{"gio": "${time.hours()}"},{"phut": "${time.minutes()}"},{"giay": "${time.seconds()}"},{"ngay": "${time.date()}"},{"thang": "${time.month()}"},{"nam": "${time.year()}"},{"dow": "${time.day()}"}]}`
    }}).then(()=>{
      Alert.alert('Thông báo','Gửi dữ liệu thành công')
    })
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          marginTop: 8,
          borderRadius: 8,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            marginTop: 12,
          }}>
          Line 1
        </Text>
        <TextInput
          // value={email}
          onChangeText={setLine}
          // defaultValue={dataUser?.email}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 8,
            marginTop: 8,
            borderRadius: 4,
            borderColor: 'gray',
            paddingVertical: 4,
            borderWidth: 1,
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            marginTop: 12,
          }}>
          Line 2
        </Text>
        <TextInput
          // value={email}
          onChangeText={setLine2}
          // defaultValue={dataUser?.email}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 8,
            marginTop: 8,
            borderRadius: 4,
            borderColor: 'gray',
            paddingVertical: 4,
            borderWidth: 1,
          }}
        />
        <DropDownPicker
          style={{marginTop: 8}}
          zIndex={3000}
          zIndexInverse={1000}
          placeholder={'Chọn Speed'}
          placeholderStyle={{
            color: 'gray',
          }}
          open={openSpeed}
          value={valueSpeed}
          items={itemsSpeed}
          setOpen={setOpenSpeed}
          setValue={setValueSpeed}
          setItems={setItemsSpeed}
        />
        <DropDownPicker
          style={{marginTop: 8}}
          zIndex={2000}
          placeholder={'Chọn Color'}
          placeholderStyle={{
            color: 'gray',
          }}
          zIndexInverse={2000}
          open={openColor}
          value={valueColor}
          items={itemsColor}
          setOpen={setOpenColor}
          setValue={setValueColor}
          setItems={setItemsColor}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            justifyContent: 'space-between',
          }}>
          <View style={[styles.itemCheckBox, {}]}>
            <CheckBox
              style={{}}
              onCheckColor={'#ff6659'}
              onTintColor={'#ff6659'}
              boxType={'square'}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text style={styles.textCheckBox}>Dynamic</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'orange',
              paddingHorizontal: 4,
              borderRadius: 8,
            }}
            onPress={toggleSwitch}>
            <Text style={styles.textTitle}>Text Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 6,
          paddingTop: 6,
          justifyContent: 'space-between',
          borderTopColor: 'black',
          paddingHorizontal: 8,
          borderTopWidth: 1,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            paddingHorizontal: 4,
            borderRadius: 8,
          }}
          onPress={parseDataTimeMode}>
          <Text style={styles.textTitle}>Time Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            paddingHorizontal: 4,
            borderRadius: 8,
          }}
          onPress={parseDataWeatherMode}>
          <Text style={styles.textTitle}>Weather Mode</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  itemCheckBox: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
  textTitle: {fontSize: 14, padding: 8, fontWeight: 'bold'} as TextStyle,
  textCheckBox: {fontSize: 14, paddingHorizontal: 12},
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Main;