import * as React from 'react';
import {
  Text, 
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Alert
} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from "react-native-safe-area-context";
import db from "./localDB";
import BotaoFonema from './componentes/BotaoFonema';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      text: "",
      partes: [],
      sonsFonemas: []
    }
  }

  render(){
    return (
      <SafeAreaProvider>
        <View style = {styles.container}>
          <Header
            backgroundColor={'#9c8210'}
            centerComponent = {{
              text: 'Macaquinho fofinho',
              style: {color: '#fff', fontSize: 20}
            }}
          />

          <Image
            style={styles.imageIcon}
            source={{
              uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
            }}
          />

         

          <TextInput
            onChangeText={text => this.setState({text: text})}
            value = {this.state.text}
            style = {styles.inputBox}
          />
          <TouchableOpacity
            style = {styles.goButton}
            onPress = {()=> {
              var palavra = this.state.text.toLowerCase().trim()
              db[palavra]?(
                this.setState({partes: db[palavra].chunks}),
                this.setState({sonsFonemas: db[palavra].phones})
              ):
              (
                Alert.alert("A palavra não existe em nosso banco de dados!")
              )
            }}
          >
            <Text>Confirmar</Text>
          </TouchableOpacity>
          <View>
            {this.state.partes.map((item, indice)=>{
              return(
                <BotaoFonema 
                  parte = {this.state.partes[indice]}
                  fonema = {this.state.sonsFonemas[indice]}
                  indiceBotao={indice}
                />
              )
            })}
          </View>
          <Text>{this.state.displayText}</Text>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  inputBox: {
    marginTop: 100,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 25,
    marginLeft: '30%'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 120,
    marginTop: 50
  }
});
