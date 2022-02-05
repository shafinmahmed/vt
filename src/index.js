import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
let camera, controls, scene, renderer, light;

let box1, matl1, mesh1;
let box2, matl2, mesh2;
let face1, face2;
let colStatus, dir;

init();

function init() {

    buildCubes();

    createScene();
    
    travelCube();
    
    mouseControl();
}

function createScene() {
    colStatus = false;

    if (Math.random() > 0.5) {
        dir = 1;
    }
    else {
        dir = -1;
    }

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antialias:true});   
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(40 , window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);


    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI;

    scene.add(mesh1);
    scene.add(mesh2);
    
    light = new THREE.AmbientLight(0x404040);
    light.position.set(5, -5 , 5);
    scene.add(light);

    let planeGeom = new THREE.PlaneGeometry(20, 20);
    let planeMatl = new THREE.MeshLambertMaterial( {transparent: true, opacity: 0.3, side:THREE.DoubleSide} );
    let planeMesh = new THREE.Mesh(planeGeom, planeMatl);
    planeMesh.position.set(0, -0.55, 0);
    planeMesh.rotateX(Math.PI / 2);

    scene.add(planeMesh);

    window.addEventListener("resize", onWindowResize);

}

function buildCubes() {    
    let colorList = [0xff0000, 
                    0xffff00, 
                    0x0000ff, 
                    0x00ff00, 
                    0x000000, 
                    0x800080];     
    colorShuffler(colorList);

    //Cube 1 to begin on the left side of the default load
    box1 = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
    matl1 = new THREE.MeshBasicMaterial( { vertexColors: true });
    let pos1 = box1.getAttribute('position');
    
    let colors1 = [];
    let color1 = new THREE.Color();

    for (let i = 0; i < pos1.count; i += 3) {
        if (i == 0 | i == 3) {
            color1.set(colorList[0]);
            face1 = colorList[0];               // Colliding face
        }
        else if (i == 6 | i == 9) {
            color1.set(colorList[1]); 
        }
        else if (i == 12 | i == 15) {
            color1.set(colorList[2]);
        }
        else if (i == 18 | i == 21) {
            color1.set(colorList[3]);
        }
        else if (i == 24 | i == 27) {
            color1.set(colorList[4]);
        }
        else if (i == 30 | i == 33) {
            color1.set(colorList[5]);
        }
        colors1.push( color1.r, color1.g, color1.b);
        colors1.push( color1.r, color1.g, color1.b);
        colors1.push( color1.r, color1.g, color1.b);
    }
    box1.setAttribute('color', new THREE.Float32BufferAttribute(colors1, 3));

    mesh1 = new THREE.Mesh(box1, matl1);
    mesh1.position.set(-9.5, 0, 0);


    //Cube 2 to begin on the right side of the default load    
    colorShuffler(colorList);
    box2 = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
    matl2 = new THREE.MeshBasicMaterial( { vertexColors: true });
    let pos2 = box2.getAttribute('position');
    
    let colors2 = [];
    let color2 = new THREE.Color();

    for (let i = 0; i < pos2.count; i += 3) {
        if (i == 0 | i == 3) {
            color2.set(colorList[0]);
        }
        else if (i == 6 | i == 9) {
            color2.set(colorList[1]);
            face2 = colorList[1];                   // colliding face
        }
        else if (i == 12 | i == 15) {
            color2.set(colorList[2]);
        }
        else if (i == 18 | i == 21) {
            color2.set(colorList[3]);
        }
        else if (i == 24 | i == 27) {
            color2.set(colorList[4]);
        }
        else if (i == 30 | i == 33) {
            color2.set(colorList[5]);
        }
        colors2.push( color2.r, color2.g, color2.b);
        colors2.push( color2.r, color2.g, color2.b);
        colors2.push( color2.r, color2.g, color2.b);
    }
    box2.setAttribute('color', new THREE.Float32BufferAttribute(colors2, 3));
    mesh2 = new THREE.Mesh(box2, matl2);
    mesh2.position.set(9.5, 0, 0); 
}

function colorShuffler(arr) {
    // Fisher-Yates Shuffle
    let currIndex = arr.length, randIndex;

    while (currIndex !== 0) {
        randIndex = Math.floor(Math.random() * currIndex);
        currIndex--;
        [arr[currIndex], arr[randIndex]] = [arr[randIndex], arr[currIndex]];
    }
}


function travelCube() {
    requestAnimationFrame(travelCube);
    let speed = 0.05;
    if (colStatus == false) {
        if (mesh1.position.x < -0.5){
            mesh1.position.x += speed;
        }
        if (mesh2.position.x > 0.5){
            mesh2.position.x -= speed;
        }   
        if ((Math.round(mesh1.position.x * 100) / 100) >= -0.5) {
            colStatus = true;
        }
    }    

    // Post collision scenarios
    if (colStatus == true) {
        console.log(dir);
        switch (face2) {
            case face1:
                scene.remove(mesh1);
                scene.remove(mesh2);
                break;
            case 0x000000: // black
                scene.remove(mesh1);
                break;
            case 0x00ff00: //green
                if (mesh1.position.x < 9.5) {
                    mesh1.position.x += (speed * 2);
                }
                break;            
            case 0x0000ff: //blue
                if (mesh1.position.x > -9.5){
                    mesh1.position.x -= (speed);
                }
                break;
            case 0xffff00: //yellow
                if (mesh1.position.x > -9.5) {
                    mesh1.position.x -= (speed * 0.5);
                }
                break;
            case 0x800080: //purple                
                if (mesh1.position.x > -9.5 & mesh1.position.x < 9.5) {
                    mesh1.position.x += (dir * speed);
                }
                break;
            default:
                break;
        }
    }
    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;    
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function mouseControl() {
    requestAnimationFrame(mouseControl);
    
    light.position.copy(camera.position);
    controls.update();

    render();
}

function render() {
    renderer.render(scene, camera);
}