import colors from "./colors";
import fontSizes from "./fontsizes";

const theme = {
  color: colors,
  fontSize: fontSizes,
};

export function generateFlex(
  direction = "column",
  justifyContent = "center",
  alignItems = "center"
) {
  return {
    display: "flex",
    flexDirection: direction,
    justifyContent: justifyContent,
    alignItems: alignItems,
  };
}

export function generateGrid(
  justifyContent = "center",
  alignItems = "center",
  gap = "1rem"
) {
  return {
    display: "grid",
    gridGap: gap,
    justifyContent: justifyContent,
    alignItems: alignItems,
  };
}

export function truncate(textOverflow = "ellipsis") {
  return {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: textOverflow,
  };
}

export function pseudo(display = "block", position = "absolute", content = "") {
  return {
    content: content,
    display: display,
    position: position,
  };
}

export function generateMediaQuery(minWidth, maxWidth) {
  return `@media screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
}

export function generateMediaQueryMin(minWidth) {
  return `@media screen and (min-width: ${minWidth}px)`;
}

export function generateMediaQueryMax(maxWidth) {
  return `@media screen and (max-width: ${maxWidth}px)`;
}

export default theme;
