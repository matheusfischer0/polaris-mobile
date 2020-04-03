import React from "react";
import { Feather } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";

import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;
  const message = `Olá ${product.name}, estou entrando em contato pois gostaria de comprar o produto ${product.description} pelo valor de ${product.value}`;

  function navigationBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Produto: ${product.name}`,
      recipients: [product.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${product.whatsapp}&text=${message}`
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <TouchableOpacity
          onPress={() => {
            navigationBack();
          }}
        >
          <Feather name="arrow-left" size={28} color="#e02041"></Feather>
        </TouchableOpacity>
      </View>

      <View style={styles.product}>
        <Text style={[styles.productProperty, { marginTop: 0 }]}>Produto:</Text>
        <Text style={styles.productValue}>{product.name}</Text>

        <Text style={styles.productProperty}>Descrição:</Text>
        <Text style={styles.productValue}>{product.description}</Text>

        <Text style={styles.productProperty}>Valor:</Text>
        <Text style={styles.productValue}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
          }).format(product.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.productText}>Gostou deste produto?</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
