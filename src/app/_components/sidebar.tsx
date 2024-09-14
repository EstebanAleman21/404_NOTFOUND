import React from "react";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden">
          <FaBars className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      {/* Sidebar Content */}
      <SheetContent side="left" className="w-64 bg-gray-800 text-white">
        <SheetHeader className="bg-gray-900 p-4">
          <SheetTitle className="text-xl font-bold">My Dashboard</SheetTitle>
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="space-y-4 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-left hover:bg-gray-700"
          >
            <FaHome className="mr-2 h-5 w-5" /> Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left hover:bg-gray-700"
          >
            <FaUser className="mr-2 h-5 w-5" /> Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-left hover:bg-gray-700"
          >
            <VscSettings className="mr-2 h-5 w-5" /> Settings
          </Button>
        </nav>

        {/* Footer Logout Button */}
        <div className="bg-gray-900 p-4">
          <Button className="w-full bg-red-500 text-white hover:bg-red-600">
            <IoIosLogOut className="mr-2 h-5 w-5" /> Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
