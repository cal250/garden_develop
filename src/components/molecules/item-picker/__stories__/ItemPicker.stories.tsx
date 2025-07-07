import ItemPicker from "@/components/molecules/item-picker/item-picker";
import ItemPickerItem from "@/components/molecules/item-picker/item-picker-item";
import ItemPickerSection from "@/components/molecules/item-picker/item-picker-section";
import { Rexagon } from "@/components/atoms/polygon/rexagon";

const meta = {
  title: "Components/Molecules/ItemPicker",
  component: ItemPicker,
};

export default meta;

export const Default = {
  args: {
    items: [
      { id: 1, name: "Aardvark" },
      { id: 2, name: "Cat" },
      { id: 3, name: "Dog" },
      { id: 4, name: "Kangaroo" },
      { id: 5, name: "Koala" },
      { id: 6, name: "Penguin" },
      { id: 7, name: "Snake" },
    ],
    selectionMode: "single",
    children: (item: any) => {
      return <ItemPickerItem key={item.id}>{item.name}</ItemPickerItem>;
    },
  },
};

export const WithSections = {
  args: {
    items: [
      {
        title: "Animals",
        items: [
          { id: 1, name: "Aardvark" },
          { id: 2, name: "Cat" },
          { id: 3, name: "Dog" },
        ],
      },
      {
        title: "Birds",
        items: [
          { id: 4, name: "Kangaroo" },
          { id: 5, name: "Koala" },
          { id: 6, name: "Penguin" },
          { id: 7, name: "Snake" },
        ],
      },
    ],
    selectionMode: "single",
    children: (section: any) => {
      return (
        <ItemPickerSection
          title={section.title}
          items={section.items}
          key={section.title}
        >
          {(item: any) => (
            <ItemPickerItem key={item.id}>{item.name}</ItemPickerItem>
          )}
        </ItemPickerSection>
      );
    },
  },
};

export const WithCustomStyling = {
  ...Default,
  args: {
    ...Default.args,
    selectionMode: "multiple",
    className: "w-[800px] flex flex-col gap-4 items-center",
    itemClasses: {
      base: [
        "bg-color-9 text-lg font-bold text-color-2 transition-all ",
        "data-[selected=true]:bg-color-2 data-[selected=true]:text-color-9 h-[50px] justify-center hover:bg-red-500",
      ],
    },
    items: [
      [{ id: "hope" }, { id: "self control" }],
      [{ id: "kindness" }, { id: "peace" }, { id: "gratitude" }],
      [{ id: "joy" }, { id: "love" }, { id: "faith" }, { id: "empathy" }],
    ],
    children: (section: any) => {
      return (
        <ItemPickerSection
          key={section[0].id}
          items={section}
          groupStyles={{
            gridTemplateColumns: "repeat(" + section.length + ", 1fr)",
          }}
          style={{ width: `calc(250px * ${section.length})` }}
          classNames={{
            group: ["w-full grid gap-4 justify-center"],
          }}
          hideSelectedIcon
        >
          {(item: any) => (
            <ItemPickerItem
              key={item.id}
              polygon={Rexagon}
              strokeWidth={0}
              fill="none"
            >
              {item.id}
            </ItemPickerItem>
          )}
        </ItemPickerSection>
      );
    },
  },
};
