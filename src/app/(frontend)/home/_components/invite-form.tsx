import React from "react";
import { Input, Textarea } from "@/components/atoms/input";
import { Rectagon } from "@/components/atoms/polygon/rectagon";
import { Button } from "@/components/atoms/button";
import { motion } from "framer-motion";

export const InviteForm: React.FC<InviteFormProps> = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="flex flex-col gap-[69px] pt-[42px]">
      <div className="flex gap-[123px]">
        <Input
          placeholder="| first name"
          classNames={{
            input:
              "text-[#475836] text-[22px] font-bold placeholder:pl-[46px] placeholder:text-[#6B4C17]",
            inputWrapper: "h-[83px] bg-[#f7d7a0] ",
          }}
          chamferLength={{ x: 40, y: 30 }}
          onFocus={() => setExpanded(true)}
          stroke="white"
          polygon={Rectagon}
        />
        <Input
          placeholder="| last name"
          classNames={{
            input:
              "text-[#475836] text-[22px] font-bold placeholder:pl-[46px] placeholder:text-[#6B4C17]",
            inputWrapper: "h-[83px] bg-[#f7d7a0] ",
          }}
          chamferLength={{ x: 40, y: 30 }}
          onFocus={() => setExpanded(true)}
          stroke="white"
          polygon={Rectagon}
        />
      </div>
      <motion.div
        className="flex flex-col gap-[69px]"
        initial={{ opacity: 0, height: 0 }}
        animate={
          expanded ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex gap-[123px]">
          <Input
            placeholder="| email"
            type="email"
            classNames={{
              input:
                "text-[#475836] text-[22px] font-bold placeholder:pl-[46px] placeholder:text-[#6B4C17]",
              inputWrapper: "h-[83px] bg-[#f7d7a0] ",
            }}
            chamferLength={{ x: 40, y: 30 }}
            stroke="white"
            polygon={Rectagon}
          />
          <Input
            placeholder="| password"
            type="password"
            classNames={{
              input:
                "text-[#475836] text-[22px] font-bold placeholder:pl-[46px] placeholder:text-[#6B4C17]",
              inputWrapper: "h-[83px] bg-[#f7d7a0] ",
            }}
            chamferLength={{ x: 40, y: 30 }}
            stroke="white"
            polygon={Rectagon}
          />
        </div>

        <Textarea
          placeholder={`we love meeting new people. what inspires you to journey with us?
          
          |
          `}
          classNames={{
            input:
              "text-[#475836] text-[22px] font-bold placeholder:max-w-[439px] placeholder:text-center p-[28px] placeholder:pl-[175px] placeholder:text-[#6B4C17]",
            inputWrapper: "bg-[#f7d7a0] h-[219px]",
          }}
          chamferLength={{ x: 40, y: 30 }}
          stroke="white"
          polygon={Rectagon}
        />
      </motion.div>

      <div className="flex justify-center">
        <Button
          polygon={Rectagon}
          strokeWidth={3}
          variant="bordered"
          stroke="white"
          className="h-[83px] w-[336px] text-[36px] font-extrabold text-white"
          chamferLength={{ x: 40, y: 30 }}
        >
          invite me
        </Button>
      </div>
    </div>
  );
};

interface InviteFormProps {}
