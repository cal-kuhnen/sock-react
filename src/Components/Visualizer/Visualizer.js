import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './visualizer.css'

const Visualizer = (props) => {

  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    mountRef.current.appendChild( renderer.domElement );

    const size = 100;
    const divisions = 200;
    const gridHelper = new THREE.GridHelper( size, divisions );
    gridHelper.position.set(0,0,0);
    scene.add( gridHelper );
    
    var geometry = new THREE.SphereGeometry( 0.2 );
    var spheresArray = [];

    for(var i = -32; i < 32; i++) {
      for(var j = -8; j < 8; j++) {
        var material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(i,0,j/2);
        const sphereObject = {
          xPos: i,
          zPos: j,
          mesh: sphere
        };
        spheresArray.push(sphereObject);
        scene.add( sphere );
      }
    }

    for(var i = -32; i < 32; i++) {
      for(var j = -24; j < 16; j++) {
        if(j < -8 || j > 7) {
          var material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
          var sphere = new THREE.Mesh( geometry, material );
          sphere.position.set(i,0,j/2);
          scene.add( sphere );
        }
      }
    }

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(0,0,5);
    scene.add( directionalLight );

    camera.position.z = 10;
    camera.position.y = 3;


    var bufferLength;
    //console.log(bufferLength);
    var dataArray;
    
    var clock = new THREE.Clock();
    var animate = () => {
      var delta = clock.getDelta();
      var elapsed = clock.elapsedTime;
      requestAnimationFrame( animate );

      props.audio.getByteFrequencyData(dataArray);

      spheresArray.forEach(sphere => {
        var posY = sphere.mesh.position.y;
        const targetPosition = sphere.mesh.position.clone();
        targetPosition.y = (dataArray[sphere.xPos + 32]/100) * (Math.cos(sphere.zPos/2.55) + 1);
        sphere.mesh.position.lerp(targetPosition, 0.3);
        sphere.mesh.material.color.setHSL(((posY)/12), 1.0, 0.5);
      })
      renderer.render( scene, camera );
    };

    if(props.begin) {
      bufferLength = props.audio.frequencyBinCount;
      console.log(bufferLength);
      dataArray = new Uint8Array(bufferLength);
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