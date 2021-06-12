/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {PermissionsAndroid} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import navigationService from '../../navigation/navigation-service';
const Home = () => {
  const [ssid, setssid] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const navigation = useNavigation();
  useEffect(() => {
    const load = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required  ' +
            'to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // You can now use react-native-wifi-reborn
        WifiManager.loadWifiList().then(val => {
          console.log('val', val);
        });
      } else {
        // Permission denied
      }
    };
    load();
  }, []);
  const onConnect = () => {
    WifiManager.connectToProtectedSSID(ssid, pass, false).then(() => {
      Alert.alert('Thông báo', 'SUCCESS', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Main');
          },
        },
      ]);
    });
  };
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '80%', marginHorizontal: 100}}>
        <TextInput
          onChangeText={setssid}
          placeholder={'Nhập SSID'}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: 40,
            width: '100%',
          }}
        />
        <TextInput
          secureTextEntry
          onChangeText={setPass}
          placeholder={'Nhập Password'}
          style={{
            marginTop: 30,
            borderWidth: 1,
            borderColor: 'gray',
            height: 40,
            width: '100%',
          }}
        />
        <TouchableOpacity
          onPress={onConnect}
          style={{
            backgroundColor: 'orange',
            padding: 18,
            marginTop: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Connect</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
