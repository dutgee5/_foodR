import {Link, Slot} from "expo-router";
import {Alert, Text, View} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {useState} from "react";


export default function SignIn() {

    const [isSubmit, setIsSubmit] = useState(false)
    const [form, setForm] = useState({email: "", password: ""})

    const handleSubmit = async () => {
        if (!form.email || !form.password) Alert.alert("Error", "Pleae check your email and password")

        setIsSubmit(true)

        try {
            // signIn function
        } catch (e: any) {
            Alert.alert("Error", e.message)
        } finally {
            setIsSubmit(false)
        }
    }

    return (
        <View className={"gap-10 bg-white rounded-lg p-5 mt-5"}>

            <CustomInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text) => {
                    setForm((prev) => ({...prev, email: text}))
                }}
                label={'Email'}
                keyboardType="email-address"
            />


            <CustomInput
                placeholder={"Enter your password"}
                value={form.password}
                onChangeText={(text) => {
                    setForm((prev) => ({...prev, password: text}))
                }}
                secureTextEntry={true}
                label={"Password"}
            />

            <CustomButton
                title="Sign In"
                isLoading={isSubmit}
                onPress={handleSubmit}
            />
            <View className={"flex justify-center mt-5 flex-row gap-2"}>
                <Text className={"base-regular text-gray-100"}>Don't have an account?</Text>
                <Link href={"/sign-up"} className={"base-bold text-primary"}>Sign Up</Link>
            </View>
        </View>
    )
}