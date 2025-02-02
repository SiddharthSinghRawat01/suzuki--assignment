import Link from 'next/link'; // ✅ Import Link from Next.js

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-100 p-5">
                <nav className="bg-white p-4 shadow-md mb-5">
                    <Link href="/" className="mr-4">Home</Link>
                    <Link href="/user/add" className="text-blue-600">Add User</Link>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
