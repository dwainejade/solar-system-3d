import React from 'react'
import { usePlanetStore } from '../../store/store';

function ResetModal({ type, handleResetAll }) {
    const { showResetPlanetModal, toggleResetPlanetModal, ShowResetAllModal, toggleResetAllModal, resetSinglePlanetData, selectedPlanet } = usePlanetStore();

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
                <p>{description}</p>

                <div className="btn-con">
                    <button onClick={handleReset} className='btn confirm-btn'>Yes</button>
                    <button onClick={handleClose} className='btn cancel-btn'>No</button>
                </div>

            </div>
        </div>
    )
}

export default ResetModal