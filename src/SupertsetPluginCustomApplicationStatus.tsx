/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { SupertsetPluginCustomApplicationStatusProps, SupertsetPluginCustomApplicationStatusStylesProps } from './types';
import { LightenDarkenColor } from 'lighten-darken-color';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SupertsetPluginCustomApplicationStatusStylesProps>`
/* background-color: ${({ theme }) => theme.colors.secondary.light2};*/
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) => (
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]
    )}px;
  }
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupertsetPluginCustomApplicationStatus(props: SupertsetPluginCustomApplicationStatusProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { data, height, width } = props;

  const rootElem = createRef<HTMLDivElement>();
  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  let sum = 0;
  data && data.forEach(element => {
    sum += Number(element.count);
  });
  let sortKey = props?.formData?.cols[1]

  sortKey && data.sort((a, b) => Number(a[sortKey]) - Number(b[sortKey]));

  const getchartData = (chart:any,index:Number) => {
    if(index == 0){
      return(
      <>
      </>
      )
    }
    else {
      let transformValue = 100 * Number(index) ;
      let transform = `translate(${transformValue })`;
      let cx = Number(index) * 25 + 65;
      let textX = Number(index) * 25 + 50;
      let lineX1 = 244 + (Number(index) - 1) * 125 ;
      let lineX2 = lineX1 + 20 ;
      let circleColor = LightenDarkenColor('#AD81EA', - chart[props.formData?.metrics[0]] * 10)
      return(
      <>
        <g transform={transform}>
        <circle fill= {circleColor} cx={cx} cy="70" r="50" opacity="1" stroke="#000" stroke-width="3"/>
        <text x={textX + 10} y="75" font-family="Open Sans Condensed" font-size="26" stroke="none" fill="#fff" font-weight="bold">{chart[props.formData?.metrics[0]]}<tspan x={textX} dy="18" font-size="20" font-weight="100">/{sum}</tspan>
        </text>
        <text x={textX + 10} y="175" font-family="Open Sans Condensed" font-size="16" stroke="none" fill="#000" font-weight="bold"> {chart[props.formData?.cols[0]]}</text>
        </g>
          {data && data.length > Number(index) && <line x1={lineX1} x2={lineX2} y1="65 " y2="65" stroke-width="2" stroke="#443c3d" stroke-dasharray="2,1" />}
      </>
      )

    }
  }

  let viewportSize;
  let vWidth = data?.length * 150 ;
  viewportSize = `0 0 ${vWidth} 600`;

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
        <svg viewBox={viewportSize} overflow="auto">
          <>
        <g transform="translate(-5)">
          <circle fill="#fff" cx="75" cy="70" r="50" opacity="1" stroke="#000" stroke-width="3"/>
          <text x="60" y="75" font-family="Open Sans Condensed" font-size="26" stroke="none" fill="#000" font-weight="bold">{sum}</text>
          <text x="50" y="175" font-family="Open Sans Condensed" font-size="16" stroke="none" fill="#000" font-weight="bold">Total</text>
         </g>
           <line x1="120" x2="140" y1="65" y2="65" stroke-width="2" stroke="#443c3d" stroke-dasharray="2,1" />

        </>
          {data && data.map((res,i)=>{
            return getchartData(res,i+1)
          })}
        </svg>
    </Styles>
  );
}
