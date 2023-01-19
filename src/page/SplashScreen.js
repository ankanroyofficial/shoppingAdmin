import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
export default function SplashScreen() {

  const navigation = useNavigation()

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      gotoLogin()
    }, 2000);
  }, []);

  const gotoLogin = () => {
    if (!user) {
      navigation.navigate("Login")
    } else {
      navigation.navigate("Home")
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <Text style={{ fontSize: 20 }} >SplashScreen</Text>
    </View>
  )
}