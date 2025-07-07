import Carousel, { CarouselProps } from "../carousel";
import CarouselContent from "../carousel-content";
import CarouselItem from "../carousel-item";
import { Card, CardBody } from "@/components/atoms/card";
import CarouselNext from "../carousel-next";
import CarouselPrevious from "../carousel-previous";

const meta = {
  title: "Components/Atoms/Carousel",
  component: Carousel,
};

export default meta;

export const Default = {
  render: (args: CarouselProps) => (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
      {...args}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardBody className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardBody>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
