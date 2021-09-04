import { StyleSheet } from 'react-native';
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  title: {
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    color: '#fff',
  },
  subTitle: {
    fontSize: 14,
    width: '60%',
    color: '#fff',
  },
  date: {
    fontSize: 12,
    color: '#fff',
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});
