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
  containerWidth?:string|number,
  leftIcon?:string,
  rightIon?:string,
  title?:string,
  error?:string,
  onChangeText?:(e:any)=>void,
  value:string,
  container?:any
}


const UseTextInput:React.FC<TextInputBox> = React.memo((props) => {

  const [icon,setIcon]=React.useState<string>('')

  React.useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/photos/1')
  .then(response => response.json())
  .then(json =>setIcon(json.thumbnailUrl))
  },[])


  return (
    <View style={{...styles.column,...props.container}}>
      {props.title && <Text>Title</Text>}

      <View style={styles.row}>
      
      {props.leftIcon && <ImageBox icon={icon} callBack={(e:Array<string>)=>console.log("e",e)} />}
      
        <View style={styles.section}>
          <TextInput 
            style={styles.textInput}
            value={props.value}
            onChangeText={props.onChangeText}
            keyboardType='number-pad'
          />
        </View>
      
       {props.rightIon &&<ImageBox icon={icon} callBack={(e:Array<string>)=>console.log("e",e)} />}
      
      </View>
      {props.error &&  <Text style={{color:"red",fontSize:12,marginLeft:5}} >{props?.error}</Text>}
    </View>
  )
})

export default UseTextInput

const styles = StyleSheet.create({

  section:{
    flex:1,
    overflow:"hidden"
  },

  textInput:{
    height:height*0.05,
    paddingHorizontal:5
  },



  column:{
    backgroundColor:'white',
    height:height*0.05,
  },
  row:{
    flexDirection:'row',
    borderWidth:0.3,
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:10,
    overflow:"hidden"
    //width:"100%",
  },
  img:{
      borderRadius:10,
      height:20,
      width:20,
      marginHorizontal:5
  }
})