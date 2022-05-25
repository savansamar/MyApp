import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { Posts } from '../List/Posts'

interface  Props{
  data:Array<any>,
  refresh:()=>void,
  callBack:(e:any)=>void
}

interface data{
  item:object,
  index:number
}

const MemorizedPost = React.memo((props:Props) => {


    const _renderItem=({item,index}:data)=>{
     return <Posts key={index} item={item} callBack={()=>props.callBack(item)} />
    }
    return (
      <View>
        <FlatList
            data={props.data}
            renderItem={_renderItem}
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
            onEndReached={props.refresh}
        />
      </View>
    )
  })
export default MemorizedPost

const styles = StyleSheet.create({
  columnWrapperStyle:
  {width:"45%",justifyContent:"space-between",},
  contentContainerStyle:{alignItems:"center"}


})