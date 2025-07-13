import {Link, router, Slot} from "expo-router";
import {Alert, Text, View} from "react-native";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {useState} from "react";
import {createUser} from "@/lib/appwrite";


export default function SignUp() {

    const [isSubmit, setIsSubmit] = useState(false)
    const [form, setForm] = useState({name: "", email: "", password: ""})

    const handleSubmit = async () => {


        if (!form.name || !form.email || !form.password) return Alert.alert("Error", "Please enter  your name, email and password")

        setIsSubmit(true)

        try {
            // signUp function
            await createUser(form.email, form.password, form.name)
            router.replace("/")


        } catch (e: any) {
            Alert.alert("Error", e.message)
        } finally {
            setIsSubmit(false)
        }
    }

    return (
        <View className={"gap-10 bg-white rounded-lg p-5 mt-5"}>

            <CustomInput
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(text) => {
                    setForm((prev) => ({...prev, name: text}))
                }}
                label={'Full name'}
            />

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
                title="Sign Up"
                isLoading={isSubmit}
                onPress={handleSubmit}
            />
            <View className={"flex justify-center mt-5 flex-row gap-2"}>
                <Text className={"base-regular text-gray-100"}>Already have an account?</Text>
                <Link href={"/sign-in"} className={"base-bold text-primary"}>Sign In</Link>
            </View>

        </View>
    )
}