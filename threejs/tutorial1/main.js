let scene, camera, renderer, cube;

function init() {
    // first, create a 'scene'
    // https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
    scene = new THREE.Scene();

    // https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // passing antialias: true will make many edges a bit sharper
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const texture = new THREE.TextureLoader().load("textures/crate.gif");
    const material = new THREE.MeshBasicMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
}

// create a loop that makes the renderer re-draw the scene
const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

init();
animate();
