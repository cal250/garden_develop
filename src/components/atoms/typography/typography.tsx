import React from "react";
import { VariantType } from "./types";
import { withPolygon } from "@/components/utils/react/polymorphism";
import { variantClasses } from "@/components/atoms/typography/classes";

export interface TypographyProps {
  variant?: VariantType;
  className?: string;
}

const Typography = withPolygon<TypographyProps, "p">(
  (Polygon, { variant, ...props }) => {
    const variantClass = variant ? variantClasses[variant] : "";

    return <Polygon className={variantClass} {...props} />;
  },
  "p",
);

export default Typography;
