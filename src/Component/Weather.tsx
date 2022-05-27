import { StyleSheet, Text, View,SafeAreaView,Image,ScrollView, Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackParam } from '../Navigation/Navigation'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
const {height,width}=Dimensions.get('screen')
const BACK_IMG="https://png.pngtree.com/png-vector/20190501/ourlarge/pngtree-vector-back-icon-png-image_1009850.jpg"

const Weather = () => {
    const route=useRoute<RouteProp<RootStackParam>>()
    const [data,setData]=React.useState<any>()
    const navigation=useNavigation()

    React.useEffect(()=>{
        setData(route?.params?.item)
    },[])

  return (
    <SafeAreaView style={styles.container}>
     <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor:"white"}}>
         <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()} >
                  <Image source={{uri:BACK_IMG}} style={styles.imgBack} />
        </TouchableOpacity>
     <Image 
        source={{uri:data?.current?.weather_icons[0]}}
        style={styles.img}
      />
      <View style={styles.section}>
        <View style={styles.row}>
            <Text style={styles.title}>Temperature</Text>
            <Text style={styles.text}>:  {data?.current.temperature}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.title} >Wind Speed</Text>
            <Text  style={styles.text} >:  {data?.current.wind_speed}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.title} >Precipe</Text>
            <Text  style={styles.text} >:  {data?.current.precip}</Text>
        </View>
      </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default Weather

const styles = StyleSheet.create({
    img:{
        height:height*0.4,
        width:'100%',
        resizeMode:"cover"
    },
    container:{
        flex:1,
        backgroundColor:"white"
    },
    back:{
        position:"absolute",
        top:5,
        left:5,
        zIndex:999,
    },
    imgBack:{
        height:30,
        width:30,
        borderRadius:30,
        
    },
    section:{
        backgroundColor:"white",
        margin:10
    },
    row:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        marginVertical:5,
        flex:1,
        paddingVertical:10,
        borderBottomWidth:0.4,
        paddingHorizontal:5
    },
    title:{
        fontSize:13,
        width:'30%'
    },
    text:{
        fontSize:12
    }
})