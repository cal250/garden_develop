import { HTMLNextUIProps } from "@nextui-org/system";
import { clsx } from "@nextui-org/shared-utils";

import { useCardContext } from "./card-context";
import { withPolygon } from "@/components/utils/react/polymorphism";

const CardHeader = withPolygon<HTMLNextUIProps>((Polygon, props) => {
  const { className, children, ...otherProps } = props;

  const { slots, classNames } = useCardContext();

  const headerStyles = clsx(classNames?.header, className);

  return (
    <Polygon
      className={slots.header?.({ class: headerStyles })}
      {...otherProps}
    >
      {children}
    </Polygon>
  );
});

CardHeader.displayName = "NextUI.CardHeader";

export default CardHeader;
