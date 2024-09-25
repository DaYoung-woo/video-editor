import useMultiRangeSlider from '../../hooks/useMultiRangeSlider'; // Import custom hook


export default function MultiRangeSlider({ min, max, handleRanges }) {
  const {
    minVal,
    maxVal,
    minValRef,
    maxValRef,
    range,
    handleMinValChange,
    handleMaxValChange,
  } = useMultiRangeSlider(min, max, handleRanges);

  return (
    <section className="max-w-3xl m-auto">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={handleMinValChange}
        className={`thumb thumb--zindex-3 max-w-3xl w-full ${minVal > max - 100 && 'thumb--zindex-5'}`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={handleMaxValChange}
        className="thumb thumb--zindex-4 max-w-3xl w-full"
      />
      <div className="slider">
        <div className="slider__track"></div>
        <div ref={range} className="slider__range"></div>
      </div>
    </section>
  );
}