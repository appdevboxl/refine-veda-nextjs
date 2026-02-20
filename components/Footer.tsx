import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f5a3f] text-white">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Us */}
          <div>
            <h4 className="text-lg font-semibold mb-5">About Us</h4>

            <p className="text-sm leading-7 text-white/90">
              RefineVeda blends ancient Ayurvedic wisdom with modern science to
              create natural, effective wellness solutions. Each product is
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
              Sign up for 10% off your first purchase and free shipping. Updates
              information on Sales and Offers.
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
  );
}
