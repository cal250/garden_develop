import React, { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const onClick = useCallback(() => {
    navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [text]);

  return (
    <button className="relative text-xs transition-all" onClick={onClick}>
      <span
        className={twMerge(
          "absolute left-0 top-1/2 -translate-y-1/2 text-xs opacity-0 transition-all",
          copied && "opacity-1 left-full",
        )}
      >
        Copied
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        width="20"
        height="20"
      >
        {copied ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        ) : (
          <>
            <rect x="9" y="9" width="10" height="10" rx="2" ry="2" />
            <path d="M5 15V7a2 2 0 0 1 2-2h8" />
          </>
        )}
      </svg>
    </button>
  );
};

interface CopyButtonProps {
  text: string;
}
