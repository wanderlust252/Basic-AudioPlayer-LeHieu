import { Dimensions, Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { FunctionComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CardDetailProps } from '@/navigation/types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SharedElement } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('window');
///
const IMAGE_HEIGHT = height * 0.4;
const CONTENT_HEIGHT = height * 0.6;
const CardDetail: FunctionComponent<CardDetailProps> = ({ route, navigation }) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{ flex: 1, backgroundColor: '#221F1F' }} showsVerticalScrollIndicator={false} bounces={false}>
        <View>
          <View>
            <SharedElement id={route.params.date}>
              <Image
                style={[{ width: '100%', height: IMAGE_HEIGHT }]}
                resizeMode={'cover'}
                source={route.params.poster}
              />
            </SharedElement>
          </View>
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
            <SafeAreaView>
              <FontAwesome
                onPress={() => {
                  navigation.goBack();
                }}
                name="close"
                size={36}
                color={'#fff'}
                style={{ alignSelf: 'flex-end', paddingHorizontal: 16 }}
              />
            </SafeAreaView>
          </View>
        </View>
        <View style={{ backgroundColor: '#221F1F', padding: 10, flex: 1 }}>
          <Text style={{ color: '#F5F5F1', fontSize: 24, fontWeight: 'bold', paddingVertical: 8, textAlign: 'center' }}>
            {route.params.title}
          </Text>
          <SafeAreaView style={{}}>
            <Text style={{ color: '#F5F5F1', fontSize: 18 }}>{route.params.subTitle}</Text>
          </SafeAreaView>
        </View>
      </ScrollView>
    </>
  );
};

export default CardDetail;
