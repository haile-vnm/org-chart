'use client';
import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Connection } from 'reactflow';

import 'reactflow/dist/base.css';

import EmployeeNode from './employee-node';

const nodeTypes = {
  custom: EmployeeNode,
};

const initNodes = [
  {
    id: '1',
    type: 'custom',
    data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'custom',
    data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },

    position: { x: -200, y: 200 },
  },
  {
    id: '21',
    type: 'custom',
    data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },
    position: { x: -400, y: 200 },
  },
  {
    id: '22',
    type: 'custom',
    data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },
    position: { x: -600, y: 200 },
  },
  {
    id: '3',
    type: 'custom',
    data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
    position: { x: 200, y: 200 },
  },
  {
    id: '4',
    type: 'custom',
    data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
    position: { x: 400, y: 200 },
  },
  {
    id: '5',
    type: 'custom',
    data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
    position: { x: 600, y: 200 },
  },
];

const initEdges = [
  {
    id: 'e1-2',
    type: 'smoothstep',
    source: '1',
    target: '2',
  },
  {
    id: 'e1-3',
    type: 'smoothstep',
    source: '1',
    target: '3',
  },
  {
    id: 'e1-4',
    type: 'smoothstep',
    source: '1',
    target: '4',
  },
  {
    id: 'e1-5',
    type: 'smoothstep',
    source: '1',
    target: '5',
  },
  {
    id: 'e1-21',
    type: 'smoothstep',
    source: '1',
    target: '21',
  },
  {
    id: 'e1-22',
    type: 'smoothstep',
    source: '1',
    target: '22',
  },
];

const proOptions = { hideAttribution: true };
export const OrgChart = () => {
  const [nodes, _setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      proOptions={proOptions}
      className="bg-teal-50"
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};
