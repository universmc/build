// Initialisation de la scène Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Définition des points A, B, C (sommets du cube)
const pointA = new THREE.Vector3(-1, 1, 1);
const pointB = new THREE.Vector3(1, 1, 1);
const pointC = new THREE.Vector3(1, -1, 1);

// Création des droites AB et BC
const materialLine = new THREE.LineBasicMaterial({ color: 0xff0000 });
const pointsAB = [pointA, pointB];
const geometryAB = new THREE.BufferGeometry().setFromPoints(pointsAB);
const lineAB = new THREE.Line(geometryAB, materialLine);
scene.add(lineAB);

const pointsBC = [pointB, pointC];
const geometryBC = new THREE.BufferGeometry().setFromPoints(pointsBC);
const lineBC = new THREE.Line(geometryBC, materialLine);
scene.add(lineBC);

// Calcul des intersections P et P'
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -1); // Plan de base du cube
const rayAB = new THREE.Ray(pointA, pointB.clone().sub(pointA).normalize());
const rayBC = new THREE.Ray(pointB, pointC.clone().sub(pointB).normalize());
const pointP = new THREE.Vector3();
const pointPPrime = new THREE.Vector3();
rayAB.intersectPlane(plane, pointP);
rayBC.intersectPlane(plane, pointPPrime);

// Création des points P et P' (sphères)
const geometryPoint = new THREE.SphereGeometry(0.1, 32, 32);
const materialPoint = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const sphereP = new THREE.Mesh(geometryPoint, materialPoint);
sphereP.position.copy(pointP);
scene.add(sphereP);

const spherePPrime = new THREE.Mesh(geometryPoint, materialPoint);
spherePPrime.position.copy(pointPPrime);
scene.add(spherePPrime);

// Positionnement de la caméra
camera.position.z = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();