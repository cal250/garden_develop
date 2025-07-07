import { Rexagon, RexagonProps } from '@/components/atoms/polygon/rexagon'
import { twMerge } from 'tailwind-merge'
import { withPolygon } from '@/components/utils/react/polymorphism'

/**
 * A header card displays a title inside a hexagon. It displays a `BracketedText` component.
 * It can also display octagon nodes at the tips.
 */
export const TopHeaderCard = withPolygon<TopHeaderCardProps>(
  (Polygon, { as = 'div', title, ...props }) => {
    return (
      <Polygon {...props} as={as} className={twMerge('bg-color-3 text-center', props.className)}>
        <h4 className="font-extrabold text-white/50 text-base leading-[100%]">
          {title ?? 'ecosystems'}
        </h4>
        ,
      </Polygon>
    )
  },
  'div',
  Rexagon,
)

export type TopHeaderCardProps = RexagonProps & {
  title?: string
}
