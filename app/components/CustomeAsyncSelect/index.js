import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

export default function CustomAsyncSelect({
    name,
    control,
    loadOptions,
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
                    <AsyncSelect
                        {...field}
                        loadOptions={loadOptions}
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
                    />
                )}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
