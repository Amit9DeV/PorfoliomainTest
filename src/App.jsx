import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import { TransitionProvider } from "./transitions/ContentTransition"
import TransitionComponent from "./transitions/Transiton"


import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { WaveMaterial } from "./transitions/WaveMaterial"
import { easing } from 'maath'


import "./App.css"
import {Routes,  Route } from "react-router-dom"

function ShaderPlane() {
  const ref = useRef()
  const { viewport, size } = useThree()
  useFrame((state, delta) => {
    ref.current.time += delta
    easing.damp3(ref.current.pointer, state.pointer, 0.2, delta)
  })
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <waveMaterial ref={ref} key={WaveMaterial.key} resolution={[size.width * viewport.dpr, size.height * viewport.dpr]} />
    </mesh>
  )
}

function App() {


  return (
    <>

     <div className=" h-screen relative ">
     <div className="absolute h-screen w-full blur-lg " >
      <Canvas >
      <  ShaderPlane  />
      </Canvas>
    </div>

    <NavBar/>

    <TransitionProvider>

      
         <Routes>
          <Route path=""  element={
            <TransitionComponent>
              <Home />
            </TransitionComponent>
          } />
          <Route path="About" element = {    
                        <TransitionComponent>
                        <About/>
                      </TransitionComponent> } />
          <Route path="Projects" element = {                        
                         <TransitionComponent>
                       <Projects/>
                      </TransitionComponent> } /> 
          <Route path="Contact" element = {                       
                      <TransitionComponent>
                          <Contact/>
                      </TransitionComponent> } />

         </Routes>
       </TransitionProvider>

    </div>


    </>
  )
}

export default App
