import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface api{
    url:string,
}

const getApi=async(props:api) => {


    return fetch(props.url)
    .then(res=>res.json())
    .then(res=>res)
    .catch(res=>res)
}

export default getApi
