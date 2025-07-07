import React from "react";

export type Sides = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Point = [number, number];

export type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GradientStop = string | { offset: number; color: string };

interface Gradient {
  stops: Array<GradientStop>;
  type: "linear" | "radial";
}

export type PolygonPathsType = "interior" | "exterior" | "middle";

/**
 * Get the points of a regular polygon with a given number of sides.
 * @param sides
 * @param width
 * @param height
 */
export function getPolygonPoints(
  sides: Sides,
  width = 1,
  height = 1,
): Array<Point> {
  const points: [number, number][] = [];

  for (let i = 0; i < sides; i++) {
    points.push([
      width / 2 + (width / 2) * Math.cos((i * 2 * Math.PI) / sides),
      height / 2 + (height / 2) * Math.sin((i * 2 * Math.PI) / sides),
    ]);
  }

  return points;
}

export function getDistance(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
}

/**
 * Pick values from an object based on a predicate
 * @param obj
 * @param predicate
 */
export function pickBy<T extends Record<any, any>>(
  obj: T,
  predicate: <K extends keyof T>(value: T[K], key: K) => boolean,
): Partial<T> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) =>
      predicate(value, key as keyof T) ? { ...acc, [key]: value } : acc,
    {},
  );
}

/**
 * Remove undefined and null values from an object
 * @param obj
 */
export function compact<T extends Record<any, any>>(obj?: T): Partial<T> {
  if (!obj) return {};
  return pickBy(obj, (value) => value !== undefined && value !== null);
}

/**
 * Create a boundary object with default values.
 * @param boundary a boundary with values for outer, inner, radii, and chord or a single value to apply to all boundaries
 * @param defaultStroke the default stroke color
 * @param defaultStrokeWidth the default stroke width
 * @param isRadial whether the boundary is for the radial polygon or not
 */
export function createBoundary<T extends boolean>(
  boundary: Boundary | BoundaryProps,
  isRadial: T = false as T,
  defaultStroke?: string,
  defaultStrokeWidth?: number,
): T extends true ? RadialPolygonBoundary : SegmentBoundary {
  const keys = ["inner", "outer"].concat(
    isRadial ? ["radii", "chord"] : ["left", "right"],
  ) as Array<keyof Boundary>;

  const initial = (
    keys.find((key) => (boundary as any)?.[key])
      ? boundary
      : keys.reduce((acc, key) => ({ ...acc, [key]: boundary }), {} as Boundary)
  ) as Boundary;

  return keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        stroke: defaultStroke,
        strokeWidth: defaultStrokeWidth,
        ...(initial?.[key] as BoundaryProps),
      },
    }),
    {},
  ) as any;
}

export type BoundaryProps = {
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  zIndex?: number;
};

export interface Boundary {
  outer?: BoundaryProps;
  inner?: BoundaryProps;
}

export interface RadialPolygonBoundary extends Boundary {
  radii?: BoundaryProps;
  chord?: BoundaryProps;
}

export interface SegmentBoundary extends Boundary {
  left?: BoundaryProps;
  right?: BoundaryProps;
}

export interface SegmentData {
  content?: React.ReactNode;
  boundary?: SegmentBoundary | BoundaryProps;
  fill?: string;
  color?: string;
  className?: string;
}

export interface WedgeData extends Omit<SegmentData, "content"> {
  segments: Array<SegmentData>;
  hasFloatingLayer?: boolean;
  floatingLayerClassName?: string;
  floatingContent?: React.ReactNode;
  floatingContentClassName?: string;
  wedgeStyle?: React.CSSProperties;
}

type PolygonPointsType = {
  width: number;
  height: number;
  xCut?: number;
  type?: "full" | "top" | "bottom";
  aligned?: "left" | "right";
  angleType?: "hexagon" | "octagon";
};

type HexagonPointsType = {
  width: number;
  height: number;
  tipAngle?: number;
};

/**
 * Generates hexagon points
 */
export const generateHexagonPoints = ({
  width,
  height,
  tipAngle = 45,
}: HexagonPointsType): Array<Point> => {
  const yPosition = height / 2;
  const xPosition =
    yPosition * Math.tan((((180 - tipAngle) / 2) * Math.PI) / 180);

  return [
    [0, yPosition],
    [xPosition, height],
    [width - xPosition, height],
    [width, yPosition],
    [width - xPosition, 0],
    [xPosition, 0],
  ];
};

/**
 * Generates parallelogram points with alignment to determine the direction of inclination
 */
