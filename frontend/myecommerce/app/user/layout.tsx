
export default function UserLayout ({ children}: { children: React.ReactNode}) {
    return (
        <div className="flex flex-col align-middle mx-auto h-screen w-full text-center text-red-600">
            <div>
                <h1>Welcome To Family Shop</h1>
            <p>Fill the form below to register your account</p></div>
            
            <main className="mt-32">{children}</main>
        </div>
    )
}