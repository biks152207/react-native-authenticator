import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import { Styles } from '../../app/common/styles';

export const InputBox = (props) =>{
  return(
    <View>
    {props.title && <Text style={Styles.textStyle}>{props.title}</Text>}
    <TextInput autoCapitalize="none" style={Styles.inputStyle}  placeholder={props.placeholder} onChangeText={(text) => props.updateState(props.id, text)}/>
    </View>
  )
}
