import { Image, ImageURISource, Text, TouchableOpacity, View } from 'react-native';
import React, { FunctionComponent } from 'react';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Props = {
  onPick?: () => void;
  source: ImageURISource;
  title: string;
  artist: string;
};
const Thumb: FunctionComponent<Props> = ({ source, artist, title, onPick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.shadowImage}>
        {source && source.uri ? (
          <Image style={[styles.image]} source={source} />
        ) : (
          <TouchableOpacity onPress={onPick} style={styles.image}>
            <FontAwesome5 name={'plus'} size={30} />
            <Text style={styles.textPicker}>Chọn bài</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
    </View>
  );
};
export default Thumb;
