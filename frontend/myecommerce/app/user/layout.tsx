
export default function UserLayout ({ children}: { children: React.ReactNode}) {
    return (
        <div className="bg-gray-500 flex flex-col align-middle mx-auto h-screen w-[60%]">
            <h1>Welcome To Family Shop</h1>
            <p>Fill the form below to register your account</p>
            <main>{children}</main>
        </div>
    )
}