import { useThree, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import { Vector3 } from "three";

const Annotation = ({ label, color, pos, ...props }) => {
  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      // Calculate the distance from the camera
      const distance = camera.position.distanceToSquared(pos);
      // Adjust scale based on distance
      const scale = calculateScale(distance);
      // Apply the scale to the Html element
      ref.current.transform = `scale(${scale})`;
    }
  });

  // console.log(ref.current);
  // Function to calculate scale based on distance
  function calculateScale(distance) {
    // Define a base scale and a scale factor
    const baseScale = 1; // Adjust as needed
    const scaleFactor = 0.01; // Adjust to control how scale changes with distance

    return baseScale + scaleFactor / distance;
  }

  return (
    <Html ref={ref} {...props} transform occlude='blending'>
      <span className='planet-label' style={{ color }} onClick={() => console.log(`clicked ${label} label `)}>
        {label}
      </span>
    </Html>
  );
};

export default Annotation;
