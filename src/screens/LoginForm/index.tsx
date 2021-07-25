import React, { FunctionComponent } from 'react';
import { useRef } from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from './component/animatedButton';
import Input from './component/textInput';
const RED = '#d32f2f';
export interface Props {}

const LoginForm: FunctionComponent<Props> = () => {
  const usernameRef = useRef<TextInput & { textValue: string }>(null);
  const passwordRef = useRef<TextInput & { textValue: string }>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback style={{ height: '100%', width: '100%' }} onPressIn={Keyboard.dismiss}>
        <ImageBackground source={require('@/assets/image/backgroundLogin.jpeg')} style={styles.imageBG}>
          <View style={styles.viewUp}>
            <Image source={require('@/assets/image/logo_911.png')} style={styles.logo} />
            <Input index={0} iconName={'user'} title={'Tên đăng nhập'}>
              <TextInput
                ref={usernameRef}
                style={styles.inputView}
                autoCapitalize={'none'}
                onChangeText={(t) => {
                  if (usernameRef.current) {
                    usernameRef.current.textValue = t;
                  }
                }}
              />
            </Input>
            <Input index={1} iconName={'lock'} title={'Mật khẩu'}>
              <TextInput
                ref={passwordRef}
                style={styles.inputView}
                onChangeText={(t) => {
                  if (passwordRef.current) {
                    passwordRef.current.textValue = t;
                  }
                }}
                secureTextEntry
              />
            </Input>
            <Button index={2}>
              <TouchableOpacity style={[styles.buttonContainer]}>
                <View style={[styles.tittleForm]}>
                  <Text style={[styles.tittleStyle]}>{'ĐĂNG NHẬP'}</Text>
                </View>
              </TouchableOpacity>
            </Button>
            <Button index={3}>
              <TouchableOpacity>
                <Text style={styles.forgetPass}>{'Quên mật khẩu?'}</Text>
              </TouchableOpacity>
            </Button>
          </View>
          <View style={styles.viewFoot}>
            <Text style={styles.text}>{'COPYRIGHT'}</Text>
            <FontAwesome name={'copyright'} size={15} color="#fff" />
            <Text style={styles.text}>{'- Bản quyền thuộc về 911'}</Text>
          </View>
          <Text style={{ fontSize: 12, color: 'white', alignSelf: 'center' }}>Phiên bản 1.0.11</Text>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginForm;
const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    paddingHorizontal: 50,
  },
  text: {
    fontSize: 12,
    color: 'white',
    marginHorizontal: 4,
  },
  inputView: {
    // height: scale(50),
    paddingVertical: Platform.OS === 'android' ? 4 : 10,
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: RED,
  },
  viewUp: {
    flex: 20,
  },
  forgetPass: {
    fontSize: 14,
    color: RED,
    marginTop: 16,
    alignSelf: 'center',
  },
  viewFoot: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
  },
  buttonContainer: {
    backgroundColor: '#ffffff',
    // borderBottomWidth: 3,
    paddingVertical: 8,
    borderWidth: 0.7,
    borderColor: RED,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginBottom: 50,
  },
  tittleForm: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  tittleStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: RED,
  },
});
