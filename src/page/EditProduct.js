import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Normalize from "../utils/Dimens"
import { Colors } from '../constant/Colors'
import Button from '../component/Button'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import storage from "@react-native-firebase/storage"

export default function EditProduct(props) {
  const navigation = useNavigation()

  const { productDetails } = props.route.params

  const ref = firestore().collection('product');

  const [productName, setProductName] = useState(productDetails.name)
  const [productPrice, setProductPrice] = useState(productDetails.price)
  const [productOfferPrice, setProductOfferPrice] = useState(productDetails.offerPrice)
  const [productImageDetails, setProductImageDetails] = useState(null)
  const [localImage, setLocalImage] = useState(null)





  const imageSelect = async () => {
    try {
      launchImageLibrary({ mediaType: 'photo' }, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log(response)
          setLocalImage(response.assets[0].uri);
          setProductImageDetails(response.assets[0]);

          // const task = storage()
          //   .ref(response.assets[0].fileName)
          //   .putFile(response.assets[0].uri)
          //   .getDownloadURL()

          // console.log(task)


        }
      });
    } catch (error) {
      console.log("imageSelect", error)
    }
  };


  const submitHandler = () => {
    try {
      if (productName == "") {
        return Toast.show("Enter Product name", Toast.LONG);
      }
      if (productPrice == "") {
        return Toast.show("Enter Product price", Toast.LONG);
      }
      if (productOfferPrice == "") {
        return Toast.show("Enter Product offer price", Toast.LONG);
      }


      ref.doc(productDetails.id)
        .update({
          name: productName,
          price: productPrice,
          offerPrice: productOfferPrice,
          image: "https://img.freepik.com/premium-photo/ripe-mango-with-green-leaf-isolated-white_252965-183.jpg?w=2000"
        })
        .then(() => {
          Toast.show("Sucessfully product Edited", Toast.LONG);
          navigation.goBack()
          // console.log(">>>>", res);
        });

    } catch (error) {
      console.log("submitHandler", error)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.grayf8, justifyContent: "center", alignItems: "center" }} >
      <View style={{ backgroundColor: Colors.white, elevation: 1, width: "80%", alignSelf: "center", padding: Normalize(10), borderRadius: Normalize(10) }} >
        <Text style={[style.textinputHeader, { fontSize: Normalize(16), textAlign: "center", marginBottom: Normalize(20) }]}>Product Details</Text>
        <Text style={style.textinputHeader}>Edit Product Name</Text>
        <View style={style.textinputbox} >
          <TextInput
            value={productName}
            onChangeText={(e) => setProductName(e)}
            placeholder='Enter Product Name'
            style={style.textinput}
          />
        </View>
        {/*Price */}
        <Text style={style.textinputHeader}>Product Price</Text>
        <View style={style.textinputbox} >
          <TextInput
            keyboardType="number-pad"
            value={productPrice}
            onChangeText={(e) => setProductPrice(e)}
            placeholder='Enter Price'
            style={style.textinput}
          />
        </View>

        {/* offer Price */}
        <Text style={style.textinputHeader}>Product offer Price</Text>
        <View style={style.textinputbox} >
          <TextInput
            keyboardType="number-pad"
            value={productOfferPrice}
            onChangeText={(e) => setProductOfferPrice(e)}
            placeholder='Enter offer Price'
            style={style.textinput}
          />
        </View>
        {/* product image */}
        <View style={{ height: Normalize(82), width: Normalize(82), borderRadius: Normalize(10), backgroundColor: Colors.grayf8, marginBottom: Normalize(20) }} >

          {localImage != null && <Image
            source={{ uri: localImage }}
            style={{ height: "100%", width: "100%", resizeMode: "cover" }} />}


          <TouchableOpacity
            onPress={imageSelect}
            style={{ height: Normalize(20), width: Normalize(20), borderRadius: Normalize(20) / 2, backgroundColor: Colors.secondary, position: "absolute", bottom: -2, right: -8, justifyContent: "center", alignItems: "center" }}>
            <MaterialIcons
              name="add"
              size={Normalize(15)}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
        <Button
          title={"Submit"}
          onpress={submitHandler}
        />
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