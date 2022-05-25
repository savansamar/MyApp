import { StyleSheet, Text, View,Image,TouchableOpacity,ImageBackground,Dimensions } from 'react-native'
import React from 'react'

const {height,width}=Dimensions.get('screen')
const imgUrl="https://static3.depositphotos.com/1005460/260/i/950/depositphotos_2605601-stock-photo-latest-news.jpg"

interface Posts{
url?:string,
title?:string,
item:any,
key:number,
}


export const Posts=(prop:any)=>{
    const {item}=prop
    return(
       <TouchableOpacity style={styles.container} onPress={prop.callBack}>
          <ImageBackground style={styles.imageBackground} source={{uri:imgUrl}}>
          <Text numberOfLines={2} style={{...styles.text,textAlign:"center"}} >
            {item.title}
        </Text> 
        </ImageBackground> 
        {/* */}
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        height:height*0.1,
        width:"100%",
        borderRadius:10,
        margin:5,
        alignSelf:"center",
        overflow:"hidden"
    },
    imageBackground:{
        height:"100%",
        width:"100%",
    },
    text:{
        fontSize:12,
        alignSelf:"center",
        position:"absolute",
        bottom:10,
        marginHorizontal:5
    }
})