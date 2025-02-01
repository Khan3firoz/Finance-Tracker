// pages/404.js
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-700 text-center p-4">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-2xl text-white mb-8">Oops! Page Not Found</p>
            {/* <Image
                src="/404.j"
                alt="Not Found"
                width={400}
                height={300}
                className="mb-8"
            /> */}
            <p className="text-white mb-8">
                {`The page you're looking for doesn't exist or has been moved.`}
            </p>
            <Link
                href="/"
                className="px-6 py-3  text-gray-700 bg-white rounded-full  transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
}