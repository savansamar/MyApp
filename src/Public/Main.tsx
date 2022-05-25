import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import getApi from '../Api/GET'
import Loader from '../Component/Loader/Loader'
import MemorizedPost from '../Component/FlatList/MemorizedPost'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {RootStackParam} from '../Navigation/Navigation'


let url="https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0"

const Main = () => {
  const navigation=useNavigation<NativeStackNavigationProp<RootStackParam>>()

  //state
  const [posts,setPosts]=React.useState<Array<string>>([])
  const [isLoading,setIsLoading]=React.useState<boolean>(false)


  const callGetApi=()=>{
    setIsLoading(true)
    let props={url:url}


    const response=(res:any)=>{
      setIsLoading(false)
     let data=[]
      data=[...res.hits]
      let update=[...posts,...data]
      setPosts(update)
    }

    const error=(e:any)=>{
      setIsLoading(false)
    }

    getApi(props)
    .then(res=>response(res))
    .catch(res=>error(res))
  }
  
  React.useEffect(()=>{
    callGetApi()
  },[])

  const _refresh=()=>{
    callGetApi()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={isLoading} />
      <View style={{flex:1}}>
        <MemorizedPost 
          data={posts} 
          refresh={_refresh} 
          callBack={(item)=>navigation.navigate("News",{item:item})} 
        />
      </View>
    </SafeAreaView>
  )
}
export default Main

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})