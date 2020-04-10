/** @jsx jsx */
import { jsx } from 'theme-ui';
import Keyword from './Keyword';
import { useState } from 'react';
import Link from '../../components/Link';

export default ({ keywords, maxLines = 4 }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div
        sx={
          expanded
            ? {}
            : {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: `${maxLines}`,
                color: 'transparent',
              }
        }
      >
        {keywords.split(', ').map((keyword) => (
          <Keyword key={keyword}>{keyword}</Keyword>
        ))}
      </div>

      <div sx={{ textAlign: 'center', mb: 3 }}>
        {expanded ? (
          <Link color="primary" onClick={() => setExpanded(false)}>
            Less
          </Link>
        ) : (
          <Link sx={{ fontSize: 4 }} onClick={() => setExpanded(true)}>
            <i className="fas fa-ellipsis-h"></i>
          </Link>
        )}
      </div>
    </div>
  );
};
