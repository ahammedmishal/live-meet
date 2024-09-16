import {ActivityIndicator, Dimensions, View} from "react-native";
import AppColors from "../../assets/colors/AppColors";

export default function Loader({isLoading}) {
    return (<View style={{
        flex: 1,
        position: "absolute",
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 99,
        display: isLoading ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
    }}>
        <ActivityIndicator size={60} color={AppColors.pink}/>
    </View>)
}