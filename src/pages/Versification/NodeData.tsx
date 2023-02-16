import { CSSProperties } from 'react';

import { ThumbsUpIcon, ThumbsDownIcon, DiscussionIcon } from './icons';
import { OriginalLabel } from './OriginalLabel';
import { VersificationConfig } from '.';

export function NodeData({
  col = false,
  inline = false,
  label,
  config,
  style,
}: {
  col?: boolean;
  inline?: boolean;
  label?: string;
  config?: VersificationConfig;
  style?: CSSProperties;
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
        <div className="votes">
          <div className="vote vote--up">
            <ThumbsUpIcon />
            <span>42</span>
          </div>
          <div className="vote vote--down">
            <ThumbsDownIcon />
            <span>15</span>
          </div>
        </div>
        <div className="discussion">
          <DiscussionIcon />
        </div>
      </div>
    </div>
  );
}
