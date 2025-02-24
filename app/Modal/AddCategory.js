"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useExpenceContext } from "../Context/ExpenceContext";
import TextBox from "../components/TextBox";
import CustomSelect from "../components/CustomSelect";
import { accountTypeOptions } from "../account/const";
import { createAccount } from "../service/account.service";
import { useToast } from "../Context/TosterProvider";
import storage from "@/utils/storage";
import { useAppContext } from "../Context/AppContext";
import { createCategory } from "../service/category.service";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    icon: yup.string().required("Icon is required"),
});

const AddCategoryModal = () => {
    // const { isOpen, handleClosed } = useExpenceContext();
    const {isAddCat,setIsAddCat}=useAppContext()
    const { success, error } = useToast()
    const defaultValues = {
        currency: '₹'
    }

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema), mode: 'onChange'
    });

    const userData = storage.getUser()

    const onSubmit = async (data) => {
        const reqBody = {
            ...data,
            userId: userData?.user?._id,
            parentCategory: null,
            type:'custom'
        }
        try {
            const res = await createCategory(reqBody)
            success(res?.message)
            reset(); // Reset form after submission
            setIsAddCat(false); // Close modal
        } catch (err) {
            error(err?.message)
        }

    };

    if (!isAddCat) return null;

    return (
        <motion.div
            id="add-account-modal"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-[500px]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-950">Add Category</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Two fields per row using grid layout */}

                    <div className="my-2 gap-4">
                        <TextBox register={register} name="name" errors={errors} placeholder="Enter Category name" />
                        <TextBox register={register} name="icon" errors={errors} placeholder="Emoji (optional)" />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={()=>setIsAddCat(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add Category
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddCategoryModal;
