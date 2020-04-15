/** @jsx jsx */
import { jsx } from 'theme-ui';
import Keyword from './Keyword';
import { useState } from 'react';
import EllipsisTrigger from './EllipsisTrigger';

export default ({ keywords, maxLines = 3 }) => {
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
        {keywords.map((keyword) => (
          <Keyword key={keyword}>{keyword}</Keyword>
        ))}
      </div>
      <div sx={{ textAlign: 'center', mb: 3 }}>
        <EllipsisTrigger
          expanded={expanded}
          setExpanded={setExpanded}
        ></EllipsisTrigger>
      </div>
    </div>
  );
};
