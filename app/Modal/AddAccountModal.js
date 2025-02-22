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

const schema = yup.object().shape({
    amount: yup.number().positive("Amount must be positive").required("Amount is required"),
    description: yup.string().required("Description is required"),
    accountType: yup.string().required("Account Type is required"),
    accountName: yup.string().required("Account Name is required"),
    accountNumber: yup.string().required("Account Number is required"),
    currency: yup.string().required("Currency is required"),
    balance: yup.number().required("Balance is required"),
    iban: yup.string().nullable(),
    swiftCode: yup.string().nullable(),
    isDefault: yup.boolean(),
});

const AddAccountModal = () => {
    const { isOpen, handleClosed } = useExpenceContext();
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
            foreignDetails: {
                iban: data?.iban,
                swiftCode: data?.swiftCode
            },
        }
        try {
            const res = await createAccount(reqBody)
            success(res?.message)
            reset(); // Reset form after submission
            handleClosed(); // Close modal
        } catch (err) {
            error(err?.message)
        }

    };

    if (!isOpen) return null;

    return (
        <motion.div
            id="add-account-modal"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-[1000px]"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-950">Add Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Two fields per row using grid layout */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextBox register={register} name="amount" errors={errors} placeholder="Enter amount" />
                        <CustomSelect
                            name='accountType'
                            control={control}
                            options={accountTypeOptions}
                            error={errors?.accountType}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextBox register={register} name="accountName" errors={errors} placeholder="Enter account name" />
                        <TextBox register={register} name="accountNumber" errors={errors} placeholder="Enter account number" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextBox register={register} name="currency" errors={errors} placeholder="Enter currency" />
                        <TextBox register={register} name="balance" errors={errors} placeholder="Enter balance" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextBox register={register} name="iban" errors={errors} placeholder="Enter IBAN (optional)" />
                        <TextBox register={register} name="swiftCode" errors={errors} placeholder="Enter SWIFT Code (optional)" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" {...register("isDefault")} />
                        <span>Set as default</span>
                    </div>

                    <TextBox register={register} name="description" errors={errors} placeholder="Enter description" />

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

export default AddAccountModal;
