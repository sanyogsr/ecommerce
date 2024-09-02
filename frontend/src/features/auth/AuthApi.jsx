import {axiosi} from '../../config/axios'

export const signup=async(cred)=>{
    try {
        console.log("Login credentials:", cred);
        const res=await axiosi.post("auth/signup",cred)
        console.log('Response:', res); // Log the response to see its structure

        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const login=async(cred)=>{
    try {
    
        const res=await axiosi.post("/auth/login",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const verifyOtp=async(cred)=>{
    try {
        const res=await axiosi.post("auth/verify-email",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const resendOtp=async(cred)=>{
    try {
        console.log(cred)
        const res=await axiosi.post("auth/resend-otp",cred)
        console.log(res)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const forgotPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/forgot-password",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const resetPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/reset-password",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const checkAuth=async(cred)=>{
    try {
     console.log(`cred : ${cred}`);
        const res=await axiosi.get("auth/check-auth")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const logout=async()=>{
    try {
        const res=await axiosi.get("auth/logout")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}