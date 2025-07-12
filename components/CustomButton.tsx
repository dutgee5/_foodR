import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import React from 'react'
import cn from "clsx";


interface CustomButtonProps {

    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
}

const CustomButton = ({
                          onPress,
                          title = "Click me",
                          style,
                          leftIcon,
                          textStyle,
                          isLoading = false
                      }: CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
            {leftIcon}

            <View className={"flex-center flex-row"}>

                {isLoading ?
                    (<ActivityIndicator size={"small"} color={"white"}/>)
                    :
                    (<Text className={cn('text-white-100 paragraph-semibold', textStyle)}>{title}</Text>)
                }

            </View>
        </TouchableOpacity>
    )
}
export default CustomButton

