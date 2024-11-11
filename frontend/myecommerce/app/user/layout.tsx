
export default function UserLayout ({ children}: { children: React.ReactNode}) {
    return (
        <div className="flex flex-col align-middle mt-24 h-auto w-full text-center text-red-600 bg-gray-100 font-serif font-bold">
            <div>
                <h1>Welcome To Family Shop</h1>
            <p>Fill the form below to register your account. Click log in if you already have an account </p></div>
            
            <main className="mt-10 h-auto ">{children}</main>
        </div>
    )
}