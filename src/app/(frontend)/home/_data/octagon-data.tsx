import { createIcon } from "@/components/atoms/icons/utils/create-icon";
import { WedgeData } from "@/components/atoms/polygon/utils";
import clsx from "clsx";

const FlowerIcon = createIcon<{ active?: boolean }>({
  viewBox: "0 0 41 43",
  path: ({ active }) => (
    <>
      <g clipPath="url(#clip0_9008_4309)">
        <path
          d="M15.0639 20.427C14.5583 23.217 16.4971 26.0821 19.2935 26.5889C22.0899 27.0957 24.8298 25.2012 25.395 22.422C25.9601 19.6429 24.0213 16.7778 21.2357 16.2116C18.3798 15.694 15.5803 17.5777 15.0639 20.427ZM32.3562 23.6837C36.3983 26.1329 36.7484 30.3042 34.7826 33.0134C32.4711 36.2731 28.9507 36.3707 24.4212 33.22C23.0903 38.1902 20.7452 40.2789 16.9754 39.7182C13.2055 39.1576 11.6129 36.4166 11.9375 30.8962C9.51585 32.0514 7.08787 32.2244 4.79338 30.6437C3.48378 29.7319 2.66598 28.4801 2.3292 26.9476C1.51449 23.3053 3.57212 20.4288 8.04323 19.1546C5.76521 17.8221 4.43849 15.9876 4.35487 13.3974C4.2776 11.7893 4.90355 10.37 5.98395 9.15571C8.51756 6.36546 11.9355 6.49444 15.9567 9.73696C16.1218 7.13055 16.9959 5.02049 19.32 3.72504C20.6821 2.99094 22.2069 2.71549 23.7323 3.11458C27.4971 4.04215 28.9599 6.82098 28.2132 11.9583C30.3968 10.76 32.5868 10.5438 34.7781 11.6767C36.2985 12.4427 37.2461 13.6567 37.7506 15.2809C39.0413 19.0095 37.1729 21.859 32.3562 23.6837Z"
          fill={active ? "rgb(var(--color-9))" : "rgb(var(--color-2))"}
        />
        <path
          d="M19.6292 26.7725C22.5866 27.3085 25.4175 25.3511 25.9522 22.4006C26.487 19.4501 24.5231 16.6237 21.5657 16.0877C18.6084 15.5517 15.7774 17.5091 15.2427 20.4596C14.7079 23.4101 16.6718 26.2365 19.6292 26.7725Z"
          fill={active ? "rgb(var(--color-2))" : "rgb(var(--color-6))"}
          stroke="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_9008_4309">
          <rect
            width="34.2"
            height="37.24"
            fill="white"
            transform="translate(6.64062) rotate(10.2727)"
          />
        </clipPath>
      </defs>
    </>
  ),
});

export const data: Array<WedgeData> = [
  "tending",
  "",
  "",
  "weaves",
  "seeds",
  "seasons",
  "gardens",
  "wellgorithms",
].map((flower, index) => ({
  boundary: {
    left: index === 1 ? { strokeWidth: 4 } : undefined,
    right: index === 2 ? { strokeWidth: 4 } : undefined,
    outer: index === 7 ? { strokeWidth: 0, className: "shadow-lg" } : undefined,
  },
  className:
    index === 1 || index === 2
      ? "bg-[#65438A]"
      : index === 7
        ? "bg-color-2"
        : "",
  hasFloatingLayer: index === 7,
  segments: [
    {
      content: flower ? (
        <div>
          <h1
            className={clsx("text-sm font-extrabold text-color-1 md:text-xl", {
              "text-color-9": index === 7,
            })}
          >
            {flower}
          </h1>
        </div>
      ) : (
        <div />
      ),
    },
    {
      content: flower ? (
        <FlowerIcon className="h-8 w-8" active={index === 7} />
      ) : (
        <div />
      ),
    },
  ],
}));
