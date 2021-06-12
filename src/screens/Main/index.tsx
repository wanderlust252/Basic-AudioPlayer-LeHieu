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
const Main = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabledClockMode1, setIsEnabledClockMode1] = useState(false);
  const toggleSwitchClockMode1 = () =>
    setIsEnabledClockMode1(previousState => !previousState);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isEnabledClockMode2, setIsEnabledClockMode2] = useState(false);
  const toggleSwitchClockMode2 = () =>
    setIsEnabledClockMode2(previousState => !previousState);
  const [checked, setChecked] = React.useState('first');
  const [line, setLine] = useState('');
  const [openSpeed, setOpenSpeed] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [value, setValue] = useState(null);
  const [valueSpeed, setValueSpeed] = useState(null);
  const [valueColor, setValueColor] = useState(null);
  const [itemsColor, setItemsColor] = useState([
    {label: 'Red', value: 'R'},
    {label: 'Blue', value: 'B'},
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
          onPress={toggleSwitch}>
          <Text style={styles.textTitle}>Clock Mode 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            paddingHorizontal: 4,
            borderRadius: 8,
          }}
          onPress={toggleSwitch}>
          <Text style={styles.textTitle}>Clock Mode 2</Text>
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
