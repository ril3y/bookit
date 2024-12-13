import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { MindMapController } from './MindMapController';

const MindMap = () => {
  const [elements, setElements] = useState([
    // Nodes
    { data: { id: 'root', label: 'Story' }, classes: 'root' },
    { data: { id: 'plots', label: 'Plots' }, classes: 'category' },
    { data: { id: 'characters', label: 'Characters' }, classes: 'category' },
    { data: { id: 'events', label: 'Events' }, classes: 'category' },
    { data: { id: 'themes', label: 'Themes' }, classes: 'category' },
    { data: { id: 'settings', label: 'Settings' }, classes: 'category' },
    // Edges
    { data: { id: 'e1', source: 'root', target: 'plots' } },
    { data: { id: 'e2', source: 'root', target: 'characters' } },
    { data: { id: 'e3', source: 'root', target: 'events' } },
    { data: { id: 'e4', source: 'root', target: 'themes' } },
    { data: { id: 'e5', source: 'root', target: 'settings' } }
  ]);

  const layout = {
    name: 'concentric',
    fit: true,
    padding: 50,
    startAngle: 3 / 2 * Math.PI,
    sweep: undefined,
    clockwise: true,
    equidistant: false,
    minNodeSpacing: 10,
    boundingBox: undefined,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
    spacingFactor: 0.75,
    concentric: function(node) {
      if (node.data('id') === 'root') return 2;
      return 1;
    },
    levelWidth: function() { return 1; },
    animate: false,
    animationDuration: 500,
    animationEasing: undefined,
    ready: undefined,
    stop: undefined
  };

  const stylesheet = [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(label)',
        'color': '#fff',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '12px',
        'width': '80px',
        'height': '80px',
        'text-wrap': 'wrap',
        'text-max-width': '70px',
        'padding': '10px'
      }
    },
    {
      selector: 'node.root',
      style: {
        'background-color': '#4CAF50',
        'font-size': '14px',
        'font-weight': 'bold',
        'width': '100px',
        'height': '100px'
      }
    },
    {
      selector: 'node.category',
      style: {
        'background-color': '#2196F3',
        'width': '90px',
        'height': '90px'
      }
    }
  ];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <CytoscapeComponent
        elements={elements}
        layout={layout}
        stylesheet={stylesheet}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default MindMap;