export const generateParallelogramPoints = ({
  width,
  height,
  aligned = "left",
}: PolygonPointsType): [number, number][] => {
  const xCut = height / Math.sqrt(3);
  let polygonPoints = [];

  if (aligned === "left") {
    polygonPoints = [
      { x: 0, y: 0 },
      { x: xCut, y: height },
      { x: width, y: height },
      { x: width - xCut, y: 0 },
    ];
  } else {
    polygonPoints = [
      { x: xCut, y: 0 },
      { x: 0, y: height },
      { x: width - xCut, y: height },
      { x: width, y: 0 },
    ];
  }

  return polygonPoints.map((point) => [point.x, point.y]);
};
/**
 * Generates trapezium points with alignment to determine the direction of inclination
 */
export const generateTrapeziumPoints = ({
  width,
  height,
  aligned = "left",
}: PolygonPointsType): [number, number][] => {
  const xCut = height / Math.sqrt(3);
  let polygonPoints = [];

  if (aligned === "left") {
    polygonPoints = [
      { x: 0, y: 0 },
      { x: xCut, y: height },
      { x: width, y: height },
      { x: width, y: 0 },
    ];
  } else {
    polygonPoints = [
      { x: 0, y: 0 },
      { x: 0, y: height },
      { x: width - xCut, y: height },
      { x: width, y: 0 },
    ];
  }

  return polygonPoints.map((point) => [point.x, point.y]);
};
/**
 * Creates a polygon path string from points and dimensions
 */
export const createPolygonClipPath = (
  points: [number, number][],
  width?: number,
  height?: number,
) => {
  function createValue(value: number, dimension?: number) {
    return dimension !== undefined
      ? `${(value / dimension) * 100}%`
      : `${value}px`;
  }

  return `polygon(${points
    .map(([x, y]) => `${createValue(x, width)} ${createValue(y, height)}`)
    .join(", ")})`;
};

/**
 * Normalizes points to fit within the width and height of the container
 * @param points an array of points
 * @param containerWidth the width of the container. If not provided, the width of the polygon points is used
 * @param containerHeight the height of the container. If not provided, the height of the polygon points is used
 * @param rotation the rotation of the polygon in degrees
 */
export const normalizePoints = (
  points: Array<Point>,
  containerWidth?: number,
  containerHeight?: number,
  rotation = 0,
) => {
  const rotatedPoints = points.map(([x, y]) => {
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    const distance = Math.sqrt(x ** 2 + y ** 2);
    const newAngle = angle + rotation;
    const newX = distance * Math.cos((newAngle * Math.PI) / 180);
    const newY = distance * Math.sin((newAngle * Math.PI) / 180);
    return [newX, newY] as Point;
  });

  const boundingBox = getBoundingBox(rotatedPoints);

  const width = containerWidth || boundingBox.width;
  const height = containerHeight || boundingBox.height;

  const normalizedPoints: Array<Point> = rotatedPoints.map(([x, y]) => [
    ((x - boundingBox.x) / boundingBox.width) * width,
    ((y - boundingBox.y) / boundingBox.height) * height,
  ]);

  const center = getCenter(normalizedPoints);
  return {
    points: normalizedPoints,
    center,
    width,
    height,
  };
};

/**
 * Normalizes points to fit within the width and height of the container and shrinks the polygon by the stroke width.
 * This is useful for ensuring that the stroke is drawn inside the polygon container.
 * @param points an array of points
 * @param strokeWidths the width of the stroke of each edge
 * @param containerWidth the width of the container. If not provided, the width of the polygon points is used
 * @param containerHeight the height of the container. If not provided, the height of the polygon points is used
 * @param rotation the rotation of the polygon in degrees
 */
export function normalizePointsWithStrokeInset(
  points: Array<Point>,
  strokeWidths: Array<number>,
  rotation = 0,
  containerWidth?: number,
  containerHeight?: number,
) {
  const {
    points: normalizedPoints,
    center,
    width,
    height,
  } = normalizePoints(points, containerWidth, containerHeight, rotation);

  const middlePoints = adjustPolygonForStroke(
    normalizedPoints,
    strokeWidths.map((stroke) => stroke / 2),
  );
  const interiorPoints = adjustPolygonForStroke(normalizedPoints, strokeWidths);

  return {
    exteriorPoints: normalizedPoints, // Points for the outer boundary
    middlePoints, // Points in the middle of the stroke
    interiorPoints, // Points for the inner boundary
    center,
    width,
    height,
  };
}

