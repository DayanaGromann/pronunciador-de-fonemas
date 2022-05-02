import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';





export default class BotaoFonema extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            IndiceBotaoPressionado: ''
        }
    }

    reproduzirSom = async(fonema)=>{
        var URL = "https://s3-whitehatjrcontent.whjr.online/phones/"+ fonema +".mp3"
        await Audio.Sound.createAsync({uri: URL},{shouldPlay: true})
    }
    
    render(){
        return(
            <TouchableOpacity 
                style = {
                    this.props.indiceBotao === this.state.IndiceBotaoPressionado
                    ? [styles.chunkButton, {backgroundColor: "lightgrey"}]
                    : [styles.chunkButton, {backgroundColor: "red"}]
                }
                onPress = {() => {
                    this.setState({ IndiceBotaoPressionado: this.props.indiceBotao });
                    this.reproduzirSom(this.props.fonema) 
                }}>
                    
                <Text style={
                    this.props.indiceBotao === this.state.IndiceBotaoPressionado
                    ? [styles.displayText, { color: 'red' }]
                    : [styles.displayText, { color: 'white' }]
                }>
                    {this.props.parte}
                </Text>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    displayText: {
      textAlign: 'center',
      fontSize: 30,
      color: 'white',
    },
    chunkButton: {
      width: '60%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 10,
      margin: 5,
      backgroundColor: 'red',
    },
  });