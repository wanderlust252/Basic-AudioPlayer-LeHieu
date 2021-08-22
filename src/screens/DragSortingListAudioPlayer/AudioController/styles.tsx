import { Dimensions, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: { paddingHorizontal: 20 },
  text: { color: '#fff', fontSize: 16 },
  timeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
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
  sliderShadow: {
    shadowColor: '#3DB2FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  slider: { width: '100%', height: 40 },
  controller: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 },
});
