
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { HemisphericLight, ArcRotateCamera, Scene, Engine, Vector3, ExecuteCodeAction, ActionManager, StandardMaterial, Color3} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu' //import anu, this project is using a local import of babylon js located at ../babylonjs-anu this may not be the latest version and is used for simplicity.
import * as d3 from "d3";
import iris from './data/iris.json' assert {type: 'json'};  //Our data

//Grab DOM element where we will attach our canvas. #app is the id assigned to an empty <div> in our index.html 
const app = document.querySelector('#app');
//Create a canvas element and append it to #app div
const canvas = document.createElement('canvas');
app.appendChild(canvas);

//initialize babylon engine, passing in our target canvas element, and create a new scene
const babylonEngine = new Engine(canvas, true)

//create a scene object using our engine
const scene = new Scene(babylonEngine)

//Add lights and a camera and basic env
new HemisphericLight('light1', new Vector3(0, 10, 0), scene)
const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
camera.position = new Vector3(-10, 10, -20)
camera.attachControl(true)

const env = scene.createDefaultEnvironment();
env.setMainColor(Color3.FromHexString('#0e0e17'));
env.ground.position = new Vector3(0, -2, 0);


//Create the D3 functions that we will use to scale our data dimensions to desired output ranges for our visualization
//In this case, we create scale functions that correspond to the x, y, and z positions
//nice() adds some padding to both ends of the scale
// let scaleX = d3.scaleLinear().domain(d3.extent(d3.map(iris, (d) => {return d.sepalLength}))).range([-0.5,0.5]).nice();


//We also create a scale function for the three types of flowers in our iris dataset
//ordinalChromatic() is an Anu helper function to create an array of hex colors, 'd310' specifies this to be schemecategory10 from D3
//toStandardMaterial() is an Anu helper function to convert an array of hex colors to their respective StandardMaterial from Babylon


//Create a Center of Transform TransformNode using create() that serves the parent node for all our meshes that make up our chart


//We need to make an Anu Selection separately, as create() does not return a Section but the created Babylon TransformNode



//Create sphere meshes for each row of our data and set their visual encodings using method chaining
//These spheres are created as children of the CoT due to chart.bind()
//Remember that in this case, 'CoT' is the Babylon TransformNode and 'chart' is the Anu Selection


//Use the createAxes() Anu helper function to create the axes for us based on our D3 scale functions


//WebXR Starter Code
try {
  var defaultXRExperience = await scene.createDefaultXRExperienceAsync({ floorMeshes: [env.ground] });

  defaultXRExperience.enterExitUI.overlay.style.position = 'relative';
  defaultXRExperience.enterExitUI.overlay.style.float = 'right';

  if (!defaultXRExperience.baseExperience) {
    console.log('No XR');
  } else {
    const featureManager = defaultXRExperience.baseExperience.featuresManager;

    if (!featureManager) {
      console.log('No Feature Manager');
    } else {
      defaultXRExperience.baseExperience.featuresManager.enableFeature(WebXRFeatureName.HAND_TRACKING, 'latest', {
        xrInput: defaultXRExperience.input,
      });
    }
  }
} catch {
  console.warn('XR Not Supported');
}

//Render the scene we created
babylonEngine.runRenderLoop(() => {
  scene.render()
})

//Listen for window size changes and resize the scene accordingly 
window.addEventListener("resize", function () {
  babylonEngine.resize();
});


// hide/show the Inspector
window.addEventListener("keydown", (ev) => {
  // Shift+Ctrl+Alt+I
  if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
      if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
      } else {
          scene.debugLayer.show();
      }
  }
});
