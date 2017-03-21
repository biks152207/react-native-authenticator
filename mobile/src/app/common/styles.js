import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1
  },
  innerView: {
    flex: 1,
    marginTop: 30
  },
  textStyle:{
    height: 20,
    color: 'grey',
    paddingBottom: 30,
    fontWeight: 'bold'
  },
  inputStyle:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  testButton: {
    height: 36,
    backgroundColor: 'silver',
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  progress:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
