import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type Start = Node<{ label: string }, 'Start'>;
export type StartNode = Node<{ label: string }, 'StartNode'>;
export type EndNode = Node<{ label: string }, 'EndNode'>;
export type AppNode = BuiltInNode | PositionLoggerNode | Start | StartNode | EndNode;
