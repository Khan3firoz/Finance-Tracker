const SelectDropdown = ({ label, value, options, onChange }) => {
    return (
        <div className="flex items-center justify-between w-full dark:text-white">
            <label className="mr-2 text-lg font-medium">{label}</label>
            <select
                className="p-2 rounded-md dark:border-gray-600 bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white"
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectDropdown;
