import { useNavigation, useRoute,RouteProp } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View,StatusBar,Dimensions,TouchableOpacity,Image, ImageBackground,Platform,ScrollView,FlatList} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {RootStackParam} from '../Navigation/Navigation'
import { SvgUri } from 'react-native-svg'
import Loader from '../Component/Loader/Loader'
import getApi from '../Api/GET'

const {height,width}=Dimensions.get('screen')
const TOP=Platform.OS ==='ios'? StatusBar.currentHeight||height*0.055:0
const BACK_IMG="https://png.pngtree.com/png-vector/20190501/ourlarge/pngtree-vector-back-icon-png-image_1009850.jpg"
const imgUrl="https://flagcdn.com/w320/np.png"



const Country = () => {

  const navigation=useNavigation<NativeStackNavigationProp<RootStackParam>>()
  const route=useRoute<RouteProp<RootStackParam>>()
  const [news ,setNews]=React.useState<any>({})
  const [isLoading,setIsLoading]=React.useState<boolean>(false)

  React.useEffect(()=>{
    let data=route?.params?.item
    setNews(data)
  },[])

const getWeatherInfo=(item:any)=>{
    setIsLoading(true)
    let urls=`http://api.weatherstack.com/current?access_key=4ab692e236ca05efb937c7c7f85da8e8&query=Kathmandu`
    console.log("RESS==",urls)
    let props={url:urls}
    getApi({ url:urls})
    .then(res=>{
        setIsLoading(false)
        navigation.navigate('Weather',{item:res})
    })
    .catch(e=>{
        console.log("ee+",e)
        setIsLoading(false)
    })
}

  return (
    <View style={styles.container}>
        <Loader isLoading={isLoading} />
       <TouchableOpacity style={styles.back} onPress={()=>navigation.goBack()} >
                  <Image source={{uri:BACK_IMG}} style={styles.img} />
                </TouchableOpacity>
      <FlatList
        data={news}
        renderItem={({item,index})=>{
            return(
                <TouchableOpacity style={styles.view}>
                <Image source={{uri:item?.flags?.png}} style={styles.ImageBackground} />
                
                  <View style={styles.section}>
                  <View style={styles.row}>
                    <Text style={{...styles.author,marginTop:5}}>Name : {item?.name}</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>getWeatherInfo(item)} >
                        <Text style={{fontSize:10,color:"white"}}>Capital Weather</Text>
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.author}>Population : {item?.population}</Text>
                   <View style={{flexDirection:"row",alignItems:"center",marginBottom:5}}>
                        <Text style={styles.author}>Latitude: {item?.population}</Text>
                        <Text style={{...styles.author,marginLeft:10}}>Longitude: {item?.population}</Text>
                   </View>

                  </View>
                  </TouchableOpacity>
            )
        }}
      />

    </View>
  )
}

export default Country

const styles = StyleSheet.create({
    back:{
        alignSelf:"flex-start",position:"absolute",top:5,left:5,zIndex:999
    },
  container:{
    flex:1,
    marginTop:TOP,
    backgroundColor:"white"
  },
  img:{
    height:30,
    width:30,
    resizeMode:"contain",
    borderRadius:30,
    margin:5
  },
  ImageBackground:{
    height:height*0.06,
    width:"13%",
    resizeMode:"cover",
    borderRadius:10,
    marginHorizontal:10
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
    marginBottom:5
  },
  section:{
    backgroundColor:"white",
    flex:1
    //borderRadius:30,
  },
  view:{
      borderRadius:10,
      margin:10,
      overflow:"hidden",
      shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.41,
    borderWidth:0.5,
    borderColor:"grey",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
  },
  button:{
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"green",
      borderRadius:4,padding:3,
      marginRight:5
  },
  row:{
      justifyContent:"space-between",
      flexDirection:"row",
    alignItems:"center",
  }
})