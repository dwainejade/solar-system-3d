"use client";
import SharedCanvas from "@/components/canvas/SharedCanvas";
import Scene from "./SceneExperiments";
import "../../src/styles/Experiments.css";

const SceneOnePage = () => {
  return (
    <SharedCanvas mode='experiments'>
      <Scene />
    </SharedCanvas>
  );
};

export default SceneOnePage;
