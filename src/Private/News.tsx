import { useNavigation, useRoute,RouteProp } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View,StatusBar,Dimensions,TouchableOpacity,Image, ImageBackground,ScrollView,Animated} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {RootStackParam} from '../Navigation/Navigation'



const {height,width}=Dimensions.get('screen')
const TOP=StatusBar.currentHeight||height*0.055
const BACK_IMG="https://png.pngtree.com/png-vector/20190501/ourlarge/pngtree-vector-back-icon-png-image_1009850.jpg"
const imgUrl="https://static3.depositphotos.com/1005460/260/i/950/depositphotos_2605601-stock-photo-latest-news.jpg"



const News = () => {

  const navigation=useNavigation()
  const route=useRoute<RouteProp<RootStackParam>>()
  const [news ,setNews]=React.useState<any>({})

  React.useEffect(()=>{
    let data=route?.params?.item
    setNews(data)
  },[])

  return (
    <View style={styles.container}>
      
      <Animated.ScrollView contentContainerStyle={styles.contentContainerStyle} >
      <ImageBackground source={{uri:imgUrl}} style={styles.ImageBackground}>
      <TouchableOpacity onPress={()=>navigation.goBack()} >
        <Image source={{uri:BACK_IMG}} style={styles.img} />
      </TouchableOpacity>
      </ImageBackground>
        <View style={styles.section}>
          <Text style={styles.title}>Title : {news?.title}</Text>
          <Text style={styles.author}>author : {news?._highlightResult?.author?.value}</Text>
        </View>
      </Animated.ScrollView>

    </View>
  )
}

export default News

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:TOP
  },
  img:{
    height:30,
    width:30,
    resizeMode:"contain",
    borderRadius:30,
    margin:5
  },
  ImageBackground:{
    height:height*0.45,
    width:"100%",
    resizeMode:"contain",
  },
  contentContainerStyle:{
    flexGrow:1,
    backgroundColor:"white"
  },
  title:{
    fontSize:15,
    marginTop:10,
  
  },
  author:{
    fontSize:13,
    marginVertical:5
  },
  section:{
    bottom:30,
    backgroundColor:"white",
    borderRadius:30,
    padding:20,flex:1
  }
})