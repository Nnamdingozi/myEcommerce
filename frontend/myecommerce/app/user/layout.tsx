
export default function UserLayout ({ children}: { children: React.ReactNode}) {
    return (
        <div className="flex flex-col align-middle mt-24 h-screen w-full text-center text-red-600">
            <div>
                <h1>Welcome To Family Shop</h1>
            <p>Fill the form below to register your account or Log in if you already have an account</p></div>
            
            <main className="mt-32">{children}</main>
        </div>
    )
}