import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Sticky footer styles
--------------------------------------------------
  'html': {
    'position': 'relative',
    'minHeight': [{ 'unit': '%V', 'value': 1 }]
  },
  'body': {
    // Margin bottom by footer height
    'marginBottom': [{ 'unit': 'px', 'value': 60 }]
  },
  'footer': {
    'position': 'absolute',
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    // Set the fixed height of the footer here
    'height': [{ 'unit': 'px', 'value': 60 }],
    'backgroundColor': '#f5f5f5'
  },
  // Custom page CSS
--------------------------------------------------
  // Not required for template or sticky footer method.
  'body > container': {
    'padding': [{ 'unit': 'px', 'value': 60 }, { 'unit': 'px', 'value': 15 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 15 }]
  },
  'container text-muted': {
    'margin': [{ 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 0 }]
  },
  'footer > container': {
    'paddingRight': [{ 'unit': 'px', 'value': 15 }],
    'paddingLeft': [{ 'unit': 'px', 'value': 15 }]
  },
  'code': {
    'fontSize': [{ 'unit': '%V', 'value': 0.8 }]
  }
});
