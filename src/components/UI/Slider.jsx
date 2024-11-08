import React from 'react'

function Slider({ onDecrement, onIncrement, onSliderChange, value, disableSlider, disableIncrement, disableDecrement, step = 0.1 }) {
    const handleDecrement = () => {
        onDecrement()
    }

    const handleIncrement = () => {
        onIncrement()
    }

    const handleSliderChange = (e) => {
        onSliderChange(e)
    }

    return (
        <div className="slider-con">
            <div className="slider-control">
                <button
                    className="increment-btn"
                    disabled={disableDecrement}
                    onClick={handleDecrement}
                >
                    -
                </button>

                <div className="input-con">
                    <input
                        type="range"
                        min={0}
                        max={0.9}
                        step={step}
                        value={value}
                        onChange={handleSliderChange}
                        disabled={disableSlider}
                        className='slider'
                    />
                    <div className="slider-markers">
                        <span>0</span>
                        <span>.9</span>
                    </div>
                    <div className="slider-ticks" >
                        <span className="tick"></span>
                        <span className="tick"></span>
                        <span className="tick"></span>
                        <span className="tick"></span>
                        <span className="tick"></span>
                        <span className="tick"></span>
                        <span className="tick"></span>
                        <span className="tick"></span>
                        <span className="tick"></span>
                        <span className="tick"></span>
                    </div>

                </div>
                <button
                    className="increment-btn"
                    disabled={disableIncrement}
                    onClick={handleIncrement}
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default Slider