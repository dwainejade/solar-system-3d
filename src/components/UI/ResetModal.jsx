import React from 'react'
import { usePlanetStore } from '../../store/store';

function ResetModal({ type, handleResetAll }) {
    const toggleResetPlanetModal = usePlanetStore((state) => state.toggleResetPlanetModal);
    const toggleResetAllModal = usePlanetStore((state) => state.toggleResetAllModal);
    const resetSinglePlanetData = usePlanetStore((state) => state.resetSinglePlanetData);
    const selectedPlanet = usePlanetStore((state) => state.selectedPlanet);

    const description = type === 'all'
        ? 'Are you sure you want to reset all objects to their default values?'
        : 'Are you sure you want to reset this object to its default values?';

    const handleReset = () => {
        if (type === 'all') {
            toggleResetAllModal(false);
            handleResetAll();
        } else {
            toggleResetPlanetModal(false);
            resetSinglePlanetData(selectedPlanet?.name)
        }
    };

    const handleClose = () => {
        if (type === 'all') {
            toggleResetAllModal(false);
        } else {
            toggleResetPlanetModal(false);
        }
    };

    return (
        <div className='reset-modal-wrapper'>
            <div className="content">
                <div className="top-section">
                    <img src={"../assets/ui/icons/warning_icon.svg"} alt="warning" className="warning-icon" />
                    <p>{description}</p>
                </div>

                <div className="btn-con">
                    <button onClick={handleReset} className='btn confirm-btn'>Yes</button>
                    <button onClick={handleClose} className='btn cancel-btn'>No</button>
                </div>

            </div>
        </div>
    )
}

export default ResetModal