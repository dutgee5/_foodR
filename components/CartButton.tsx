import {Image, Text, TouchableOpacity, View} from "react-native";
import {images} from "@/constants";


const CartButton = () => {
    const total =0;

    return (
        <TouchableOpacity className={"cart-btn"} onPress={() => {
        }}>
            <Image source={images.bag} className={"size-5"} resizeMode={"contain"}/>
            {total > 0 && (
                <View className={"cart-badge"}>
                    <Text className={"small-bold text-white"}>{total}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
export default CartButton