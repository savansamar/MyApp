import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import UseTextInput from '../Component/TextInput/UseTextInput'
import getApi from '../Api/GET'
import Loader from '../Component/Loader/Loader'

let url="https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0"

const Main = () => {

  //state
  const [posts,setPosts]=React.useState<[]>([])


  const callGetApi=()=>{
    let props={url:url}
    const response=(res:[])=>{
    }

    const error=(e:any)=>{
    }

    getApi(props)
    .then(res=>response(res))
    .catch(res=>error(res))
  }
  React.useEffect(()=>{
    callGetApi()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={true} />
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})