export const getThreeScene = () => {
    const scene = new THREE.Scene();

    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
            const geometry = new THREE.SphereGeometry(1, 32, 32);
            const material = new THREE.MeshBasicMaterial({ color: 0xffa500 });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.x = x * 4;
            sphere.position.y = y * 4;
            sphere.name = x + (y * 20);
            scene.add(sphere);
        }
    }
    return scene
};

