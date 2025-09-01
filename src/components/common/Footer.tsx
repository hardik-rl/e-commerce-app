"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import card from "../../assets/images/card.png";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo + description */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-extrabold mb-4">SHOP.CO</h2>
          <p className="text-sm mb-4">
            We have clothes that suit your style and which you’re proud to wear.
            From women to men.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-white rounded-full shadow hover:bg-gray-200">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-3">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Works</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">HELP</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Delivery Details</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">FAQ</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Account</a></li>
            <li><a href="#">Manage Deliveries</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Payments</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">RESOURCES</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Free eBooks</a></li>
            <li><a href="#">Development Tutorial</a></li>
            <li><a href="#">How to - Blog</a></li>
            <li><a href="#">Youtube Playlist</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
          <p>Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex space-x-3">
            <Image src={card} alt="Visa" width={355} height={255} objectFit="contain" />
            {/* <Image src="/images/mastercard.png" alt="Mastercard" width={40} height={25} />
            <Image src="/images/paypal.png" alt="PayPal" width={40} height={25} />
            <Image src="/images/applepay.png" alt="Apple Pay" width={40} height={25} />
            <Image src="/images/googlepay.png" alt="Google Pay" width={40} height={25} /> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
