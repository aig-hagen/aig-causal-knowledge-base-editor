export type NodeProps = NodeCircle | NodeRect

export const enum NodeShape {
  CIRCLE = 'circle',
  RECTANGLE = 'rect',
}

export const enum SideType {
  RIGHT = 'RIGHT',
  BOTTOMRIGHT = 'BOTTOMRIGHT',
  BOTTOM = 'BOTTOM',
  BOTTOMLEFT = 'BOTTOMLEFT',
  LEFT = 'LEFT',
  TOPLEFT = 'TOPLEFT',
  TOP = 'TOP',
  TOPRIGHT = 'TOPRIGHT',
}

export interface NodeCircle {
  shape: NodeShape.CIRCLE
  radius: number
}

/**
 * Rectangular Node Properties.
 * A `width`-to-`height` ratio smaller than 1:10 is recommended as well as an `cornerRadius` between 0 and 4.
 *
 * *Regarding the `reflexiveEdgeStart` property:*
 * - *For ratios up to 1:3, both movable and fixed edges are visually fine*
 * - *For ratios between 1:3 and 1:10 prefer using fixed edges*
 * - *Avoid higher ratios, if you still use them, use fixed edges and avoid placing them from the short to the long side.*
 */
export interface NodeRect {
  shape: NodeShape.RECTANGLE
  width: number
  height: number
  cornerRadius: number
  reflexiveEdgeStart: 'MOVABLE' | SideType
}

export interface NodeSizeRect {
  width: number
  height: number
}
export interface NodeSizeCircle {
  radius: number
}

export type NodeSize = NodeSizeCircle | NodeSizeRect

export interface NodePosition {
  x: number
  y: number
}

export interface NodeGUIEditability {
  fixedPosition?: FixedAxis
  deletable?: boolean
  labelEditable?: boolean
  allowIncomingLinks?: boolean
  allowOutgoingLinks?: boolean
}

export interface FixedAxis {
  x: boolean
  y: boolean
}

export interface LinkGUIEditability {
  deletable?: boolean
  labelEditable?: boolean
}

export interface GraphConfiguration {
  // nodes
  nodeProps: NodeProps //also individual element option
  nodeGUIEditability: NodeGUIEditability //also individual element option
  nodeAutoGrowToLabelSize: boolean
  showNodeLabels: boolean
  nodePhysicsEnabled: boolean

  // links
  linkGUIEditability: LinkGUIEditability //also individual element option
  showLinkLabels: boolean
  fixedLinkDistanceEnabled: boolean

  // graph component
  allowNodeCreationViaGUI: boolean
  zoomEnabled: boolean

  // marker
  markerBoxSize: number
  markerPadding: number
  markerRef: number
  arrowPoints: [number, number][]
  markerPath: string

  //canvas
  readonly isCanvasBoundToView: boolean

  nodeGroupsFn: (id: number) => Set<number>
}

type GraphConfigurationInput = Partial<
  Pick<
    GraphConfiguration,
    | 'zoomEnabled'
    | 'nodePhysicsEnabled'
    | 'fixedLinkDistanceEnabled'
    | 'showNodeLabels'
    | 'showLinkLabels'
    | 'allowNodeCreationViaGUI'
    | 'nodeAutoGrowToLabelSize'
    | 'nodeProps'
    | 'nodeGUIEditability'
    | 'linkGUIEditability'
  >
>

export interface GraphComponent {
  toggleNodePhysics(isEnabled: boolean): void
  toggleZoom(isEnabled: boolean): void
  setDefaults(configInput: GraphConfigurationInput): void
  deleteElement(ids: string[] | number[] | string | number | undefined): void
  createNode(
    props: NodeProps,
    x?: number,
    y?: number,
    importedId?: string | number,
    label?: string,
    nodeColor?: string,
    hasFixedPosition?: {
      x: boolean
      y: boolean
    },
    isDeletableViaGUI?: boolean,
    isLabelEditableViaGUI?: boolean,
    allowIncomingLinks?: boolean,
    allowOutgoingLinks?: boolean,
  ): number
  setLabel(label: string, ids: string[] | number[] | string | number | undefined): void
  getNodeSize(id: number): NodeSize
  setNodeSize(size: NodeSize | number, ids: number[] | number | undefined): void
  getNodeFixedPosition(id: number): NodePosition
  setNodeFixedPosition(position: NodePosition, id: number): void
  setNodePosition(position: NodePosition, id: number): void
  setEditability(
    editability: NodeGUIEditability | LinkGUIEditability,
    ids: string[] | number[] | string | number | undefined,
  ): void
}
