"use client"
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";

// Header Component
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b">
      {/* Top Bar */}
      <div className="bg-black text-white text-center text-sm py-2">
        Sign up and get 20% off to your first order. <a href="#" className="underline">Sign Up Now</a>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold">SHOP.CO</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-gray-700">
          <a href="#">Shop</a>
          <a href="#">On Sale</a>
          <a href="#">New Arrivals</a>
          <a href="#">Brands</a>
        </nav>

        {/* Search + Icons */}
        <div className="hidden md:flex items-center gap-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="border rounded-full px-4 py-1 w-64"
          />
          <ShoppingCart className="w-5 h-5" />
          <User className="w-5 h-5" />
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 p-4 border-t">
          <a href="#">Shop</a>
          <a href="#">On Sale</a>
          <a href="#">New Arrivals</a>
          <a href="#">Brands</a>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <User className="w-5 h-5" />
          </div>
        </div>
      )}
    </header>
  );
}

// Banner Component
export function Banner() {
  return (
    <section className="flex flex-col md:flex-row items-center px-6 py-12 md:py-20 gap-10">
      {/* Left Content */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
        </h1>
        <p className="text-gray-600 max-w-lg">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full">Shop Now</button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-6">
          <div>
            <p className="text-xl font-bold">200+</p>
            <p className="text-gray-600 text-sm">International Brands</p>
          </div>
          <div>
            <p className="text-xl font-bold">2,000+</p>
            <p className="text-gray-600 text-sm">High-Quality Products</p>
          </div>
          <div>
            <p className="text-xl font-bold">30,000+</p>
            <p className="text-gray-600 text-sm">Happy Customers</p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-1 relative">
        <Image
          src="/hero.png"
          alt="Fashion Models"
          width={500}
          height={600}
          className="object-contain mx-auto"
        />
      </div>
    </section>
  );
}

// Brands Strip
export function Brands() {
  return (
    <div className="bg-black py-6 px-6">
      <div className="flex justify-center md:justify-between items-center flex-wrap gap-6 text-white text-2xl font-bold">
        <span>VERSACE</span>
        <span>ZARA</span>
        <span>GUCCI</span>
        <span>PRADA</span>
        <span>Calvin Klein</span>
      </div>
    </div>
  );
}

// Main Page
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Banner />
      <Brands />
    </main>
  );
}
