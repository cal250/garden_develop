import { linkAnchorClasses } from "@nextui-org/theme";

import { useLink, UseLinkProps } from "./use-link";
import { LinkIcon } from "@/components/atoms/icons";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface LinkProps extends UseLinkProps {}

const Link = withPolygon<LinkProps, "a">((Polygon, props, ref) => {
  const {
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon className={linkAnchorClasses} />,
    getLinkProps,
  } = useLink({
    ref,
    ...props,
  });

  return (
    <Polygon {...getLinkProps()}>
      {children}
      {showAnchorIcon && anchorIcon}
    </Polygon>
  );
}, "a");

Link.displayName = "NextUI.Link";

export default Link;
