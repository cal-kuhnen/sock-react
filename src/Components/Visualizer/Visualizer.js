import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './visualizer.css'

const Visualizer = () => {

  const mountRef = useRef(null);

  useEffect(() => {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    mountRef.current.appendChild( renderer.domElement );

    const size = 100;
    const divisions = 100;
    const gridHelper = new THREE.GridHelper( size, divisions );
    gridHelper.position.set(0,-3,0);
    scene.add( gridHelper );
    
    var geometry = new THREE.SphereGeometry( 0.15 );
    var spheresArray = [];

    for(var i = -25; i < 25; i++) {
      for(var j = -25; j < 8; j++) {
        var material = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
        var sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(i,-2,j);
        const sphereObject = {
          xPos: i,
          zPos: j,
          mesh: sphere
        };
        spheresArray.push(sphereObject);
        scene.add( sphere );
      }
    }

    const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(0,0,5);
    scene.add( directionalLight );

    camera.position.z = 10;
    
    var clock = new THREE.Clock();
    var animate = () => {
      var delta = clock.getDelta();
      var elapsed = clock.elapsedTime;
      requestAnimationFrame( animate );

      spheresArray.forEach(sphere => {
        var posY = sphere.mesh.position.y;
        sphere.mesh.position.y = Math.sin((elapsed + sphere.mesh.position.z)*3) - 2;
        sphere.mesh.material.color.setHSL(((posY + 3)/12), 1.0, 0.5);
      })
      renderer.render( scene, camera );
    };
    
    animate();
    // renderer.render( scene, camera );

    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return(
    <div ref={mountRef} className='scene'>
    </div>
  )
}

export default Visualizer