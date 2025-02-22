import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import TextBox from "../TextBox";
import AvatarUpload from "../UploadAvatar";
import { createUser } from "@/app/service/user.service";
import { useToast } from "@/app/Context/TosterProvider";

// Validation Schema
const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required").min(3, "Too short"),
    email: yup.string().email("Invalid email").required("Email is required"),
    username: yup.string().required("Username is required").min(3, "Too short"),
    password: yup.string().required("Password is required").min(6, "Must be at least 6 characters"),
    avatar: yup
        .mixed()
        .test("fileRequired", "Avatar is required", (value) => value && value.length > 0),
});

const SignupForm = () => {
    const methods = useForm({
        resolver: yupResolver(schema),
    });
    const { success, error } = useToast();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = methods;

    const onSubmit = async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "avatar" && value?.length > 0) {
                formData.set(key, value[0]); // Ensure we send the first file object
            } else {
                formData.set(key, value);
            }
        });

        try {
            const res = await createUser(formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Success:", res);
            success(res?.message)
            reset()
        } catch (err) {
            console.log(err, "err")
            error(err.message)
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
                {/* Avatar Upload with Validation */}
                <AvatarUpload setValue={setValue} error={errors.avatar} />
                <TextBox register={register} name="fullName" errors={errors} placeholder="Full Name" />
                <TextBox register={register} name="username" errors={errors} placeholder="User Name" />
                <TextBox register={register} name="email" errors={errors} placeholder="Enter your email" />
                <TextBox register={register} name="password" errors={errors} type="password" placeholder="Enter your password" />
                <div className="text-center w-full">
                    <button
                        type="submit"
                        className="w-1/2 py-2 border-2 text-gray-700 border-gray-700 rounded-lg bg-transparent"
                    >
                        SIGN UP
                    </button>
                </div>
            </form>
        </FormProvider>
    );
};

export default SignupForm;
