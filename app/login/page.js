'use client';
import React from 'react';
import TextBox from '../components/TextBox';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { UserCircle } from '@phosphor-icons/react/dist/ssr';

function Login() {
    const [signIn, toggle] = React.useState(true);

    const handleToggle = () => {
        toggle(prev => !prev);
    };
    const { register, formState: { errors } } = useForm()

    console.log(signIn, "signin")
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="rounded-lg shadow-lg relative overflow-hidden w-[1000px] max-w-full min-h-[500px] flex">
                {/* <!-- Left Part --> */}
                <div
                    className={`flex-1 p-8 space-y-6 transition-colors duration-300 ${signIn ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                    {signIn ? (
                        <div className='max-w-80 mx-auto flex flex-col items-center justify-center h-full space-y-6'>
                            <h2 className='text-3xl text-white'>Hello Friends!</h2>
                            <p className='text-base text-white text-center'> Enter your personal details and start your journey with us</p>
                            <button
                                onClick={handleToggle}
                                className={`w-1/2 py-2 border-2 ${!signIn ? 'text-gray-700 border-gray-700' : 'text-white  border-white'}  rounded-3xl bg-transparent`}
                            >
                                SIGN UP
                            </button>
                        </div>
                    ) : (
                        <div className='max-w-80 mx-auto flex flex-col items-center justify-center h-full space-y-6'>
                            <div className={`w-full flex flex-col items-center justify-center ${signIn ? 'text-gray-100' : 'text-gray-700'} text-3xl text-center`}>
                                <UserCircle size={50} />
                                <h2>Create Account</h2>
                            </div>
                            <div className='space-y-2 w-full'>
                                <TextBox register={register} name='email' label='Email' errors={errors} placeholder='Enter your email' />
                                <TextBox register={register} name='password' label='Password' errors={errors} placeholder='Enter your password' />
                            </div>
                            <div className='text-center w-full'>
                                <button
                                    onClick={handleToggle}
                                    className={`w-1/2 py-2 border-2 ${signIn ? 'text-white  border-white' : ' text-gray-700 border-gray-700'} rounded-full bg-transparent`}
                                >
                                    SIGN UP
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* <!-- Right Part --> */}
                <div
                    className={`flex-1 p-8 space-y-6 transition-colors duration-300 ${signIn ? 'bg-gray-100' : 'bg-gray-700'}`}
                >
                    {/* Content for the right side */}
                    {!signIn ? (
                        <div className='max-w-80 mx-auto flex flex-col items-center justify-center h-full space-y-6'>
                            <h2 className='text-3xl text-white'>Welcome Back!</h2>
                            <p className='text-base text-white text-center'> To keep connected with us please login with your personal info</p>
                            <button
                                onClick={handleToggle}
                                className={`w-1/2 py-2 border-2 ${signIn ? 'text-gray-700 border-gray-700' : 'text-white  border-white'}  rounded-full bg-transparent`}
                            >
                                LOGIN
                            </button>
                        </div>
                    ) : (
                        <div className='max-w-80 mx-auto flex flex-col items-center justify-center h-full space-y-6'>
                            <div className='w-full flex flex-col items-center justify-center text-gray-700 text-3xl text-center'>
                                <UserCircle size={50} />
                                <h2>Login Account</h2>
                            </div>
                            <div className='w-full space-y-2'>
                                <TextBox register={register} name='email' label='Email' errors={errors} placeholder='Enter your email' />
                                <TextBox register={register} name='password' label='Password' errors={errors} placeholder='Enter your Password' />
                            </div>

                            <div className='w-full text-center'>
                                <button
                                    onClick={handleToggle}
                                    className={`w-1/2 py-2 border-2 ${signIn ? 'text-gray-700 border-gray-700' : 'text-white  border-white'}  rounded-3xl bg-transparent`}
                                >
                                    LOGIN
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Login;