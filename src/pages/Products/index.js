import React, { useState, useEffect } from "react";

import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";

import logoImg from "../../assets/logo.png";

import styles from "./styles";
import api from "../../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(product) {
    navigation.navigate("Detail", { product });
  }
  async function loadProducts() {
    if (loading) {
      return;
    }
    if (total > 0 && products.length == total) {
      return;
    }
    setLoading(true);

    const response = await api.get("products", { params: { page } });

    setProducts([...products, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <Text style={styles.headerText}>
          Total de produtos:{" "}
          <Text style={styles.headerTextBold}>{total} produtos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>
        Escolha um os produtos abaixo e acrescente valor a sua loja
      </Text>

      <FlatList
        data={products}
        style={styles.productsList}
        keyExtractor={product => String(product.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadProducts}
        onEndReachedThreshold={0.2}
        renderItem={({ item: product }) => (
          <View style={styles.product}>
            <Text style={styles.productProperty}>Produto:</Text>
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
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => {
                navigateToDetail(product);
              }}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
