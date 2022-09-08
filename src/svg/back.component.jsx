import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BackSvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={20}
      fill="none"
      viewBox="0 0 10 20"
      {...props}
    >
      <Path
        fill="#fff"
        d="M8.34 20a1.43 1.43 0 01-1.114-.529l-6.901-8.57a1.428 1.428 0 010-1.814L7.469.516a1.43 1.43 0 012.2 1.828l-6.386 7.657 6.172 7.656A1.428 1.428 0 018.341 20z"
      />
    </Svg>
  );
}

export default BackSvgComponent;