/**
 * Calculates the winding order of a polygon
 * @param points
 */
export function calculateWindingOrder(points: Array<Point>): boolean {
  let winding = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    winding += (x2 - x1) * (y2 + y1);
  }
  return winding > 0;
}

/**
 * Calculates the unit normal vector of an edge
 * @param p1
 * @param p2
 * @param direction the winding direction of the polygon
 */
export function calculateNormal(
  p1: Point,
  p2: Point,
  direction: number,
): Point {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];

  const length = Math.sqrt(dx ** 2 + dy ** 2);
  return [direction * (-dy / length), direction * (dx / length)];
}

/**
 * Function to calculate the intersection point of two lines
 * @param p1
 * @param p2
 * @param p3
 * @param p4
 */
export function calculateIntersection(
  p1: Point,
  p2: Point,
  p3: Point,
  p4: Point,
): Point | null {
  const denominator =
    (p4[1] - p3[1]) * (p2[0] - p1[0]) - (p4[0] - p3[0]) * (p2[1] - p1[1]);
  if (Math.abs(denominator) < 1e-10) return null; // Lines are parallel or coincident

  const t =
    ((p4[0] - p3[0]) * (p1[1] - p3[1]) - (p4[1] - p3[1]) * (p1[0] - p3[0])) /
    denominator;

  return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
}

/**
 * Function to adjust the polygon points to account for stroke width.
 * @param points an array of points
 * @param strokeWidths the width of the stroke of each edge
 * @param inset whether to inset or outset the polygon. Default is true.
 */
export function adjustPolygonForStroke(
  points: Point[],
  strokeWidths: Array<number>,
  inset: boolean = true,
): Point[] {
  const n = points.length;
  const adjustedPoints: Point[] = [];
  const scale = inset ? -1 : 1; // Determine direction for insetting or outsetting
  const direction = calculateWindingOrder(points) ? 1 : -1;

  // Loop through each vertex in the polygon
  for (let i = 0; i < n; i++) {
    const prevIndex = (i - 1 + n) % n; // Previous vertex index
    const nextIndex = (i + 1) % n; // Next vertex index

    const p0 = points[prevIndex]; // Previous vertex
    const p1 = points[i]; // Current vertex
    const p2 = points[nextIndex]; // Next vertex

    const strokeWidthPrev = strokeWidths[prevIndex]; // Stroke width for the previous edge
    const strokeWidthCurr = strokeWidths[i]; // Stroke width for the current edge

    // Calculate normals for the two edges meeting at this vertex
    const normalPrev = calculateNormal(p0, p1, direction);
    const normalNext = calculateNormal(p1, p2, direction);

    // Offset the edges using their normals and stroke widths
    const offsetPrev: Point = [
      p1[0] + (normalPrev[0] * (scale * strokeWidthPrev)) / 2,
      p1[1] + (normalPrev[1] * (scale * strokeWidthPrev)) / 2,
    ];
    const offsetNext: Point = [
      p1[0] + (normalNext[0] * (scale * strokeWidthCurr)) / 2,
      p1[1] + (normalNext[1] * (scale * strokeWidthCurr)) / 2,
    ];

    // Find the intersection of the two offset edges
    const intersection = calculateIntersection(p0, offsetPrev, p2, offsetNext);

    if (intersection) {
      adjustedPoints.push(intersection);
    } else {
      // Fallback: Use midpoint of the offset edges
      adjustedPoints.push([
        (offsetPrev[0] + offsetNext[0]) / 2,
        (offsetPrev[1] + offsetNext[1]) / 2,
      ]);
    }
  }

  return adjustedPoints;
}

/**
 * Get the bounding box of a set of points
 * @param points
 */
export function getBoundingBox(points: Point[]): Rectangle {
  const vertices = points.reduce(
    (acc, [x, y]) => {
      return {
        left: Math.min(acc.left, x),
        top: Math.min(acc.top, y),
        right: Math.max(acc.right, x),
        bottom: Math.max(acc.bottom, y),
      };
    },
    { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity },
  );

  return {
    x: vertices.left,
    y: vertices.top,
    width: vertices.right - vertices.left,
    height: vertices.bottom - vertices.top,
  };
}

/**
 * Get the center of a set of points
 * @param points an array of points
 */
export function getCenter(points: Point[]): Point {
  return points
    .reduce(
      (acc, [x, y]) => {
        acc[0] += x;
        acc[1] += y;
        return acc;
      },
      [0, 0] as Point,
    )
    .map((val) => val / points.length) as Point;
}

