import React from "react";
import RadialPolygon from "@/components/molecules/radial-polygon/radial-polygon";

export const Octagon: React.FC<OctagonProps> = (props) => {
  return (
    <RadialPolygon
      className="h-full w-full"
      sides={8}
      style={{
        background: `url("/assets/wormhole/create-octagon.png")`,
        backgroundSize: "cover",
      }}
      boundary={{
        radii: { strokeWidth: 0 },
        outer: { strokeWidth: 8, stroke: "#9880A1" },
      }}
    ></RadialPolygon>
  );
};

interface OctagonProps {}
