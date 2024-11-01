import useExperimentsStore from "../../../store/experiments"
import useStore, { usePlanetStore } from "../../../store/store";
import KeplerOne from "./KeplerOne";
import KeplerTwo from "./KeplerTwo";
import KeplerThree from "./KeplerThree";
import NewtonOne from "./NewtonOne";

function ExperimentsModal() {
    const { experimentsModal, toggleExperimentsModal, experimentType, setExperimentType } = useExperimentsStore();
    const { updatePlanetData, planetsData } = usePlanetStore();
    const handleCloseModal = () => {
        if (experimentType) {
            setExperimentType(null);
            return
        }
        toggleExperimentsModal(false);
    }

    const handleExperiementType = (type) => {
        setExperimentType(type);
    }

    const defaultMenu = () => {
        return (
            <>
                <header>Experiments</header>
                <div className="newton-section">
                    <h2 className="title">Newton's Laws</h2>

                    <div className="btn-con">
                        <button className="btn" onClick={() => handleExperiementType('newton-1')}>Law of Universal Gravitation <span>{'>'}</span></button>
                    </div>
                </div>
                <div className="kepler-section">
                    <h2 className="title">Kepler's Laws <span>{'>'}</span></h2>

                    <div className="btn-con">
                        <button className="btn" onClick={() => handleExperiementType('kepler-1')}>First Law (Elliptical Orbits) <span>{'>'}</span></button>
                        <button className="btn" onClick={() => handleExperiementType('kepler-2')}>Second Law (Equal Areas) <span>{'>'}</span></button>
                        <button className="btn" onClick={() => handleExperiementType('kepler-3')}>Third Law (Distance & period rel) <span>{'>'}</span></button>
                    </div>
                </div>
            </>
        )
    }


    return (
        <div className='experiments-modal-wrapper'>
            <div className={`modal ${experimentsModal ? "open" : "closed"}`}>
                <button className="close-modal" onClick={handleCloseModal}>x</button>

                <div className="content">

                    {!experimentType && defaultMenu()}

                    {/* Newton's Laws */}
                    {experimentType === 'newton-1' && <NewtonOne />}

                    {/* Kepler's Laws */}
                    {experimentType === 'kepler-1' && <KeplerOne />}
                    {experimentType === 'kepler-2' && <KeplerTwo />}
                    {experimentType === 'kepler-3' && <KeplerThree />}
                </div>
            </div>


        </div>
    )
}

export default ExperimentsModal