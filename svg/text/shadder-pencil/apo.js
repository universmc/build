// Initialisation Three.js
const canvas = document.getElementById('myCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function resizeCanvas() {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
resizeCanvas();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Fond blanc pour effet crayon

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Pencil Shader
const geometry = new THREE.SphereGeometry(2, 16, 16);
const material = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vNormal = normal;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        precision mediump float;
        uniform vec3 lightDir;
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            float intensity = dot(normalize(lightDir), vNormal);
            float edge = step(0.9, abs(dot(vNormal, vec3(0.0, 0.0, 1.0))));
            float hatch = fract(vPosition.y * 10.0 + time);
            float toon = floor(intensity * 3.0) / 3.0;
            vec3 color = edge < 0.5 ? vec3(0.0) : vec3(toon * step(0.5, hatch));
            gl_FragColor = vec4(color, 1.0);
        }
    `,
    uniforms: {
        lightDir: { value: light.position },
        time: { value: 0 }
    }
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

window.addEventListener('resize', resizeCanvas);