import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './visualizer.css';
import { SphereObject, Visuals } from './VisualizerModels';
import { Cylindrical } from 'three';

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

    const size = 500;
    const divisions = 100;
    const gridHelper = new THREE.GridHelper( size, divisions );
    gridHelper.position.set(0,0,0);
    scene.add( gridHelper );
    
    let geometry = new THREE.SphereGeometry( 0.5 );
    let spheresArray: SphereObject[] = [];
    

    // add visualizer spheres
    for(let i = -24; i < 24; i++) {
      for(let j = -8; j < 8; j++) {
        let sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000, roughness: 0 } );
        let sphere = new THREE.Mesh( geometry, sphereMaterial );
        sphere.position.set(i,0,j);
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
    // something strange happens when stopping the visualization. one column of left side spheres disappear
    for(let i = -48; i < 48; i++) {
      for(let j = -10; j < 10; j++) {
        if((j < -8 || j > 7) || (i < -22 || i > 23)) {
          let sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000, roughness: 0 } );
          let sphere = new THREE.Mesh( geometry, sphereMaterial );
          sphere.position.set(i,0,j);
          scene.add( sphere );
        }
      }
    }

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    // scene.add( light );
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(5,10,5);
    directionalLight.rotation.set(-0.4, -0.2, 0);
    scene.add( directionalLight );

    let theta = 0;
    camera.position.setFromCylindricalCoords(16,theta,6);
    camera.rotation.set(-0.2,0,0);


    let bufferLength;
    //console.log(bufferLength);
    let dataArray: Uint8Array;
    let filteredData: Uint8Array;
    let clock = new THREE.Clock();

    // - generate array of values corresponding to a logarithmically scaled audio frequency array
    // - first 16 values are not logarithmic due to duplicates when using Math.floor with this level
    // of clarity (48 nodes from 4096 values)
    let freqNodePositions: number[] = [];
    for(let i = 0; i < 16; i++) {
      freqNodePositions[i] = i;
    }
    for(let i = 16; i <= 48; i++) {
      freqNodePositions[i] = Math.floor(Math.pow(2, i/4));
    }

    let targetPosition: THREE.Vector3;
    let elapsed: number;

    let animate = () => {
      let delta = clock.getDelta();
      elapsed = clock.elapsedTime;
      requestAnimationFrame( animate );

      props.audio?.getByteFrequencyData(dataArray);
      for(let i = 0; i < 48; i++) {
        filteredData[i] = dataArray[freqNodePositions[i]];
      }

      spheresArray.forEach(sphere => {
        targetPosition = sphere.mesh.position.clone();
        targetPosition.y = (filteredData[sphere.xPos + 22]/100) * (Math.cos(sphere.zPos/2.55) + 1);
        sphere.mesh.position.lerp(targetPosition, 0.25);
        sphere.mesh.material.color.setHSL(((targetPosition.y)/24), 1.0, 0.5);
      });

      // 60 fps
      let interval = 1 / 60;

      if (elapsed > interval) {
          renderer.render( scene, camera );
      }
    };

    if(props.visualize && props.audio) {
      bufferLength = props.audio.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      filteredData = new Uint8Array(48);
      animate();
    } else {
      renderer.render( scene, camera );
    }

    return () => mountRef.current.removeChild( renderer.domElement);
  }, [props.visualize, props.audio]);

  return(
    <div ref={mountRef} className='scene'>
    </div>
  )
}

export default Visualizer