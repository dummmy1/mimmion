// import './style.css';


import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 2000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const loader = new GLTFLoader();

loader.load( 'models/donny.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
scene.scale.set(0.1, 0.1, 0.1);

renderer.outputEncoding = THREE.sRGBEncoding;

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);



const spaceTexture = new THREE.TextureLoader().load('images/minion.jpg');
scene.background = spaceTexture;



const catTexture = new THREE.TextureLoader().load('https://i5.walmartimages.com/asr/43c1dfa6-774e-43e7-b92a-647068a739e5.f21b4b969359f2f47c21d8f0f1a3b190.jpeg');

const cat = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: catTexture})
);

scene.add(cat);
//scene.position.y = -25;


cat.scale.set(20, 20, 20);
cat.position.y = -70;
// cat.position.x = -90;
camera.position.y = -300;


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  cat.rotation.x += 0.05;
  cat.rotation.y += 0.075;
  cat.rotation.z += 0.05;

  scene.rotateY(0.07);
  //scene.rotateX(0.02);
  //scene.rotateZ(0.01);

  //camera.position.z = t * -1;
   camera.position.x = t * -0.01;
   camera.position.y = t * -0.01;

}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  scene.rotateY(0.01);
  cat.rotateY(-0.01);
  

  //scene.rotateX(0.01);
  //scene.rotateZ(0.01);

  controls.update();

  renderer.render(scene, camera);
}

animate();