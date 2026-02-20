import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import logo from "@/public/assets/icons/colored-logo.avif";

export default function Header() {
  return (
    <div className="bg-primary w-full lg:h-18 h-15 flex flex-row justify-between items-center p-2 px-5">
      <FontAwesomeIcon icon={faBars} color="white" size="xl" />
      <div className="flex flex-row md:justify-between justify-center w-[70%] gap-5">
        <Image src={logo} alt="logo" width={110} />
        <div className="bg-white rounded-4xl w-[75%] hidden md:block">
          <div className="px-3 py-2 flex flex-row gap-2 items-center">
            <FontAwesomeIcon icon={faSearch} size="sm" className="text-gray-600" />
            <input
              type="text"
              placeholder="I am looking for.... "
              className="text-md focus:outline-0"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <FontAwesomeIcon icon={faCartShopping} color="white" size="xl" />
        <div className="flex-col hidden md:flex">
          <p className="text-xs text-white font-bold">Cart</p>
          <p className="text-md text-white font-medium">Rs. 000</p>
        </div>
      </div>
    </div>
  );
}
