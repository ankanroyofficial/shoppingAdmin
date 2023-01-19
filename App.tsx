import { View, Text } from 'react-native'
import React from 'react'
import StackNavi from "./src/navigation/StackNavi"
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
export default function App() {
  return (
    <Provider store={store}>
      <StackNavi />
    </Provider>
  )
}