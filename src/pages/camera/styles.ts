import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 260,
    height: 260,
    borderWidth: 2,
    borderColor: '#ffff',
    borderRadius: 12,
  },
  span: {
    marginTop: 16,
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
