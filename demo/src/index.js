import React, {Component} from 'react';
import {render} from 'react-dom';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';

import MedicalImageViewer from '../../src/MedicalImageViewer';

const config = {
  webWorkerPath: '/js/cornerstoneWADOImageLoaderWebWorker.min.js',
  taskConfiguration: {
    decodeTask: {
      codecsPath: '/js/cornerstoneWADOImageLoaderCodecs.min.js',
    }
  }
};

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
cornerstoneWADOImageLoader.configure({
  beforeSend: (xhr) => {
    // add custom header here
    // xhr.setRequestHeader('APIKEY', 'my auth token')
  }
});

const containerStyles = {
  display: 'flex',
  alignItems: 'stretch',
  height: '100%',
};
const workspaceStyles = {
  flex: '1',
  backgroundColor: 'black',
  overflow: 'hidden',
};
const sidebarStyles = {
  width: "200px",
  backgroundColor: 'grey',
  padding: '5px',
};

class Demo extends Component {
  render() {
    return (
      <div style={containerStyles}>
        <div style={workspaceStyles}>
          <MedicalImageViewer 
            url="wadouri:http://localhost:3000/dicom/series-000002/image-000010.dcm"
          />
        </div>
        <div style={sidebarStyles}>
          <h3>Tools</h3>
        </div>
      </div>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
