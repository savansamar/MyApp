import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import getApi from '../Api/GET'
import Loader from '../Component/Loader/Loader'
import MemorizedPost from '../Component/FlatList/MemorizedPost'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {RootStackParam} from '../Navigation/Navigation'
import UseTextInput from '../Component/TextInput/UseTextInput'



interface Button {
  name:string,
  onClick:()=>void,
  disable?:boolean,
  color?:string
}

export const Button=(props:Button)=>{
  return(
    <TouchableOpacity disabled={props.disable} style={{...styles.button,backgroundColor:props.color}} onPress={props.onClick}>
      <Text style={{color:"white"}}>
        {props.name}
      </Text>
    </TouchableOpacity>
  )
}


const Main = () => {
  const navigation=useNavigation<NativeStackNavigationProp<RootStackParam>>()

  const [isLoading,setIsLoading]=React.useState<boolean>(false)
  const [Info,setInfo]=React.useState<any>('')
  const [id,setId]=React.useState<any>('')
  const [error,setError]=React.useState<any>()
  const [disable,setDisable]=React.useState<boolean>(true)

  const callGetApi=(urls:string)=>{
    setIsLoading(true)
    let props={url:urls}

    const response=(res:any)=>{
      setIsLoading(false)
        if(res.name==='SyntaxError'){
          setError("Id is not valid.")
        }
        else{
          setInfo(res)
        }
    }

    const error=(e:any)=>{
      setIsLoading(false)
      setId('')
      setError(false)
    }

    getApi(props)
    .then(res=>response(res))
    .catch(res=>error(res))
  }
  
  const getRandomId=()=>{
    setInfo('')
    setId('')
    setError(false)
    let urls:string="https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=OjB8w0fD7qKVIFmWlG3t13SvDmpowX1JLzP3iqxg"
    setIsLoading(true)
    let props={url:urls}


    const response=(res:any)=>{
      setIsLoading(false)
      let no= Math.floor(Math.random()*res.page.size)
      setId(res.near_earth_objects[no].id)
      setDisable(res.near_earth_objects[no].id.length>0?false:true)
    }

    const error=(e:any)=>{
      setIsLoading(false)
      setId('')
    }

    getApi(props)
    .then(res=>response(res))
    .catch(res=>error(res))
  }

  

  const onSubmit=()=>{
    let url =`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=OjB8w0fD7qKVIFmWlG3t13SvDmpowX1JLzP3iqxg`
    console.log("URl_",url)
    callGetApi(url)
  } 

const onChangeText=(e:any)=>{
  setError(false)
  if(e.length===0) {
    setDisable(true)
    setId(e)
    setInfo('')
  }
  else {
    setId(e)
    setDisable(false)
  }
}

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={isLoading} />
      <View style={{flex:1}}>
       
        <UseTextInput 
          value={id}
          onChangeText={onChangeText}
          container={{margin:10}}
          error={error}
        />
      <View style={{marginTop:20}}>
      <Button 
        disable={disable} 
        color="#E87461" 
        name='Submit' 
        onClick={onSubmit} 
      />
       <Button  color="#21D639" name='Random' onClick={getRandomId} />
      </View>
    
         {
           (!!id &&!!Info )
           &&
           <View style={styles.infoView}>
            <Text>Name : {Info?.name} </Text>
            <View style={styles.row}>
                <Text>Nasa Jpl Url : </Text>
                <Text>{Info?.nasa_jpl_url} </Text>
            </View>
            <Text>Is Potentially Hazardous Asteriod : {(Info?.is_potentially_hazardous_asteroid)?'Yes':"No"} </Text>
         </View>
         }
      </View>
    </SafeAreaView>
  )
}
export default Main

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  button:{
    width:"95%",
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center",
    height:40,
    backgroundColor:"#21D639",
    borderRadius:10,
    marginBottom:10
  },
  contentContainerStyle:{
    flex:1,
  },
  infoView:{
    width:"94%",
    borderWidth:0.2,
    alignSelf:"center",
    borderRadius:10,
    padding:10
    
  },
  row:{
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    width:Dimensions.get('screen').width/1.36,
    marginVertical:10
  }
})