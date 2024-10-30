"use client";
import { useEffect } from "react";
import SharedCanvas from "@/components/canvas/SharedCanvas";
import Scene from "./SceneExperiments";
import useExperimentsStore from "../../src/store/experiments";
import "../../src/styles/Experiments.css";

const SceneExperimentsPage = () => {
  const { experimentMode, toggleExperimentMode } = useExperimentsStore();

  useEffect(() => {
    toggleExperimentMode(true);
  }, []);

  return (
    <SharedCanvas mode={experimentMode ? 'experiments' : 'main'}>
      <Scene />
    </SharedCanvas>
  );
};

export default SceneExperimentsPage;
