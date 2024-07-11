import AsyncStorage from "@react-native-async-storage/async-storage";

export const completeUserOnBoarding = (user_email: string) => {
    if (!user_email) return
    try {
        AsyncStorage.setItem(user_email, "true")
    } catch(e) {
        console.log(e)
    }
}

export const getUserOnBoardingStatus = async (user_email: string) => {
    if (!user_email) return null
    const status = await AsyncStorage.getItem(user_email)
    return !!status
}