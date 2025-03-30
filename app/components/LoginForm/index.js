import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { UserCircle } from "@phosphor-icons/react";
import TextBox from "../TextBox";
import { loginUser } from "@/app/service/user.service";
import storage from "@/utils/storage";
import { useToast } from "@/app/Context/TosterProvider";
import { useRouter } from "next/navigation";

// ✅ Define Validation Schema
const schema = Yup.object().shape({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string()
        .min(5, "Password must be at least 6 characters")
        .required("Password is required"),
});

function LoginForm() {
    const { success, error } = useToast()
    const routes=useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), // ✅ Apply Yup validation
    });

    // ✅ Handle form submission
    const onSubmit = async (data) => {
        try {
            const res = await loginUser(data)
            const token = res?.data?.accessToken
            storage.setToken(token)
            storage.setUser(res?.data?.user)
            routes.push('/')
            success(res?.message)
        } catch (err) {
            error(err?.message)
            console.log(err,"error")
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-80 mx-auto flex flex-col items-center justify-center h-full space-y-6"
        >
            <div className="w-full flex flex-col items-center justify-center text-gray-700 text-3xl text-center">
                <UserCircle size={50} />
                <h2>Login Account</h2>
            </div>

            <div className="w-full space-y-6">
                <TextBox
                    register={register}
                    name="username"
                    errors={errors}
                    placeholder="Enter your username"
                />
                <TextBox
                    register={register}
                    name="password"
                    errors={errors}
                    placeholder="Enter your password"
                    type="password"
                />
            </div>

            <div className="w-full text-center">
                <button
                    type="submit"
                    className="w-1/2 py-2 border-2 text-gray-700 border-gray-300 rounded-lg bg-transparent"
                >
                    LOGIN
                </button>
            </div>
        </form>
    );
}

export default LoginForm;
