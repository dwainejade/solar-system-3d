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
                    </div>
                    <div className="kepler-section">
                        <h2 className="title">Kepler's Laws</h2>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ExperimentsModal