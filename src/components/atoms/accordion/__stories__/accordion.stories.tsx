import { Accordion, AccordionItem, AccordionProps } from "../index";
import { Trapezoid } from "@/components/atoms/polygon/trapezoid";

const meta = {
  title: "Components/Atoms/Accordion",
  component: Accordion,
};

export default meta;

const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const Template = (args: AccordionProps) => (
  <div className="w-[600px]">
    <Accordion {...args} showDivider={false} className="px-16" hideIndicator>
      <AccordionItem
        key="1"
        polygon={Trapezoid}
        className="bg-yellow-500 px-8 py-2"
        centerContent={false}
        insribedContent
        slopeAngle={10}
        aria-label="Accordion 1"
        title="Accordion 1"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="2"
        polygon={Trapezoid}
        slopeAngle={0}
        centerContent={false}
        className="bg-yellow-500 px-8 py-2"
        aria-label="Accordion 2"
        title="Accordion 2"
      >
        {defaultContent}
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Accordion 3"
        polygon={Trapezoid}
        className={"bg-yellow-500 px-8 py-2"}
        centerContent={false}
        slopeAngle={10}
        inverted
        title="Accordion 3"
      >
        {defaultContent}
      </AccordionItem>
    </Accordion>
  </div>
);

export const Default = {
  args: {
    selectionMode: "single",
  },
  render: Template,
};
