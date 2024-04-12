import { View, Image } from "react-native";
import logo from "../assets/airbnb-logo.png";

const HeaderLogo = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Image
        source={logo}
        style={{ width: 50, height: 75 }}
        resizeMode="contain"
      ></Image>
    </View>
  );
};
export default HeaderLogo;
