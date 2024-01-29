import { Node } from 'reactflow';

export interface OrgChartNode<T = Record<string, unknown>> extends Node<T> {
  ocRightNodeId?: string;
  ocLeftNodeId?: string;
  ocTopNodeId?: string;
  ocBottomNodeId?: string;
  ocEdgeRightNodeId?: string;
  ocEdgeLeftNodeId?: string;
  ocEdgeTopNodeId?: string;
  ocEdgeBottomNodeId?: string;
  ocChildrenIds?: string[];
}