/**
 * Given an array of boundary objects or a string of stroke colors, create an array of boundary objects
 *
 * For example, the following array of boundary objects:
 * [
 *   "red",
 *   { stroke: "blue", strokeWidth: 2 },
 * ]
 *
 * will be converted to: [ { stroke: "red" }, { stroke: "blue", strokeWidth: 2 } ]
 *
 * @param borderStyle an array of boundary objects or a string of stroke colors
 * @param sides the number of sides of the polygon
 * @param defaultStroke the default stroke color
 * @param defaultStrokeWidth the default stroke width
 */
export function createBorderStyle(
  borderStyle: Array<BoundaryProps | string>,
  sides: number,
  defaultStroke?: string,
  defaultStrokeWidth?: number,
): Array<
  BoundaryProps & Required<Pick<BoundaryProps, "stroke" | "strokeWidth">>
> {
  return borderStyle
    .concat(
      Array(Math.abs(sides - borderStyle.length)).fill({
        stroke: defaultStroke,
        strokeWidth: defaultStrokeWidth,
      }),
    )
    .map((style) => {
      if (typeof style === "string") {
        return { stroke: style, strokeWidth: defaultStrokeWidth };
      }
      return {
        stroke: defaultStroke,
        strokeWidth: defaultStrokeWidth,
        ...compact(style),
      };
    }) as any;
}

/**
 * Get the inscribed rectangle of a polygon
 * @param points
 */
export function inscribedRectangle(points: Array<Point>): Rectangle {
  const boundingBox = getBoundingBox(points);

  boundingBox.y += 2;
  boundingBox.height -= 4;
  // reduce the width of the box until it fits inside the polygon
  while (!isInscribed(points, boundingBox) && boundingBox.width > 1) {
    boundingBox.x += 0.5;
    boundingBox.width -= 1;
  }

  return boundingBox;
}

/**
 * Check if a point is inside a polygon
 * @param points
 * @param point
 */
export function containsPoint(points: Array<Point>, point: Point) {
  const [px, py] = point;
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i][0];
    const yi = points[i][1];
    const xj = points[j][0];
    const yj = points[j][1];

    // Ray-casting algorithm: Count the number of crossings
    const intersects =
      yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;

    if (intersects) inside = !inside;
  }

  return inside;
}

export function isInscribed(points: Array<Point>, rectangle: Rectangle) {
  const { x, y, width, height } = rectangle;
  return (
    containsPoint(points, [x, y]) &&
    containsPoint(points, [x + width, y]) &&
    containsPoint(points, [x + width, y + height]) &&
    containsPoint(points, [x, y + height])
  );
}

export function createSVGPath(points: Array<Point>): string {
  return (
    points
      .map(([x, y], index) => {
        return `${index === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ") + " Z"
  );
}

/**
 * This function computes the length of a line or the percentage of a line based on the maximum length. If the length is less than 1, it is treated as a percentage.
 * It ensures that the length is within the bounds of 0 and the maximum length.
 *
 * @param lengthOrPercent
 * @param maxLength
 */
export function computeLength(lengthOrPercent: number, maxLength: number) {
  return lengthOrPercent <= 1
    ? maxLength * Math.max(0, Math.min(lengthOrPercent, 1))
    : Math.min(lengthOrPercent, maxLength);
}

export function extractBackgroundStyles(
  style: React.CSSProperties,
): [React.CSSProperties, React.CSSProperties] {
  const backgroundStyles: Record<string, any> = {};
  const otherStyles: Record<string, any> = {};
  const backgroundKeys = [
    "background",
    "backgroundColor",
    "backgroundImage",
    "backgroundSize",
    "backgroundPosition",
    "backgroundRepeat",
    "backgroundClip",
    "backgroundAttachment",
    "backgroundOrigin",
    "backgroundBlendMode",
  ];

  for (const _key in style) {
    const key = _key as keyof React.CSSProperties;

    if (backgroundKeys.includes(key)) {
      backgroundStyles[key] = style[key];
    } else {
      otherStyles[key] = style[key];
    }
  }

  return [backgroundStyles, otherStyles];
}

/**
 * This function computes the miter length of a stroke based on the stroke width and angle.
 * @param strokeWidth
 * @param angle
 */
export function computeMiterLength(strokeWidth: number, angle: number): number {
  const miterAngle = 180 - angle;
  return (strokeWidth * 2) / Math.sin((miterAngle / 2) * (Math.PI / 180));
}
