import { StyleSheet, Text, TextInput, View,Dimensions,Image,TouchableOpacity} from 'react-native'
import React from 'react'

var {height,width}=Dimensions.get('screen')

type imgProps={
  icon?:string,
  callBack:(value:Array<string>)=>void
}

const ImageBox=(props:imgProps)=>{
  return(
    <TouchableOpacity onPress={()=>props.callBack(['1','2','3'])}>
          <Image source={{uri:props.icon}} resizeMode='cover' style={styles.img} />
      </TouchableOpacity>
  )
}


interface TextInputBox {
  children?:React.ReactNode,
  containerWidth?:string|number
}


const UseTextInput:React.FC<TextInputBox> = (props) => {

  const [icon,setIcon]=React.useState<string>('')

  React.useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/photos/1')
  .then(response => response.json())
  .then(json =>setIcon(json.thumbnailUrl))
  },[])

const onClickImage=()=>{
    
}

  return (
    <View style={{...styles.column}}>
      <Text>Title</Text>
      <View style={styles.row}>
       <ImageBox icon={icon} callBack={(e:Array<string>)=>console.log("e",e)} />
        <TextInput 
          style={styles.textInput}
          value=""
        />
       <ImageBox icon={icon} callBack={(e:Array<string>)=>console.log("e",e)} />
      </View>
      <Text>Error</Text>
    </View>
  )
}

export default UseTextInput

const styles = StyleSheet.create({
  textInput:{
    height:height*0.05,
    flexWrap:"wrap",
    flexGrow:1,
    maxWidth:'85%',
  },



  column:{
    backgroundColor:'white',
    width:"90%",
    alignSelf:"center"
  },
  row:{
    flexDirection:'row',
    borderWidth:1,
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:10,
    width:"100%"
  },
  img:{
      borderRadius:10,
      height:20,
      width:20,
      marginHorizontal:5
  }
})