/*
 * Causal Knowledge Base Editor - A graphical application to reason with causal knowledge.
 *
 * Copyright (C) 2026  Artificial Intelligence Group at the Faculty of Mathematics and Computer Science of the FernUniversität in Hagen <https://www.fernuni-hagen.de/aig/en/>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { hasMoreThenOneEntry } from '@/modules/common/types'

export type NodeProps = NodeCircle | NodeRect

export type NodeId = number

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

export interface NodeAppearance {
  color?: string
  props?: NodeProps
  renderedSize?: NodeSize
}

export type jsonNode = {
  id: number | string
  x?: number
  y?: number
  label?: string
} & NodeGUIEditability &
  NodeAppearance

export type jsonLink = {
  sourceId: number | string
  targetId: number | string
  label?: string
  color?: string
} & LinkGUIEditability

export interface jsonGraph {
  nodes: jsonNode[]
  links: jsonLink[]
}

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
  setColor(color: string, ids: string[] | number[] | string | number | undefined): void
  getNodeSize(id: number): NodeSize
  setNodeSize(size: NodeSize | number, ids: number[] | number | undefined): void
  setNodeShape(shape: NodeShape, ids: number[] | number | undefined): void
  setNodeProps(nodeProps: NodeProps, ids: string[] | number[] | string | number | undefined): void
  getNodeFixedPosition(id: number): NodePosition
  setNodeFixedPosition(position: NodePosition, id: number): void
  setNodePosition(position: NodePosition, id: number): void
  setEditability(
    editability: NodeGUIEditability | LinkGUIEditability,
    ids: string[] | number[] | string | number | undefined,
  ): void
  getGraph(
    format: 'json' | 'tgf',
    includeNodePosition?: boolean,
    includeNodeProps?: boolean,
    includeColor?: boolean,
    includeEditability?: boolean,
    includeIdImported?: boolean,
  ): {
    nodes: { id: number; x?: number; y?: number; idImported?: number | string }[]
    links: { sourceId: number; targetId: number }[]
  }
  setGraph(graphToSet: string | jsonGraph | undefined): void
}

const enum EVENT_CAUSE {
  USER_ACTION = 'user-action',
  PROGRAMMATIC_ACTION = 'programmatic-action',
}

export interface NodeCreatedDetail {
  node: { id: number; label: string | undefined; x: number | undefined; y: number | undefined }
  cause: EVENT_CAUSE
}

export interface NodeDeletedDetail {
  node: { id: number; label: string | undefined; x: number | undefined; y: number | undefined }
  cause: EVENT_CAUSE
}

export interface LinkCreatedDetail {
  link: { id: string; label: string | undefined }
  cause: EVENT_CAUSE
}

export interface LinkDeletedDetail {
  link: { id: string; label: string | undefined }
  cause: EVENT_CAUSE
}

export interface NodeClickedDetail {
  node: { id: number; label: string | undefined; x: number | undefined; y: number | undefined }
  button: number
  originalEvent: Event
}

export interface LinkClickedDetail {
  link: { id: string; label: string | undefined }
  button: number
  originalEvent: Event
}

declare global {
  interface GlobalEventHandlersEventMap {
    nodecreated: CustomEvent<NodeCreatedDetail>
    nodedeleted: CustomEvent<NodeDeletedDetail>
    linkcreated: CustomEvent<LinkCreatedDetail>
    linkdeleted: CustomEvent<LinkDeletedDetail>
    nodeclicked: CustomEvent<NodeClickedDetail>
    linkclicked: CustomEvent<LinkClickedDetail>
  }
}

export function hasProgrammaticCause(event: CustomEvent<{ cause: EVENT_CAUSE }>): boolean {
  return event.detail.cause === EVENT_CAUSE.PROGRAMMATIC_ACTION
}

export function parseLinkId(linkId: string) {
  const linkParts = linkId.split('-')
  if (!hasMoreThenOneEntry(linkParts)) {
    throw new Error(`Link with ID \`${linkId}\` is not valid: Seperator \`-\` is not contained.`)
  }
  if (linkParts.length > 2) {
    throw new Error(
      `Link with ID \`${linkId}\` is not valid: Seperator \`-\` is contained more then once.`,
    )
  }
  const sourceId = parseInt(linkParts[0])
  const tragetId = parseInt(linkParts[1])
  if (!Number.isSafeInteger(sourceId))
    throw new Error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Link with ID \`${linkId}\` is not valid: Invalid source node ID ${sourceId}.`,
    )
  if (!Number.isSafeInteger(tragetId))
    throw new Error(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Link with ID \`${linkId}\` is not valid: Invalid target node ID ${tragetId}.`,
    )
  return {
    sourceId: sourceId,
    targetId: tragetId,
  }
}
