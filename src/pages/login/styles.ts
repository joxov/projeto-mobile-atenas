import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boxTop: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  boxMid: {
    height: Dimensions.get("window").height / 4,
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 37,
  },
  boxBottom: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 30,
  },
  logo: {
    width: 380,
    height: 220,
  },
  forgetPassword: {
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  boxInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: themas.colors.grey,
    borderRadius: 20,
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    height: "100%",
    width: "100%",
    borderRadius: 40,
    paddingHorizontal: 20,
  },
  button: {
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themas.colors.secondary,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textButton: {
    color: themas.colors.primary,
  },
});
