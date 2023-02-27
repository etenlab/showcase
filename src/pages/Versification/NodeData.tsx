import { CSSProperties } from 'react';

import { ThumbsUpIcon, ThumbsDownIcon, DiscussionIcon } from './icons';
import { OriginalLabel } from './OriginalLabel';
import { VersificationConfig } from './types';

export function NodeData({
  col = false,
  inline = false,
  label,
  config,
  style,
  upVotes = 0,
  downVotes = 0,
  posts = 0,
}: {
  col?: boolean;
  inline?: boolean;
  label?: string;
  config?: VersificationConfig;
  style?: CSSProperties;
  upVotes: number;
  downVotes: number;
  posts: number;
}) {
  return (
    <div
      className={`node-data${inline ? ' inline-flex' : ''}${
        col ? ' node-data--col' : ''
      }`}
      style={style}
    >
      {label && (
        <>
          {!config ? (
            <strong>{label}</strong>
          ) : (
            <OriginalLabel value={label} config={config} />
          )}
        </>
      )}
      <div className="node-data-badges">
        <div className="node-data-badge node-data-badge--success">
          <ThumbsUpIcon />
          {upVotes > 0 && <span>{upVotes}</span>}
        </div>
        <div className="node-data-badge node-data-badge--danger">
          <ThumbsDownIcon />
          {downVotes > 0 && <span>{downVotes}</span>}
        </div>
        <div className="node-data-badge">
          <DiscussionIcon />
          {posts > 0 && <span>{posts}</span>}
        </div>
      </div>
    </div>
  );
}
