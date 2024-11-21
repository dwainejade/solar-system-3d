import { useEffect } from "react";
import useExperimentsStore from "../../../store/experiments";
import useStore, { usePlanetStore, useCameraStore } from "../../../store/store";
import KeplerOne from "./KeplerOne";
import KeplerTwo from "./KeplerTwo";
import KeplerThree from "./KeplerThree";
import NewtonOne from "./NewtonOne";

function ExperimentsModal() {
  const { experimentsModal, toggleExperimentsModal, experimentType, setExperimentType, setExperimentStatus } = useExperimentsStore();
  const { updatePlanetData, planetsData } = usePlanetStore();
  const { resetCamera } = useCameraStore();

  const handleCloseModal = () => {
    if (experimentType) {
      setExperimentType(null);
      return;
    }
    // toggleExperimentsModal(false);
  };

  const handleExperiementType = type => {
    setExperimentType(type);
  };

  const experimentHeader = {
    "null": "Experiments",
    "newton-1": "Newton's Law of Universal Gravitation",
    "kepler-1": "Kepler's First Law",
    "kepler-2": "Kepler's Second Law",
    "kepler-3": "Kepler's Third Law",
  }

  useEffect(() => {
    if (experimentType === null)
      resetCamera()
  }, [experimentType])


  const defaultMenu = () => {
    return (
      <>
        <div className='newton-section'>
          <h2 className='title'>Newton's Laws</h2>

          <div className='btn-con'>
            <button className='btn' onClick={() => handleExperiementType("newton-1")}>
              Law of Universal Gravitation <span>{">"}</span>
            </button>
          </div>
        </div>
        <div className='kepler-section'>
          <h2 className='title'>Kepler's Laws</h2>

          <div className='btn-con'>
            <button className='btn' onClick={() => handleExperiementType("kepler-1")}>
              First Law (Elliptical Orbits) <span>{">"}</span>
            </button>
            <button className='btn' onClick={() => handleExperiementType("kepler-2")}>
              Second Law (Equal Areas) <span>{">"}</span>
            </button>
            <button className='btn' onClick={() => handleExperiementType("kepler-3")}>
              Third Law (Distance & period rel) <span>{">"}</span>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='experiments-modal-wrapper'>
      <div className={`modal ${experimentType === null ? "experiments" : experimentType} ${experimentsModal ? "open" : "closed"}`}>
        <div className={`content ${experimentType === null ? "experiments" : experimentType}`}>
          <header>
            <h4 className='title'>{experimentHeader[experimentType]}</h4>

            <div className='close-btn-container'>
              {experimentType &&
                <button className='close-modal' onClick={handleCloseModal}>
                  x
                </button>
              }
            </div>
          </header>
          {!experimentType && defaultMenu()}

          {/* Newton's Laws */}
          {experimentType === "newton-1" && <NewtonOne />}

          {/* Kepler's Laws */}
          {experimentType === "kepler-1" && <KeplerOne />}
          {experimentType === "kepler-2" && <KeplerTwo />}
          {experimentType === "kepler-3" && <KeplerThree />}
        </div>
      </div>
    </div>
  );
}

export default ExperimentsModal;
