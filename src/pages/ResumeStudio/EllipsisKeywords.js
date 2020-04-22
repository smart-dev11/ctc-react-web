/** @jsx jsx */
import { jsx } from "theme-ui";
import Keyword from "./Keyword";
import { useState } from "react";
import EllipsisTrigger from "./EllipsisTrigger";
import CardTitle from "./CardTitle";

export default ({
  title,
  info,
  keywords,
  maxLines = 3,
  onHoverKeyword = () => {},
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          mb: 4,
        }}
      >
        <CardTitle>{title}</CardTitle>
        <CardTitle>{info}</CardTitle>
      </div>
      <div
        sx={
          expanded
            ? {}
            : {
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: `${maxLines}`,
                color: "transparent",
              }
        }
      >
        {keywords.map((keyword, index) => (
          <Keyword
            key={index}
            onMouseEnter={() => onHoverKeyword(keyword)}
            onMouseLeave={() => onHoverKeyword("")}
          >
            {keyword.value}
          </Keyword>
        ))}
      </div>
      <div sx={{ textAlign: "center", mb: 3 }}>
        <EllipsisTrigger
          expanded={expanded}
          setExpanded={setExpanded}
        ></EllipsisTrigger>
      </div>
    </div>
  );
};
