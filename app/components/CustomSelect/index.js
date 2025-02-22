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
                        className={className}
                        classNamePrefix="react-select"
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                borderColor: error ? "#ef4444" : state.isFocused ? "#3b82f6" : "#d1d5db",
                                boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
                                "&:hover": { borderColor: error ? "#ef4444" : "#3b82f6" },
                            }),
                        }}
                        onChange={(selectedOption) => {
                            field.onChange(isMulti ? selectedOption : selectedOption?.value);
                        }}
                        value={options.find((option) => option.value === field.value)}
                    />
                )}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
