import { View, Text, FlatList, TouchableOpacity, Alert,ActivityIndicator } from 'react-native'
import React, { useEffect, useState,Fragment } from 'react'
import { Colors } from '../constant/Colors'
import Normalize from "../utils/Dimens"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
import Button from '../component/Button';
export default function Home() {
  const navigation = useNavigation();

  const [productList, setProductList] = useState([])

  const ref = firestore().collection('product');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { name, image, offerPrice, price } = doc.data();
        list.push({
          id: doc.id,
          image: image,
          name: name,
          offerPrice: offerPrice,
          price: price
        });
      });

      setProductList(list);

      if (loading) {
        setLoading(false);
      }
    });


  }, []);
  const onpressDelete = (val) =>
    Alert.alert('Delete', 'Are you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteHandler(val) },
    ]);
  const deleteHandler = async (id) => {
    ref.doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
        Toast.show("Product Delete", Toast.LONG);

      });
  }
  return (
    <Fragment>
      {
        loading ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            <ActivityIndicator size="large" />
          </View>
          :
          <View style={{ flex: 1, backgroundColor: Colors.grayf8, padding: Normalize(15) }}>
            <Button
              title="Add Product"
              onpress={() => { navigation.navigate("AddProduct") }}
            />
            <View style={{ height: Normalize(10) }} />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={productList}
              renderItem={({ item, index }) => (
                <View key={index} style={{ flexDirection: "row", height: Normalize(95), width: "99%", alignSelf: "center", backgroundColor: Colors.white, borderRadius: Normalize(10), elevation: 2, padding: Normalize(8), marginBottom: 1 }} >
                  <View style={{ height: Normalize(74), width: Normalize(74), borderRadius: Normalize(10), backgroundColor: Colors.grayf8 }} ></View>
                  <View style={{ flex: 1, marginLeft: Normalize(8), justifyContent: "center" }} >
                    <Text numberOfLines={1} >{item.name}</Text>
                    <Text numberOfLines={1} >Offer Price :₹ {item.offerPrice}</Text>
                    <Text>Price: <Text style={{ textDecorationLine: "line-through" }} >₹ {item.price}</Text></Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }} >
                      <TouchableOpacity
                        onPress={() => navigation.navigate("EditProduct", { productDetails: item })}
                        style={{ backgroundColor: Colors.grayf5, borderRadius: Normalize(5), paddingVertical: Normalize(3), paddingHorizontal: Normalize(5), flexDirection: "row", alignItems: "center" }} >
                        <FontAwesome
                          name="edit"
                          size={Normalize(15)}
                          color={Colors.primary}
                        />
                        <Text style={{ paddingLeft: Normalize(3) }} >Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => onpressDelete(item.id)}
                        style={{ marginLeft: Normalize(8), backgroundColor: Colors.grayf5, borderRadius: Normalize(5), paddingVertical: Normalize(3), paddingHorizontal: Normalize(5), flexDirection: "row", alignItems: "center" }} >
                        <MaterialCommunityIcons
                          name="delete"
                          size={Normalize(15)}
                          color={Colors.primary}
                        />
                        <Text style={{ paddingLeft: Normalize(3) }} >Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => (
                <View style={{ height: Normalize(10) }} />
              )}
            />
          </View>
      }
    </Fragment>
  )
}