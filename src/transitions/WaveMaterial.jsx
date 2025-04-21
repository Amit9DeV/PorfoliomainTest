import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// Tutorial: https://www.youtube.com/watch?v=f4s1h2YETNY
const WaveMaterial = shaderMaterial(
  {
    time: 0,
    pointer: new THREE.Vector3(),
    resolution: new THREE.Vector2()
  },
  /*glsl*/`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /*glsl*/`
    uniform float time;
    uniform vec3 pointer;
    uniform vec2 resolution;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      vec2 p = pointer.xy / resolution;
      
      // Simplified wave calculation
      float wave = sin(uv.x * 10.0 + time) * 0.02;
      wave += sin(uv.y * 10.0 + time) * 0.02;
      
      // Reduced color calculation
      vec3 color = vec3(0.1, 0.2, 0.3);
      color += vec3(wave * 0.5);
      
      gl_FragColor = vec4(color, 0.5);
    }
  `
);

WaveMaterial.key = "wave-material";

extend({ WaveMaterial });

export { WaveMaterial };
