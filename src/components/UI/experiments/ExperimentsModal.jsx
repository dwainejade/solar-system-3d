import useExperimentsStore from "../../../store/experiments"
import useStore, { usePlanetStore } from "../../../store/store";
import KeplerOne from "./KeplerOne";

function ExperimentsModal() {
    const { experimentsModal, toggleExperimentsModal, experimentType, setExperimentType } = useExperimentsStore();
    const { updatePlanetData, planetsData } = usePlanetStore();
    const handleCloseModal = () => {
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
                        <button className="btn">Law of Universal Gravitation <span>{'>'}</span></button>
                    </div>
                </div>
                <div className="kepler-section">
                    <h2 className="title">Kepler's Laws <span>{'>'}</span></h2>

                    <div className="btn-con">
                        <button className="btn" onClick={() => handleExperiementType('kepler-1')}>First Law (Elliptical Orbits) <span>{'>'}</span></button>
                        <button className="btn">Second Law (Equal Areas) <span>{'>'}</span></button>
                        <button className="btn">Third Law (Action Reaction) <span>{'>'}</span></button>
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
                    {experimentType === 'kepler-1' &&
                        <KeplerOne planetsData={planetsData} updaPlanetData={updatePlanetData} />}

                </div>
            </div>


        </div>
    )
}

export default ExperimentsModal