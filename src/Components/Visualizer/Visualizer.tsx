import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './visualizer.css';
import { SphereObject, Visuals } from './VisualizerModels';

const Visualizer = (props: Visuals) => {

  const mountRef:any = useRef(null);

  useEffect(() => {

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    if (mountRef.current) {
      mountRef.current.appendChild( renderer.domElement );
    }

    const size = 100;
    const divisions = 100;
    const gridHelper = new THREE.GridHelper( size, divisions );
    gridHelper.position.set(0,0,0);
    scene.add( gridHelper );
    
    let geometry = new THREE.SphereGeometry( 0.5 );
    let spheresArray: SphereObject[] = [];

    // add visualizer spheres
    for(let i = -24; i < 24; i++) {
      for(let j = -8; j < 8; j++) {
        let material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
        let sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(i,0,j/2);
        const sphereObject: SphereObject = {
          xPos: i,
          zPos: j,
          mesh: sphere
        };
        spheresArray.push(sphereObject);
        scene.add( sphere );
      }
    }
    
    // add static spheres
    for(let i = -32; i < 32; i++) {
      for(let j = -12; j < 12; j++) {
        if(j < -8 || j > 7) {
          let material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
          let sphere = new THREE.Mesh( geometry, material );
          sphere.position.set(i,0,j/2);
          scene.add( sphere );
        }
      }
    }

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(0,0,5);
    scene.add( directionalLight );

    camera.position.set(0,5,16);


    let bufferLength;
    //console.log(bufferLength);
    let dataArray: Uint8Array;
    let filteredData: Uint8Array;
    
    let clock = new THREE.Clock();
    let animate = () => {
      let delta = clock.getDelta();
      let elapsed = clock.elapsedTime;
      requestAnimationFrame( animate );

      props.audio?.getByteFrequencyData(dataArray);
      let j = 16;
      let k = 48;
      for(let i = 0; i < 48; i++) {
        if(i > 15) {
          filteredData[i] = dataArray[j];
          j += 4;
        } else if(i > 47) {
          filteredData[i] = dataArray[k];
          k += 12;
        } else {
          filteredData[i] = dataArray[i];
        }
      }

      spheresArray.forEach(sphere => {
        let posY = sphere.mesh.position.y;
        const targetPosition = sphere.mesh.position.clone();
        targetPosition.y = (filteredData[sphere.xPos + 20]/100) * (Math.cos(sphere.zPos/2.55) + 1);
        sphere.mesh.position.lerp(targetPosition, 0.3);
        sphere.mesh.material.color.setHSL(((posY)/24), 1.0, 0.5);
      })
      renderer.render( scene, camera );
    };

    if(props.begin && props.audio) {
      bufferLength = props.audio.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      filteredData = new Uint8Array(48);
      animate();
    } else {
      renderer.render( scene, camera );
    }

    return () => mountRef.current.removeChild( renderer.domElement);
  }, [props.begin, props.audio]);

  return(
    <div ref={mountRef} className='scene'>
    </div>
  )
}

export default Visualizer