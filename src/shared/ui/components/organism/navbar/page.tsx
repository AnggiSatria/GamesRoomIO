"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useHooksLogin from "@/shared/ui/hooks/auth/login";
import useHooksRegister from "@/shared/ui/hooks/auth/register";
import React, { useState } from "react";
import { PasswordInput } from "../../atoms/PasswordInput";
import { useReadProfiles } from "@/shared/lib/helpers/client/services/profiles";
import Cookies from "js-cookie";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = Cookies.get("token");

  const {
    form: formLogin,
    onSubmit: onSubmitLogin,
    loading: loadingMutationLogin,
  } = useHooksLogin({ setShowLogin });

  const {
    form: formRegister,
    onSubmit: onSubmitRegister,
    loading: loadingMutationRegister,
  } = useHooksRegister({ setShowRegister });

  const activeFilter = {
    search: "",
    pagination: "",
  };

  const {
    data: dataProfiles,
    isSuccess,
    isError,
    refetch,
    isLoading,
  } = useReadProfiles(activeFilter);

  const checkUsers = dataProfiles && dataProfiles?.data?.profile;

  return (
    <>
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-left text-white">Login</DialogTitle>
          </DialogHeader>
          <Form {...formLogin}>
            <form
              onSubmit={formLogin.handleSubmit(onSubmitLogin)}
              className="space-y-4"
            >
              <FormField
                control={formLogin.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white rounded-md">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formLogin.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white rounded-md">
                      Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 cursor-pointer"
              >
                Login
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent className="bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-left text-white">Register</DialogTitle>
          </DialogHeader>
          <Form {...formRegister}>
            <form
              onSubmit={formRegister.handleSubmit(onSubmitRegister)}
              className="space-y-4"
            >
              <FormField
                control={formRegister.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white rounded-md">
                      Username:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formRegister.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white rounded-md">
                      Email:
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} className="text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formRegister.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white rounded-md">
                      Password:
                    </FormLabel>
                    <FormControl>
                      <PasswordInput field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 cursor-pointer"
              >
                Register
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold text-purple-500">GamesRoom IO</h1>

        {/* Mobile menu */}
        {!token && (
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
        {!token && (
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
        {token && (
          <div className="relative">
            <Avatar
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="cursor-pointer"
            >
              <AvatarImage src={`${checkUsers?.image}` || "/avatar.png"} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Settings
                </a>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    Cookies.remove("token");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
