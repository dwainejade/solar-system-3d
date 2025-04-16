"use client";
import { useEffect } from "react";
import SharedCanvas from "@/components/canvas/SharedCanvas";
import Scene from "./SceneExperiments";
import useExperimentsStore from "../../src/store/experiments";
import "../../src/styles/Experiments.css";

const ExperimentsPage = () => {
  const { toggleExperimentMode } = useExperimentsStore();

  useEffect(() => {
    toggleExperimentMode(true);
    return () => {
      toggleExperimentMode(false);
    };
  }, [toggleExperimentMode]);

  return (
    <SharedCanvas mode="experiments">
      <Scene />
    </SharedCanvas>
  );
};

export default ExperimentsPage;