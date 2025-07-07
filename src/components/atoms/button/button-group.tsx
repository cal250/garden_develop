import { ButtonGroupProvider } from "./button-group-context";
import { useButtonGroup, UseButtonGroupProps } from "./use-button-group";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface ButtonGroupProps extends UseButtonGroupProps {}

const ButtonGroup = withPolygon<ButtonGroupProps>((Polygon, props, ref) => {
  const { domRef, context, children, classNames, getButtonGroupProps } =
    useButtonGroup({
      ...props,
      ref,
    });

  return (
    <ButtonGroupProvider value={context}>
      <Polygon ref={domRef} className={classNames} {...getButtonGroupProps()}>
        {children}
      </Polygon>
    </ButtonGroupProvider>
  );
});

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
