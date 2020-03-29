export const getInitialSceneState = () => {

    const initialState = {
        spheres: {
            colors: [],
            positions: [],
        },
    }

    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
            const positionX = x * 4
            const positionY = y * 4
            initialState.spheres.positions.push({ x: positionX, y: positionY, z: 0 })

            initialState.spheres.colors.push({r: 1, g: 0.65, b: 0})
        }
    }
    return initialState
}
