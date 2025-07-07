import { FlowerPicker } from "@/components/organisms/flower-picker/flower-picker";
import { useState } from "react";

const meta = {
  title: "Components/Organisms/FlowerPicker",
  component: FlowerPicker,
};

export default meta;

const Template = () => {
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const flowers = [
    { id: 1, name: "kindness" },
    { id: 2, name: "peace" },
    { id: 3, name: "gratitude" },
    { id: 4, name: "joy" },
    { id: 5, name: "love" },
    { id: 6, name: "faith" },
    { id: 7, name: "empathy" },
    { id: 8, name: "hope" },
    { id: 9, name: "patience" },
    { id: 10, name: "forgiveness" },
    { id: 11, name: "compassion" },
    { id: 12, name: "trust" },
  ];
  return (
    <div>
      <FlowerPicker
        onSelectionChange={(keys: any) => setSelectedKeys(Array.from(keys))}
        flowers={flowers}
      />
      <div className="mt-4">
        Selected:{" "}
        {selectedKeys
          .map((key) => flowers.find((f) => Number(f.id) === Number(key))?.name)
          .join(", ")}
      </div>
    </div>
  );
};

export const Default = {
  args: {},
  render: Template,
};
