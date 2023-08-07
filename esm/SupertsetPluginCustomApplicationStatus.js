var _templateObject;

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

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
import { LightenDarkenColor } from 'lighten-darken-color'; // The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled
// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

var Styles = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n/* background-color: ", ";*/\n  padding: ", "px;\n  border-radius: ", "px;\n  height: ", "px;\n  width: ", "px;\n\n  h3 {\n    /* You can use your props to control CSS! */\n    margin-top: 0;\n    margin-bottom: ", "px;\n    font-size: ", "px;\n    font-weight: ", ";\n  }\n\n  pre {\n    height: ", "px;\n  }\n"])), _ref => {
  var {
    theme
  } = _ref;
  return theme.colors.secondary.light2;
}, _ref2 => {
  var {
    theme
  } = _ref2;
  return theme.gridUnit * 4;
}, _ref3 => {
  var {
    theme
  } = _ref3;
  return theme.gridUnit * 2;
}, _ref4 => {
  var {
    height
  } = _ref4;
  return height;
}, _ref5 => {
  var {
    width
  } = _ref5;
  return width;
}, _ref6 => {
  var {
    theme
  } = _ref6;
  return theme.gridUnit * 3;
}, _ref7 => {
  var {
    theme,
    headerFontSize
  } = _ref7;
  return theme.typography.sizes[headerFontSize];
}, _ref8 => {
  var {
    theme,
    boldText
  } = _ref8;
  return theme.typography.weights[boldText ? 'bold' : 'normal'];
}, _ref9 => {
  var {
    theme,
    headerFontSize,
    height
  } = _ref9;
  return height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize];
});
/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupertsetPluginCustomApplicationStatus(props) {
  var _props$formData;

  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  var {
    data,
    height,
    width
  } = props;
  var rootElem = /*#__PURE__*/createRef(); // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.

  useEffect(() => {
    var root = rootElem.current;
    console.log('Plugin element', root);
  });
  var sum = 0;
  data && data.forEach(element => {
    sum += Number(element.count);
  });
  var sortKey = props == null ? void 0 : (_props$formData = props.formData) == null ? void 0 : _props$formData.cols[1];
  sortKey && data.sort((a, b) => Number(a[sortKey]) - Number(b[sortKey]));

  var getchartData = (chart, index) => {
    if (index == 0) {
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    } else {
      var _props$formData2, _props$formData3, _props$formData4;

      var transformValue = 100 * Number(index);
      var transform = "translate(" + transformValue + ")";
      var cx = Number(index) * 25 + 65;
      var textX = Number(index) * 25 + 50;
      var lineX1 = 244 + (Number(index) - 1) * 125;
      var lineX2 = lineX1 + 20;
      var circleColor = LightenDarkenColor('#AD81EA', -chart[(_props$formData2 = props.formData) == null ? void 0 : _props$formData2.metrics[0]] * 10);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
        transform: transform
      }, /*#__PURE__*/React.createElement("circle", {
        fill: circleColor,
        cx: cx,
        cy: "70",
        r: "50",
        opacity: "1",
        stroke: "#000",
        "stroke-width": "3"
      }), /*#__PURE__*/React.createElement("text", {
        x: textX + 10,
        y: "75",
        "font-family": "Open Sans Condensed",
        "font-size": "26",
        stroke: "none",
        fill: "#fff",
        "font-weight": "bold"
      }, chart[(_props$formData3 = props.formData) == null ? void 0 : _props$formData3.metrics[0]], /*#__PURE__*/React.createElement("tspan", {
        x: textX,
        dy: "18",
        "font-size": "20",
        "font-weight": "100"
      }, "/", sum)), /*#__PURE__*/React.createElement("text", {
        x: textX + 10,
        y: "175",
        "font-family": "Open Sans Condensed",
        "font-size": "16",
        stroke: "none",
        fill: "#000",
        "font-weight": "bold"
      }, " ", chart[(_props$formData4 = props.formData) == null ? void 0 : _props$formData4.cols[0]])), data && data.length > Number(index) && /*#__PURE__*/React.createElement("line", {
        x1: lineX1,
        x2: lineX2,
        y1: "65 ",
        y2: "65",
        "stroke-width": "2",
        stroke: "#443c3d",
        "stroke-dasharray": "2,1"
      }));
    }
  };

  var viewportSize;
  var vWidth = (data == null ? void 0 : data.length) * 150;
  viewportSize = "0 0 " + vWidth + " 600";
  return /*#__PURE__*/React.createElement(Styles, {
    ref: rootElem,
    boldText: props.boldText,
    headerFontSize: props.headerFontSize,
    height: height,
    width: width
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: viewportSize,
    overflow: "auto"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("g", {
    transform: "translate(-5)"
  }, /*#__PURE__*/React.createElement("circle", {
    fill: "#fff",
    cx: "75",
    cy: "70",
    r: "50",
    opacity: "1",
    stroke: "#000",
    "stroke-width": "3"
  }), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "75",
    "font-family": "Open Sans Condensed",
    "font-size": "26",
    stroke: "none",
    fill: "#000",
    "font-weight": "bold"
  }, sum), /*#__PURE__*/React.createElement("text", {
    x: "50",
    y: "175",
    "font-family": "Open Sans Condensed",
    "font-size": "16",
    stroke: "none",
    fill: "#000",
    "font-weight": "bold"
  }, "Total")), /*#__PURE__*/React.createElement("line", {
    x1: "120",
    x2: "140",
    y1: "65",
    y2: "65",
    "stroke-width": "2",
    stroke: "#443c3d",
    "stroke-dasharray": "2,1"
  })), data && data.map((res, i) => {
    return getchartData(res, i + 1);
  })));
}