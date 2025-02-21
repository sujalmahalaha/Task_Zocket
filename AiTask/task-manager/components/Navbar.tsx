"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, CheckSquare, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
//   const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
    if (!user) {
        router.push("/login"); // Redirect to login if no user is found
    }
    }, [user, router]);

  function handleLogout(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Desktop Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-violet-600 transition-colors"
              >
                <CheckSquare className="w-6 h-6" />
                Task Manager
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <Link
                href="/dashboard"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-violet-600 hover:bg-gray-50 rounded-md transition-colors flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/settings"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-violet-600 hover:bg-gray-50 rounded-md transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>
          </div>

          {/* Right side - User Actions */}
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            {user && (
              <>
                <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-medium">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <span className="hidden md:inline">{user.email}</span>
                </div>
                <button
                //   onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-violet-600 hover:bg-gray-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-violet-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
