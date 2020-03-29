export const getThreeRenderer = () => {
    const container = document.getElementById('container')
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0xf0ffff)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    return renderer
};