import { useCallback, useEffect, useState, useRef } from 'react';

const useMultiRangeSlider = (min, max, handleRanges) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  useEffect(() => {
    if (!maxValRef.current || !range.current) return;

    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(+maxValRef.current.value);

    range.current.style.left = `${minPercent}%`;
    range.current.style.width = `${maxPercent - minPercent}%`;
  }, [minVal, getPercent]);

  useEffect(() => {
    if (!minValRef.current || !range.current) return;

    const minPercent = getPercent(+minValRef.current.value);
    const maxPercent = getPercent(maxVal);

    range.current.style.width = `${maxPercent - minPercent}%`;
  }, [maxVal, getPercent]);

  useEffect(() => {
    handleRanges({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  const handleMinValChange = (event) => {
    const value = Math.min(+event.target.value, maxVal - 1);
    setMinVal(value);
    event.target.value = value.toString();
  };

  const handleMaxValChange = (event) => {
    const value = Math.max(+event.target.value, minVal + 1);
    setMaxVal(value);
    event.target.value = value.toString();
  };

  return {
    minVal,
    maxVal,
    minValRef,
    maxValRef,
    range,
    handleMinValChange,
    handleMaxValChange,
  };
};

export default useMultiRangeSlider;
