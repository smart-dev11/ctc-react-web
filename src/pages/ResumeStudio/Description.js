/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';
import EllipsisTrigger from './EllipsisTrigger';
import Highlighter from 'react-highlight-words';

export default ({ description, keywords, maxLines = 15, ...props }) => {
  const [expanded, setExpanded] = useState(false);
  const ellipsisStyle = expanded
    ? {}
    : {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: `${maxLines}`,
      };

  console.log(description);
  return (
    <div>
      <Highlighter
        sx={{
          '*': {
            fontSize: 2,
          },
          whiteSpace: 'pre-line',
          wordBreak: 'break-word',
          ...ellipsisStyle,
          '.keyword-highlight': {
            bg: 'primary',
            color: 'white',
          },
        }}
        highlightClassName="keyword-highlight"
        searchWords={keywords}
        textToHighlight={description}
        {...props}
      >
        {description}
      </Highlighter>
      <div sx={{ textAlign: 'center', mb: 3 }}>
        <EllipsisTrigger
          expanded={expanded}
          setExpanded={setExpanded}
        ></EllipsisTrigger>
      </div>
    </div>
  );
};
