import { PhoneArrowDownLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { TfiEmail } from "react-icons/tfi";

const ContactPage = () => {
  return ( <div className="relative">
    <div className="h-10 w-10 rounded-full bg-red-800 top-10 left-28 absolute opacity-2"></div>
    <div className="h-10 w-10 rounded-full bg-green-800 top-36 left-52 absolute opacity-2"></div>
    <div className="h-10 w-10 rounded-full bg-yellow-500 top-10 right-28 absolute opacity-2"></div>
    <div className="h-10 w-10 rounded-full bg-purple-800 top-36 right-52 absolute opacity-2"></div>
    <div className="p-6 max-w-md mx-auto bg-white  rounded-md h-auto flex flex-col justify-center  mt-16 shadow-xl">
       
      <h1 className="text-2xl font-bold mb-14 text-center text-red-800">Contact Me</h1>
      <div className="flex  gap-2 mb-4 justify-start ml-4">
        <PhoneArrowDownLeftIcon className="h-7 w-7 text-blue-600" />
        <p className="text-gray-700 text-lg font-bold pl-3">08101408378</p>
      </div>
      <div className="flex items-center gap-2 mb-4 justify-start ml-4">
  <TfiEmail className="h-5 w-5 text-blue-600" />
  <Link
    href="mailto:ngozika1105@gmail.com?subject=Hello&body=I would like to connect with you."
    className="text-blue-600 hover:underline text-lg font-bold pl-3"
  >
    ngozika1105@gmail.com
  </Link>
</div>
      
      <div className="flex items-center gap-2 mb-4 justify-start ml-4">
        <FaGithub className="h-5 w-5 text-gray-700" />
        <Link
          href="https://github.com/Nnamdingozi"
          className="text-blue-600 hover:underline text-lg font-bold pl-3"
        >
          GitHub
        </Link>
      </div>
      <div className="flex items-center gap-2 mb-4 justify-start ml-4">
        <GrLinkedin className="h-5 w-5 text-blue-700" />
        <Link
          href="https://www.linkedin.com/in/geraldine-nnamdi-b58a25220"
          className="text-blue-600 hover:underline text-lg font-bold pl-3"
        >
          LinkedIn
        </Link>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
