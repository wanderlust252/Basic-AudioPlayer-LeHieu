import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E' },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  header: { alignItems: 'center', justifyContent: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-around' },
  footerButton: {
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: { fontSize: 16, color: 'white' },
});
