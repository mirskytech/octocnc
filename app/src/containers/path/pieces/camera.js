export const getThreeCamera = () => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 60;

    return camera
};

