"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { useExpenceContext } from "../Context/ExpenceContext";
import TextBox from "../components/TextBox";

const schema = yup.object().shape({
    amount: yup.number().positive("Amount must be positive").required("Amount is required"),
    category: yup.string().required("Category is required"),
    description: yup.string().required("Description is required")
});

const ExpenceModal = () => {
    const { isOpen, handleClosed } = useExpenceContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("Expense Added:", data);
        reset(); // Reset form after submission
        handleClosed(); // Close modal
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-96"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-950">Add Expense</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Amount Input */}
                    <div>
                        <TextBox
                            register={register}
                            name='amount'
                            errors={errors}
                        />
                    </div>

                    {/* Category Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            {...register("category")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md "
                        >
                            <option value="">Select Category</option>
                            <option value="food">Food</option>
                            <option value="transport">Transport</option>
                            <option value="entertainment">Entertainment</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register("description")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleClosed}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add Expense
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ExpenceModal;
