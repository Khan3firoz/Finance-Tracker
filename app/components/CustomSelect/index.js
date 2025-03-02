'use client'
import { Controller } from "react-hook-form";
import Select from "react-select";

export default function CustomSelect({
    name,
    control,
    options,
    label,
    placeholder = "Select an option",
    className,
    error,
    isMulti = false,
}) {
    return (
        <div className="w-full">
            {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={options}
                        isMulti={isMulti}
                        placeholder={placeholder}
                        className={`${className} rounded-xl`}
                        classNamePrefix="react-select"
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                borderColor: '#e5e7eb', // gray-300 default
                                borderWidth: "2px",
                                boxShadow: state.isFocused ? "0 0 0 0.1px #374151" : "none",
                                outline: "none",
                                borderRadius: "8px",
                                "&:hover": { borderColor: error ? "#ef4444" : "#9ca3af" }, // gray-400 on hover
                            }),
                            option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isSelected ? "#374151" : isFocused ? "#e5e7eb" : "white", // gray-200 on hover
                                color: isSelected ? "#ffffff" : "#374151", // gray-800 for selected, gray-700 default
                                "&:hover": { backgroundColor: "#e5e7eb", color: "#374151" }, // gray-200 background, gray-700 text
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: "#1f2937", // gray-800 text for selected value
                            }),
                            multiValueLabel: (base) => ({
                                ...base,
                                color: "#1f2937", // gray-800 for multi-selected labels
                            }),
                        }}
                        onChange={(selectedOption) => {
                            field.onChange(isMulti ? selectedOption : selectedOption?.value);
                        }}
                        value={isMulti ? field.value : options?.find((option) => option.value === field.value)}
                    />
                )}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
