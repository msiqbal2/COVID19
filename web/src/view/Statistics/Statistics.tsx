
import CanvasJS from 'canvasjs';
import React, { useEffect } from 'react';

export function Statistics() {

    useEffect(()=> {
        
    },[])
    
    return (
        <>
            <div className="flex-shrink-0">
                <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-lg-6 col-sm-6 mb-2">
                    <div id="chartContainer1" className="graph"></div> <br/>
                    </div>
                    <div className="col-lg-6 col-sm-6 mb-2">
                    <div id="chartContainer2" className="graph"></div> <br/>
                    </div>
                </div>
                    <div id="chartContainer3" className="graph"></div>
                </div>
            </div>
        </>
    );
}