"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold text-purple-500">GamesRoom IO</h1>

        {/* Mobile menu */}
        {!isLoggedIn && (
          <div className="md:hidden relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white text-2xl focus:outline-none cursor-pointer"
            >
              {dropdownOpen ? "✕" : "☰"}
            </button>
            {dropdownOpen && (
              <div className="cursor-pointer absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowRegister(true);
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}

        {/* Desktop Menu */}
        {!isLoggedIn && (
          <div className="hidden md:flex gap-4">
            <Button
              onClick={() => setShowLogin(true)}
              className="text-white border px-4 py-2 rounded-md cursor-pointer"
            >
              Login
            </Button>
            <Button
              onClick={() => setShowRegister(true)}
              className="text-white bg-purple-600 px-4 py-2 rounded-md cursor-pointer"
            >
              Register
            </Button>
          </div>
        )}

        {/* Avatar menu (both mobile & desktop) */}
        {isLoggedIn && (
          <div className="relative">
            <Image
              src="/avatar.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </a>
                <Button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Play Anywhere with{" "}
          <span className="text-purple-500">GamesRoom IO</span>
        </h2>
        <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-300">
          Your favorite games, no installation needed. Just click and play!
        </p>
      </section>

      {/* Modals */}
      {showLogin && (
        <Modal title="Login" onClose={() => setShowLogin(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
              setShowLogin(false);
            }}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
            >
              Login
            </Button>
          </form>
        </Modal>
      )}

      {/* {showRegister && (
        <Modal title="Register" onClose={() => setShowRegister(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
              setShowRegister(false);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
            >
              Register
            </Button>
          </form>
        </Modal>
      )} */}

      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-left text-white">Register</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoggedIn(true);
              setShowRegister(false);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
            >
              Register
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
