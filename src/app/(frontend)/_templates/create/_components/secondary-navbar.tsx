import React from "react";

export const SecondaryNavbar: React.FC<SecondaryNavbarProps> = (props) => {
  return (
    <div className="flex flex-col bg-transparent">
      <div className="flex h-[60px] w-full items-center justify-center bg-[#8858B599] px-8">
        <span className="font-bold text-color-2">peace</span>
      </div>
    </div>
  );
};

interface SecondaryNavbarProps {}
