'use client'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./form.css"; // Import the CSS file

// Validation schema using Yup
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    agree: yup.boolean().oneOf([true], "You must agree to the terms"),
});

const FormComponent = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data) => {
        alert("Form Submitted Successfully!\n" + JSON.stringify(data, null, 2));
    };

    return (
        <div className="container">
            <svg viewBox="0 0 1000 1000">
                <circle cx="500" cy="500" r="400" />
            </svg>
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div className="form-row">
                        <input
                            type="text"
                            placeholder="Your Name"
                            {...register("name")}
                            className={errors.name ? "error" : "valid"}
                        />
                        {errors.name && <p className="error-text">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="form-row">
                        <input
                            type="email"
                            placeholder="Your Email"
                            {...register("email")}
                            className={errors.email ? "error" : "valid"}
                        />
                        {errors.email && <p className="error-text">{errors.email.message}</p>}
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="form-row">
                        <label>
                            <input type="checkbox" {...register("agree")} />
                            I agree to the terms
                        </label>
                        {errors.agree && <p className="error-text">{errors.agree.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="form-row">
                        <input
                            type="submit"
                            value="Submit"
                            disabled={!isValid}
                            className={isValid ? "valid" : ""}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;
