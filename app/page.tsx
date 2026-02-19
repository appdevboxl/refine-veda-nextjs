import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

import logo from "@/public/assets/icons/colored-logo.avif";
import image1 from "@/public/assets/images/shilajit_capsule_pack_of_3-2-Photoroom_dc7a5497-e986-4769-8d37-6b3d7f20b824.webp";
import immunity from "@/public/assets/images/immunity.webp";
import image2 from "@/public/assets/images/alovera_juice.webp";
import MySwiper from "@/components/MySwiper"

export default function Home() {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="bg-primary w-full lg:h-18 h-15 flex flex-row justify-between items-center p-2 px-5">
        <FontAwesomeIcon icon={faBars} color="white" size="xl" />
        <div className="flex flex-row md:justify-between justify-center w-[70%] gap-5 ">
          <Image src={logo} alt="logo" width={110} />
          <div className="bg-white rounded-4xl w-[75%] hidden md:block ">
            <div className="px-3 py-2 flex  flex-row gap-2 items-center ">
              <FontAwesomeIcon
                icon={faSearch}
                size="sm"
                className="text-gray-600"
              />

              <input
                type="text"
                placeholder="I am looking for.... "
                className="text-md focus:outline-0 "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <FontAwesomeIcon icon={faCartShopping} color="white" size="xl" />
          <div className="flex-col hidden md:flex ">
            <p className="text-xs text-white font-bold">Cart</p>
            <p className="text-md text-white font-medium">Rs. 000</p>
          </div>
        </div>
      </div>
      {/* main  */}
      <div className="px-5">
        {/* corousel */}
        <div className="grid md:grid-flow-col md:grid-rows-1 grid-rows-3  gap-5 my-5">
          <div className="rounded-3xl overflow-hidden ">
            <Image
              src={image1}
              alt="image"
              // fill
              className="object-cover hover:scale-110 duration-200 ease-in-out"
            />
          </div>
          <div className="rounded-3xl   overflow-hidden ">
            <Image
              src={image1}
              alt="image"
              // fill
              className="object-cover hover:scale-110 duration-200 ease-in-out"
            />
          </div>
          <div className="rounded-3xl overflow-hidden ">
            <Image
              src={image1}
              alt="image"
              // fill
              className="object-cover hover:scale-110 duration-200 ease-in-out"
            />
          </div>
        </div>

        {/* cararousel of icons */}
        <div className="h-[20vh] flex-col flex w-full my-10">
      <h1 className="text-3xl font-bold text-center">Shop by Concern</h1>    
              <MySwiper/>
        </div>

        <div className="bg-[#f1f3f7] rounded-t-2xl w-full py-4 flex flex-col my-4 ">
          <div className="w-full flex flex-col md:flex-row items-center  justify-between p-5">
            <h2 className="font-semibold text-4xl">Best Sellers</h2>
            <div className="flex flex-row justify-between gap-4 text-base font-medium">
              <span className="font-semibold text-black opacity-70">
                Best Selling
              </span>
              <p className="text-gray-400 font-bold hover:pointer">View All</p>
            </div>
          </div>

          <div className="grid grid-flow-row grid-rows-1 grid-cols-3">
            <div className="rounded-2xl overflow-clip bg-white">
              <div className=" relative w-full group">
                {/* Default Image */}
                <Image
                  src={image1}
                  alt="default"
                  className="transition-opacity duration-1000 group-hover:opacity-0"
                />

                {/* Hover Image */}
                <Image
                  src={image2}
                  alt="hover"
                  className="absolute top-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 ease-in-out"
                />
              </div>
              <div className="flex flex-col items-center justify-between p-3">
                <div className="flex flex-col justify-around">
                  <span className="text-md font-bold w-full text-center p-2">
                    Neem Karela Jamun Juice - Natural Detox
                  </span>
                  <div className="flex flex-row w-full justify-center gap-4 text-primary">
                    <span className="font-bold">Rs. 399.00</span>
                    <span className="line-through ">Rs. 499.00</span>
                  </div>
                  {/* button */}
                </div>
                <div className="rounded-3xl text-md font-semibold text-primary opacity-90 hover:bg-secondary border-2 w-full text-center py-2 border-gray-300 hover:text-white my-2 duration-200 hover:border-white">
                  Add to Cart
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full my-10 py-10">
          <h3 className="text-4xl font-bold text-center">
            Custom Testimonials
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3">
              {/* <Stars /> */}

              <p className="text-md font-semibold text-center">
                Nidhi Verma, 29 - Bengaluru{" "}
                <span className="font-medium text-sm text-gray-700">
                  ✔ Verified Buyer
                </span>
              </p>

              <p className="font-semibold text-gray-700 leading-relaxed tracking-wide text-center">
                I used to struggle with migraines every week. The Migraine Kit
                has been a blessing — it calms my nerves, and I sleep much
                better now.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3">
              {/* <Stars /> */}

              <p className="text-md font-semibold">
                Nidhi Verma, 29 - Bengaluru{" "}
                <span className="font-medium text-gray-700">
                  ✔ Verified Buyer
                </span>
              </p>

              <p className="font-semibold text-gray-700 tracking-wide">
                "I used to struggle with migraines every week. The Migraine Kit
                has been a blessing — it calms my nerves, and I sleep much
                better now."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}

      <footer className="bg-[#0f5a3f] text-white">
        {/* Top Footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Us */}
            <div>
              <h4 className="text-lg font-semibold mb-5">About Us</h4>

              <p className="text-sm leading-7 text-white/90">
                RefineVeda blends ancient Ayurvedic wisdom with modern science
                to create natural, effective wellness solutions. Each product is
                crafted with <span className="font-semibold">pure herbs</span>,{" "}
                <span className="font-semibold">ethical sourcing</span>, and{" "}
                <span className="font-semibold">mindful formulation</span>. We
                believe in restoring balance — body, mind, and spirit — the{" "}
                <span className="font-semibold">Vedic way</span>.
              </p>

              <div className="mt-6 space-y-2 text-sm text-white/90">
                <p>+91-9876495313</p>
                <p>info@refineveda.com</p>
              </div>

              {/* Social Icons */}
              <div className="mt-6 flex gap-4">
                <Link
                  href="#"
                  className="w-11 h-11 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-[#0f5a3f] transition"
                >
                  <Facebook className="w-5 h-5" />
                </Link>

                <Link
                  href="#"
                  className="w-11 h-11 rounded-full border border-white/50 flex items-center justify-center hover:bg-white hover:text-[#0f5a3f] transition"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Pages */}
            <div>
              <h4 className="text-lg font-semibold mb-5">Pages</h4>

              <ul className="space-y-3 text-sm text-white/90">
                <li>
                  <Link href="#" className="hover:underline">
                    Bulk Order Enquiry
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Franchise Enquiry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-lg font-semibold mb-5">Useful Links</h4>

              <ul className="space-y-3 text-sm text-white/90">
                <li>
                  <Link href="#" className="hover:underline">
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Returns, Cancellation and Refund
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-5">
                Sign Up to Newsletter
              </h4>

              <p className="text-sm leading-7 text-white/90">
                Sign up for 10% off your first purchase and free shipping.
                Updates information on Sales and Offers.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full rounded-full bg-transparent border border-white/40 px-5 py-3 text-sm outline-none placeholder:text-white/50"
                />

                <button className="rounded-full bg-white text-[#0f5a3f] px-7 py-3 font-semibold text-sm hover:bg-white/90 transition whitespace-nowrap">
                  Sign Up
                </button>
              </div>

              <p className="mt-4 text-xs text-white/80 leading-6">
                ***By entering the e-mail you accept the{" "}
                <span className="font-semibold">terms and conditions</span> and
                the <span className="font-semibold">privacy policy</span>.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-14 border-t border-white/20" />
        </div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 text-sm text-white/90 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p>
            <span className="underline underline-offset-4">
              Vansh Technologies
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
