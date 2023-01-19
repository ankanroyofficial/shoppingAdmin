import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Normalize from "../utils/Dimens"
import { Colors } from '../constant/Colors'
import Button from '../component/Button'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
export default function SignUp() {
  const navigation = useNavigation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = () => {
    if (email == "") {
      return Toast.show("Enter Email", Toast.LONG);
    }
    if (password == "") {
      return Toast.show("Enter password", Toast.LONG);
    }
    if (password.length < 6) {
      return Toast.show("Enter minimun 6 characters password", Toast.LONG);
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate("Home")
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.grayf8, justifyContent: "center", alignItems: "center" }} >
      <View style={{ backgroundColor: Colors.white, elevation: 1, width: "80%", alignSelf: "center", padding: Normalize(10), borderRadius: Normalize(10) }} >
        <Text style={style.textinputHeader}>Email</Text>
        <View style={style.textinputbox} >
          <TextInput
            value={email}
            keyboardType="email-address"
            onChangeText={(e) => setEmail(e)}
            placeholder='Enter Email'
            style={style.textinput}
          />
        </View>
        <Text style={style.textinputHeader}>Password</Text>
        <View style={style.textinputbox} >
          <TextInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholder='Enter Password'
            style={style.textinput}
          />
        </View>
        <Button
          title={"Sign Up"}
          onpress={submitHandler}
        />
        <Text onPress={() => navigation.navigate("SignUp")} style={{ textAlign: "right", fontSize: Normalize(12), color: Colors.primary, fontWeight: "500", paddingVertical: Normalize(5), textDecorationLine: "underline" }} >Back to Login</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create(
  {
    textinputbox: { height: Normalize(40), width: "100%", backgroundColor: Colors.disable_textinput_background, borderColor: Colors.disable_textinput_border, borderWidth: 1, marginBottom: Normalize(10), borderRadius: Normalize(8) },
    textinput: { paddingHorizontal: Normalize(10), color: Colors.greyText },
    textinputHeader: { color: Colors.greylightText, fontSize: Normalize(12), fontWeight: "bold", paddingBottom: Normalize(3) },
  })