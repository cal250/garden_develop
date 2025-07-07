import { ColorPalette } from "@/components/organisms/color-palette/color-palette";
import ItemPicker from "@/components/molecules/item-picker/item-picker";
import ItemPickerItem from "@/components/molecules/item-picker/item-picker-item";

const meta = {
  title: "Components/Organisms/ColorPalette",
  component: ColorPalette,
};

export default meta;

export const Default = {
  args: {
    colors: ["pink", "teal", "yellow", "orange", "blue", "green"],
    illustration: "/assets/color-palette/illustration.jpg",
  },
};

export const WithTitle = {
  args: {
    ...Default.args,
    title: "Flowers",
  },
};

export const InItemPicker = {
  render: () => {
    return (
      <ItemPicker
        className="flex gap-16"
        items={[
          {
            id: 1,
            name: "flowers",
            colors: ["pink", "teal", "yellow", "orange", "blue", "green"],
            illustration: "/assets/color-palette/illustration.jpg",
          },
          {
            id: 2,
            name: "shadows",
            colors: ["red", "green", "yellow", "orange", "blue", "purple"],
            illustration: "/assets/color-palette/illustration.jpg",
          },
          {
            id: 3,
            name: "seasons",
            colors: ["blue", "white", "yellow", "orange", "blue", "green"],
            illustration: "/assets/color-palette/illustration.jpg",
          },
        ]}
      >
        {(item: any) => (
          <ItemPickerItem
            key={item.id}
            as={ColorPalette}
            colors={item.colors}
            illustration={item.illustration}
            title={item.name}
          />
        )}
      </ItemPicker>
    );
  },
};
