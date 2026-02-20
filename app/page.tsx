import Image from "next/image";

import image1 from "@/public/assets/images/shilajit_capsule_pack_of_3-2-Photoroom_dc7a5497-e986-4769-8d37-6b3d7f20b824.webp";
import image2 from "@/public/assets/images/alovera_juice.webp";
import MySwiper from "@/components/MySwiper";

export default function Home() {
  return (
    <div className="px-5">
      {/* carousel */}
      <div className="grid md:grid-flow-col md:grid-rows-1 grid-rows-3 gap-5 my-5">
        <div className="rounded-3xl overflow-hidden">
          <Image
            src={image1}
            alt="image"
            className="object-cover hover:scale-110 duration-200 ease-in-out"
          />
        </div>
        <div className="rounded-3xl overflow-hidden">
          <Image
            src={image1}
            alt="image"
            className="object-cover hover:scale-110 duration-200 ease-in-out"
          />
        </div>
        <div className="rounded-3xl overflow-hidden">
          <Image
            src={image1}
            alt="image"
            className="object-cover hover:scale-110 duration-200 ease-in-out"
          />
        </div>
      </div>

      {/* carousel of icons */}
      <div className="h-[20vh] flex-col flex w-full my-10">
        <h1 className="text-3xl font-bold text-center">Shop by Concern</h1>
        <MySwiper />
      </div>

      <div className="bg-[#f1f3f7] rounded-t-2xl w-full py-4 flex flex-col my-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between p-5">
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
            <div className="relative w-full group">
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
                  <span className="line-through">Rs. 499.00</span>
                </div>
              </div>
              <div className="rounded-3xl text-md font-semibold text-primary opacity-90 hover:bg-secondary border-2 w-full text-center py-2 border-gray-300 hover:text-white my-2 duration-200 hover:border-white">
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full my-10 py-10">
        <h3 className="text-4xl font-bold text-center">Custom Testimonials</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3">
            <p className="text-md font-semibold text-center">
              Nidhi Verma, 29 - Bengaluru{" "}
              <span className="font-medium text-sm text-gray-700">
                ✔ Verified Buyer
              </span>
            </p>
            <p className="font-semibold text-gray-700 leading-relaxed tracking-wide text-center">
              I used to struggle with migraines every week. The Migraine Kit has
              been a blessing — it calms my nerves, and I sleep much better now.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3">
            <p className="text-md font-semibold">
              Nidhi Verma, 29 - Bengaluru{" "}
              <span className="font-medium text-gray-700">✔ Verified Buyer</span>
            </p>
            <p className="font-semibold text-gray-700 tracking-wide">
              "I used to struggle with migraines every week. The Migraine Kit
              has been a blessing — it calms my nerves, and I sleep much better
              now."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

