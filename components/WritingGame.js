import React, { useState, useEffect, useRef } from 'react';

const WritingGame = ({
  onSubmit,
  placeholder = '',
  prompt,
  btnOneText = 'Save my writing',
  text,
  setText,
  btnTwoText = 'Discard',
  onDiscard,
  messageForUser,
  fullDisplay = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [lastKeystroke, setLastKeystroke] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [lastTyped, setLastTyped] = useState(Date.now());
  const [startTime, setStartTime] = useState(null);
  const [lifeBarLength, setLifeBarLength] = useState(100);

  const textareaRef = useRef(null);
  const intervalRef = useRef(null);
  const keystrokeIntervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isDone) {
      intervalRef.current = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!isActive && !isDone) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, time, isDone]);

  useEffect(() => {
    if (isActive) {
      keystrokeIntervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - lastKeystroke;
        if (time === 480) {
          audioRef.current.play();
        }
        if (elapsedTime > 3000 && !isDone) {
          finishRun();
        } else {
          // calculate life bar length
          const newLifeBarLength = 100 - elapsedTime / 30; // 100% - (elapsed time in seconds * (100 / 3))
          setLifeBarLength(Math.max(newLifeBarLength, 0)); // do not allow negative values
        }
      }, 100);
    } else {
      clearInterval(keystrokeIntervalRef.current);
    }

    return () => clearInterval(keystrokeIntervalRef.current);
  }, [isActive, lastKeystroke]);

  const handleTextChange = event => {
    setText(event.target.value);
    if (!isActive && event.target.value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }
    setLastKeystroke(Date.now());
  };

  const finishRun = async () => {
    setLifeBarLength(0);
    setFinished(true);
    setIsDone(true);
    setIsActive(false);
    clearInterval(intervalRef.current);
    clearInterval(keystrokeIntervalRef.current);
  };

  if (!onDiscard) {
    onDiscard = async () => {
      await navigator.clipboard.writeText(text);
      alert('Your text was copied on the clipboard');
      setText('');
    };
  }

  if (!onSubmit) {
    onSubmit = async () => {
      await navigator.clipboard.writeText(text);
      alert(messageForUser);
      setText('');
    };
  }

  return (
    <div
      className={`${
        fullDisplay || text.length > 0
          ? 'h-1/2 z-50 absolute top-0 left-0'
          : 'my-4'
      } flex flex-col w-full h-full rounded-xl`}
    >
      <div className='text-thewhite w-full h-8 flex justify-between items-center'>
        <div className='h-full w-full bg-black'>
          <div
            className='h-full'
            style={{
              width: `${lifeBarLength}%`,
              backgroundColor: lifeBarLength > 30 ? 'green' : 'red',
            }}
          ></div>
        </div>
      </div>
      {(fullDisplay || text.length > 0) && (
        <div className='w-full text-sm flex-none bg-black py-2 px-2'>
          {prompt}
        </div>
      )}
      <textarea
        ref={textareaRef}
        disabled={finished}
        style={{
          width: '100%',
          fontSize: '16px',
        }}
        placeholder='Your answer here...'
        value={text}
        className={`flex-grow p-2 bg-black ${
          text.length > 0 ? 'h-full' : 'h-24'
        } rounded-xl text-white border overflow-y-auto`} // Updated this line
        onChange={handleTextChange}
      />
      {(fullDisplay || text.length) > 0 && isDone && (
        <div
          className='h-8 flex-none'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <button
            className='bg-green-700'
            style={{ width: '50%' }}
            onClick={onSubmit}
          >
            {btnOneText}
          </button>
          <button
            className='bg-red-700'
            style={{ width: '50%' }}
            onClick={onDiscard}
          >
            {btnTwoText}
          </button>
        </div>
      )}
    </div>
  );
};

export default WritingGame;
