import {Redirect, Slot} from "expo-router";
import useAuthStore from "@/store/auth.store";

export default function _Layout() {

    const {isAuth} = useAuthStore();

    if (!isAuth) return <Redirect href={"./sign-in"}/>
    return (
        <Slot/>
    )
}