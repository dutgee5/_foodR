import {SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import {Slot} from "expo-router";
import {images} from "@/constants";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";

export default function _Layout() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView className={"bg-white h-full"} keyboardShouldPersistTaps={"handled"}>
                <View className={"w-full relative"} style={{height: Dimensions.get("screen").height / 2.25}}>
                    <ImageBackground source={images.loginGraphic} className={"size-full rounded-b-lg"}
                                     resizeMode={"stretch"}/>
                    <Image source={images.logo} className={"self-center size-48 absolute -bottom-16 z-10"}/>
                </View>

                <Slot/>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}