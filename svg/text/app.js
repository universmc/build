const canvas = document.getElementById('myCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(50, 50, 50);
scene.add(light);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const loader = new THREE.SVGLoader();
loader.load(
    'text.svg',
    (data) => {
        const paths = data.paths;
        const group = new THREE.Group();

        const vertexShader = `
            varying vec3 vNormal;
            void main() {
                vNormal = normal;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        const fragmentShader = `
            uniform vec3 lightDir;
            uniform float time;
            varying vec3 vNormal;
            void main() {
                float intensity = dot(normalize(lightDir), vNormal);
                vec3 color = vec3(1.0, 0.5, sin(time * 2.0) * 0.5 + 0.5);
                gl_FragColor = vec4(color * max(intensity, 0.2), 1.0);
            }
        `;

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                lightDir: { value: light.position },
                time: { value: 0 }
            }
        });

        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const shapes = path.toShapes(true);
            for (let j = 0; j < shapes.length; j++) {
                const shape = shapes[j];
                const geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: 10,
                    bevelEnabled: false
                });
                const mesh = new THREE.Mesh(geometry, material);
                group.add(mesh);
            }
        }

        group.scale.set(0.5, -0.5, 0.5);
        group.position.set(-50, 25, 0);
        scene.add(group);

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            group.rotation.y += 0.02 * delta * 60;
            group.position.z = Math.sin(time) * 20;
            material.uniforms.time.value = time;

            renderer.render(scene, camera);
        }
        animate();
    },
    undefined,
    (error) => console.error('Erreur SVG :', error)
);