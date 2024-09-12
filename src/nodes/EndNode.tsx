
import { Handle, Position, type NodeProps } from '@xyflow/react';

import { type EndNode} from './types';

export function EndNode({
  positionAbsoluteX,
  positionAbsoluteY,
  data,
}: NodeProps<EndNode>) {
  const x = `${Math.round(positionAbsoluteX)}px`;
  const y = `${Math.round(positionAbsoluteY)}px`;

  return (
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <div>
        {x} {y}
      </div>

      <Handle type="target" position={Position.Top} />
    </div>
  );
}
