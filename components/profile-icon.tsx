/**
 * REACT NATIVE VERSION - Profile Icon Components using react-native-svg
 * 
 * Installation required:
 * npm install react-native-svg
 */

import React from 'react';
import Svg, { G, Line, Path } from 'react-native-svg';

export function ArrowLeftIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G transform="rotate(90 12 12)">
        <Line
          x1="6.77"
          y1="15.75"
          x2="6.77"
          y2="0.75"
          stroke="#130F26"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.799 9.7002L6.775 15.7502L0.75 9.7002"
          stroke="#130F26"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}

export function EditIcon() {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M13.5 4.32843H4.16667C3.45942 4.32843 2.78115 4.60938 2.28105 5.10948C1.78095 5.60957 1.5 6.28785 1.5 6.99509V25.6618C1.5 26.369 1.78095 27.0473 2.28105 27.5474C2.78115 28.0475 3.45942 28.3284 4.16667 28.3284H22.8333C23.5406 28.3284 24.2189 28.0475 24.719 27.5474C25.219 27.0473 25.5 26.369 25.5 25.6618V16.3284M23.5 2.32843C24.0304 1.79799 24.7499 1.5 25.5 1.5C26.2501 1.5 26.9696 1.79799 27.5 2.32843C28.0304 2.85886 28.3284 3.57828 28.3284 4.32843C28.3284 5.07857 28.0304 5.79799 27.5 6.32843L14.8333 18.9951L9.5 20.3284L10.8333 14.9951L23.5 2.32843Z"
        stroke="#1E1E1E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DotIcon() {
  return (
    <Svg width="6" height="6" viewBox="0 0 6 6" fill="none">
      <G id="Frame 33">
        <G id="Ellipse 8" />
      </G>
    </Svg>
  );
}