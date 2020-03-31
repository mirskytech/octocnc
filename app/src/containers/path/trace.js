import React from 'react';
import {useSelector} from "react-redux";
import {MeshLine} from "./shapes";

function Trace() {

    const points = useSelector(state => state.path.traversal).toArray();
    const path = [];
    for (let i = 0; i < points.length - 1; i++) {
        path.push({
            start: [points[i].x, points[i].y, points[i].z],
            end: [points[i + 1].x, points[i + 1].y, points[i + 1].z]
        });
    }
    return (
        <>
            {path.map(p => (
                <MeshLine
                    start={p.start}
                    end={p.end}
                    color={'black'}
                />
            ))}

        </>

    )
}

export default Trace;
