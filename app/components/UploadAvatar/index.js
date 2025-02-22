import React, { useState } from "react";
import { Camera } from "lucide-react"; // Install lucide-react for icons
import { useFormContext } from "react-hook-form";
import Image from "next/image";

const AvatarUpload = ({ setValue, error }) => {
    const [preview, setPreview] = useState(null);
    const { register, setError, clearErrors } = useFormContext(); // Get form context

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setValue("avatar", [file], { shouldValidate: true });
            clearErrors("avatar"); // Clear error when file is selected
        } else {
            setError("avatar", { message: "Avatar is required" });
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* Avatar Container */}
            <div className="relative w-20 h-20">
                <input
                    type="file"
                    accept="image/*"
                    {...register("avatar")}
                    onChange={handleImageChange}
                    className="hidden"
                    id="avatarUpload"
                />
                <label htmlFor="avatarUpload" className="cursor-pointer">
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Avatar Preview"
                            width={80}
                            height={80}
                            className="rounded-full border-2 border-gray-300 object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 border-2 border-gray-300">
                            <Camera size={24} className="text-gray-500" />
                        </div>
                    )}
                </label>

                {/* Camera Icon Button to Change Image */}
                {preview && (
                    <label
                        htmlFor="avatarUpload"
                        className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer"
                    >
                        <Camera size={16} />
                    </label>
                )}
            </div>

            {/* Show Error if No Avatar is Uploaded */}
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default AvatarUpload;
