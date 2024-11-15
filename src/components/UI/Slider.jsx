import React from 'react'

function Slider({ name, amountOfTicks = 10, min = 0, max = 10, markers = ['0', '10'], onDecrement, onIncrement, onSliderChange, value, disableSlider, disableIncrement, disableDecrement, step = 0.1 }) {
    const handleDecrement = () => {
        onDecrement()
    }

    const handleIncrement = () => {
        onIncrement()
    }

    const handleSliderChange = (e) => {
        onSliderChange(e)
    }

    const ticks = Array.from({ length: amountOfTicks }, (_, i) => i / (amountOfTicks - 1));

    return (
        <div className={`slider-con ${name}`}>
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
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={handleSliderChange}
                        disabled={disableSlider}
                        className={`slider ${disableSlider ? 'disabled' : ''}`}
                    />
                    <div className="slider-markers">
                        {markers.map((marker, index) => (
                            <span key={index}>{marker}</span>
                        ))}
                    </div>
                    <div className="slider-ticks" >
                        {ticks.map((tick, index) => (
                            <span key={index} className="tick"></span>
                        ))}
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