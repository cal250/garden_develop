import { AvatarGroupProvider } from "./avatar-group-context";
import { useAvatarGroup, UseAvatarGroupProps } from "./use-avatar-group";
import Avatar from "./avatar";
import { forwardRef } from "@/components/utils/react/polymorphism";
import { PolygonProps } from "@/components/atoms/polygon/polygon";

export interface AvatarGroupProps<T extends PolygonProps = PolygonProps>
  extends UseAvatarGroupProps<T> {}

const AvatarGroup = forwardRef<AvatarGroupProps>((props, ref) => {
  const {
    Component,
    clones,
    context,
    remainingCount,
    getAvatarGroupCountProps,
    getAvatarGroupProps,
    renderCount = (count: number) => (
      <Avatar
        polygon={context.polygon}
        {...context.polygonProps}
        {...getAvatarGroupCountProps()}
        name={`+${count}`}
      />
    ),
  } = useAvatarGroup({
    ...props,
    ref,
  });

  return (
    <Component {...getAvatarGroupProps()}>
      <AvatarGroupProvider value={context}>
        {clones}
        {remainingCount > 0 && renderCount(remainingCount)}
      </AvatarGroupProvider>
    </Component>
  );
});

AvatarGroup.displayName = "NextUI.AvatarGroup";

export default AvatarGroup;
