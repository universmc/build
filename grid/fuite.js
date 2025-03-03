// Initialisation de la scène Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Création du plan de base (grille)
const gridSize = 10;
const gridDivisions = 10;
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
scene.add(gridHelper);

// Définition des points A et B (ligne d'horizon)
const pointA = new THREE.Vector3(-5, 2, 0);
const pointB = new THREE.Vector3(5, 2, 0);

// Création de la droite AB (ligne d'horizon)
const materialLine = new THREE.LineBasicMaterial({ color: 0xff0000 });
const pointsAB = [pointA, pointB];
const geometryAB = new THREE.BufferGeometry().setFromPoints(pointsAB);
const lineAB = new THREE.Line(geometryAB, materialLine);
scene.add(lineAB);

// Calcul du point de fuite P (intersection avec le plan de base)
const rayAB = new THREE.Ray(pointA, pointB.clone().sub(pointA).normalize());
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // Plan de base (y=0)
const pointP = new THREE.Vector3();
rayAB.intersectPlane(plane, pointP);

// Création du point P (sphère)
const geometryPoint = new THREE.SphereGeometry(0.2, 32, 32);
const materialPoint = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const sphereP = new THREE.Mesh(geometryPoint, materialPoint);
sphereP.position.copy(pointP);
scene.add(sphereP);

// Positionnement de la caméra
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Animation (rotation de la caméra)
function animate() {
    requestAnimationFrame(animate);
    camera.position.x = 10 * Math.cos(Date.now() * 0.001);
    camera.position.z = 10 * Math.sin(Date.now() * 0.001);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
}
animate();