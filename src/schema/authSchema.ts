import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().required('Email is required').email("Invalid email address"),
    password: Yup.string().required("Password is required"),
})

export const registerSchema = Yup.object({
    email: Yup.string().required('Email is required').email("Invalid email address"),
    password: Yup.string().required("Password is required"),
})

export const forgotPasswordSchema = Yup.object({
    email: Yup.string().required('Email is required').email("Invalid email address"),
})

export const verifyPasswordSchema = Yup.object({
    token: Yup.string().required("token is required"),
})