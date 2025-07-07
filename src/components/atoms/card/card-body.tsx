import { HTMLNextUIProps } from "@nextui-org/system";
import { clsx } from "@nextui-org/shared-utils";

import { useCardContext } from "./card-context";
import { withPolygon } from "@/components/utils/react/polymorphism";

const CardBody = withPolygon<HTMLNextUIProps>((Polygon, props, ref) => {
  const { className, children, ...otherProps } = props;

  const { slots, classNames } = useCardContext();

  const bodyStyles = clsx(classNames?.body, className);

  return (
    <Polygon className={slots.body?.({ class: bodyStyles })} {...otherProps}>
      {children}
    </Polygon>
  );
});

CardBody.displayName = "NextUI.CardBody";

export default CardBody;
