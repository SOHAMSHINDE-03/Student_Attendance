"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout"); // Calls Kinde's logout API
      router.push("/"); // Redirects to home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Account Settings Cards in a Single Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Name */}
        <div className="bg-black p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Name</h2>
          <p className="mt-2 font-semibold">{user?.given_name || "Not Available"}</p>
        </div>

        {/* Email (Read-Only) */}
        <div className="bg-black p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Email</h2>
          <p className="mt-2 font-semibold">{user?.email || "Not Available"}</p>
        </div>

        {/* Password Change */}
        <div className="bg-black p-4 shadow rounded-lg">
          <h2 className="text-gray-500">Password</h2>
          <Button variant="outline" className="mt-2 w-full">
            Change Password
          </Button>
        </div>
      </div>

      {/* Log Out Button */}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleLogout}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          LOG OUT
        </Button>
      </div>
    </div>
  );
}
