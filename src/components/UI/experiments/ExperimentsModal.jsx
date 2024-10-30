import useExperimentsStore from "../../../store/experiments"

function ExperimentsModal() {
    const { experimentsModal, toggleExperimentsModal, } = useExperimentsStore();
    console.log(experimentsModal)
    const handleCloseModal = () => {
        toggleExperimentsModal(false);
    }

    return (
        <div className='experiments-modal-wrapper'>
            <div className={`modal ${experimentsModal ? "open" : "closed"}`}>
                <button className="close-modal" onClick={handleCloseModal}>x</button>

                <div className="content">
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
                            <button className="btn">First Law (Elliptical Orbits) <span>{'>'}</span></button>
                            <button className="btn">Second Law (Equal Areas) <span>{'>'}</span></button>
                            <button className="btn">Third Law (Action Reaction) <span>{'>'}</span></button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ExperimentsModal