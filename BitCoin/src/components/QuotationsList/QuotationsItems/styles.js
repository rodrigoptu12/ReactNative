import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContent: {
    width: "95%",
    height: "auto",
    backgroundColor: "#000000",
    marginLeft: "3%",
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  dayCotation: {
    fontSize: 16,
    paddingLeft: 2,
    color: "#ffffff",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  price: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  contextLeft: {
    width: "36%",
    alignItems: "flex-start",
  },
  contextRigth: {
    width: "60%",
    alignItems: "flex-end",
  },
  logBitcoin: {
    width: 40,
    height: 40,
    marginLeft: 2,
  },
  boxLogo: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
