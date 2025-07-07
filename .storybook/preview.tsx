import viewports from "./viewports";
// Import global styles
import "@/styles/fonts.css";
import "@/styles/globals.scss";
import { Preview } from "@storybook/react";
import { NextUIProvider } from "@nextui-org/system";
import { DocsContainer, DocsContainerProps } from "@storybook/blocks";

const decorators: Preview["decorators"] = [
  (Story, { viewMode }) => {
    return (
      <NextUIProvider>
        <Story />
      </NextUIProvider>
    );
  },
];

const Container = (props: DocsContainerProps) => {
  return (
    <NextUIProvider>
      <DocsContainer {...props} />
    </NextUIProvider>
  );
};

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#e3e3e3",
        },
      ],
    },
    docs: {
      container: Container,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: viewports,
    },
    viewMode: "docs",
  },
  decorators,

  tags: ["autodocs"],
};

export default preview;
