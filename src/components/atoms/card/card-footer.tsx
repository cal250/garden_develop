import { HTMLNextUIProps } from "@nextui-org/system";
import { clsx } from "@nextui-org/shared-utils";

import { useCardContext } from "./card-context";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface CardFooterProps extends HTMLNextUIProps {}

const CardFooter = withPolygon<CardFooterProps>((Polygon, props) => {
  const { className, children, ...otherProps } = props;

  const { slots, classNames } = useCardContext();

  const footerStyles = clsx(classNames?.footer, className);

  return (
    <Polygon
      className={slots.footer?.({ class: footerStyles })}
      {...otherProps}
    >
      {children}
    </Polygon>
  );
});

CardFooter.displayName = "NextUI.CardFooter";

export default CardFooter;
