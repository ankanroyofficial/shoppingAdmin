import { View, Text, TouchableOpacity,Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../constant/Colors'
import Normalize from "../utils/Dimens"
export default function Button({ title, onpress }) {
    return (
        <Pressable
            // disabled={onpress ? false : true}
            onPress={onpress}
            style={{ height: Normalize(40), width: "100%", backgroundColor: Colors.secondary, borderRadius: Normalize(8), justifyContent: "center", alignItems: "center" }} >
            {title && <Text style={{ color: Colors.white, fontSize: Normalize(15), fontWeight: "bold" }} >{title}</Text>}
        </Pressable>
    )
}