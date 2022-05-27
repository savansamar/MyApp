import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'

interface Loader{
  isLoading:boolean
}

const Loader:React.FC<Loader> = (props) => {
  return (
    <View style={styles.container}>
     
    </View>
  )
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
    backgroundColor:'rgba(210,210,10,0.3)'
  }
})