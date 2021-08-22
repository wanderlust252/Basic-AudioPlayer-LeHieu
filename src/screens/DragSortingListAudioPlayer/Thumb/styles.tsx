import { Dimensions, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: { alignItems: 'center', marginTop: height / 8 },
  shadowImage: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textShadowColor: '#16213E',
    marginTop: 20,
    marginBottom: 5,
  },
  image: {
    height: height * 0.4,
    width: height * 0.3,
    resizeMode: 'cover',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artist: {
    fontSize: 16,
    color: 'white',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    textShadowColor: '#16213E',
  },
  textPicker: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
});
