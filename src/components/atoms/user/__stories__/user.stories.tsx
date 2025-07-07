import React from "react";
import { Meta } from "@storybook/react";
import { Link } from "@/components/atoms/link";

import { User } from "../index";

export default {
  name: "Components/Atoms/User",
  component: User,
} as Meta<typeof User>;

const url = "https://avatars.githubusercontent.com/u/25629064?v=4";

export const Default = {
  args: {
    name: "Moses Gitau",
    avatarProps: {
      src: url,
    },
  },
};

export const isFocusable = {
  args: {
    name: "Moses Gitau",
    isFocusable: true,
    avatarProps: {
      src: url,
    },
  },
};

export const WithDefaultAvatar = {
  args: {
    name: "Moses Gitau",
    avatarProps: {
      name: "Moses Gitau",
      getInitials: (name: string) =>
        name
          .split(" ")
          .map((n) => n[0])
          .join(""),
    },
  },
};

export const WithDescription = {
  args: {
    name: "Moses Gitau",
    description: "Software Engineer",
    avatarProps: {
      src: url,
    },
  },
};

export const WithLinkDescription = {
  args: {
    name: "Moses Gitau",
    description: (
      <Link href="https://x.com/mosesgitau_" size="sm">
        @mosesgitau_
      </Link>
    ),
    avatarProps: {
      src: url,
    },
  },
};
