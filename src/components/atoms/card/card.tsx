import { Ripple } from "@/components/atoms/ripple";

import { CardProvider } from "./card-context";
import { useCard, UseCardProps } from "./use-card";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface CardProps extends UseCardProps {}

const Card = withPolygon<CardProps>((Polygon, props, ref) => {
  const {
    children,
    context,
    isPressable,
    disableAnimation,
    disableRipple,
    getCardProps,
    getRippleProps,
  } = useCard({ ...props, ref });

  return (
    <Polygon {...getCardProps()}>
      <CardProvider value={context}>{children}</CardProvider>
      {isPressable && !disableAnimation && !disableRipple && (
        <Ripple {...getRippleProps()} />
      )}
    </Polygon>
  );
});

Card.displayName = "NextUI.Card";

export default Card;
