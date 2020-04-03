import { StyleSheet } from "react-native";

import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  product: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    marginTop: 48
  },
  productProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold",
    marginTop: 24
  },
  productValue: {
    marginTop: 8,
    fontSize: 15,
    color: "#737380"
  },
  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16
  },
  productText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#13131a",
    lineHeight: 30
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  action: {
    backgroundColor: "#e02041",
    height: 50,
    borderRadius: 8,
    width: "48%",
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  }
});
