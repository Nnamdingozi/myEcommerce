
export default function UserLayout ({ children}: { children: React.ReactNode}) {
    return (
        <div className="flex flex-col align-middle mt-10 h-auto w-full text-center text-red-800 bg-gray-100 font-serif font-bold">

                <h1 className="mt-24">Welcome To Family Shop</h1>
            
            <main className="h-auto w-full">{children}</main>
        </div>
    )
}