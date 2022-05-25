import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'

interface Loader{
  isLoading:boolean
}

const Loader= (props:Loader) => {
  if(!!props.isLoading){
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'small'} color='red' />
      </View>
    )
  }
  else {
    return null
  }
}

export default Loader

const styles = StyleSheet.create({
  container:{
    position:"absolute",
    flex:1,
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'rgba(210,210,210,0.6)',
    zIndex:9999,
    justifyContent:"center",
    alignItems:"center"
  }
})