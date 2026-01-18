import React, { useState, useEffect } from 'react';
import { audio } from './utils/GodAudio';

function PomodoroTimer({ activeSubTaskName, onTaskComplete }) {
  const PRESETS = [15, 25, 45, 60];
  const [selectedPreset, setSelectedPreset] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isFlowMode, setIsFlowMode] = useState(true);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [isBurnedOut, setIsBurnedOut] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && !isBurnedOut) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 0 && isFlowMode) {
            return time - 1; 
          }
          if (time === 0) {
            audio.playChime();
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
        setTotalFocusTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isFlowMode, isBurnedOut]);

  useEffect(() => {
    if (totalFocusTime >= 90 * 60) {
      setIsBurnedOut(true);
      setIsActive(false);
    }
  }, [totalFocusTime]);

  useEffect(() => {
    setTimeLeft(selectedPreset * 60);
    setIsActive(false);
  }, [selectedPreset, activeSubTaskName]);

  const toggleTimer = () => {
    if (isBurnedOut) return;
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTimeLeft(selectedPreset * 60);
    setIsActive(false);
    if (isBurnedOut) {
        setTotalFocusTime(0);
        setIsBurnedOut(false);
    }
  };

  const formatTime = (seconds) => {
    const isNegative = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const mins = Math.floor(absSeconds / 60);
    const secs = absSeconds % 60;
    return `${isNegative ? '-' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pomodoro-timer" style={{
      padding: '20px',
      border: '2px solid black',
      borderRadius: '5px',
      boxShadow: '3px 3px 0px black',
      backgroundColor: isBurnedOut ? '#ffcdd2' : '#fff',
      textAlign: 'center',
      position: 'relative'
    }}>
      <h3 style={{ marginTop: 0, fontSize: '1.2em' }}>
        {isBurnedOut ? '⚠️ BURNOUT SHIELD' : 'Focus Engine'}
      </h3>
      
      {isBurnedOut ? (
        <div style={{ padding: '10px', color: '#b71c1c', fontWeight: 'bold' }}>
          Mandatory Recovery Mode Active. <br/> Take a 5-minute break.
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '15px' }}>
            {PRESETS.map(p => (
              <button 
                key={p}
                onClick={() => setSelectedPreset(p)}
                style={{
                  padding: '2px 8px',
                  border: '1px solid black',
                  backgroundColor: selectedPreset === p ? '#eee' : '#fff',
                  cursor: 'pointer',
                  fontSize: '0.8em',
                  boxShadow: selectedPreset === p ? 'inset 1px 1px 2px rgba(0,0,0,0.2)' : '1px 1px 0px black'
                }}
              >
                {p}m
              </button>
            ))}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ 
              fontSize: '0.8em', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              userSelect: 'none'
            }}>
              <input 
                type="checkbox" 
                className="custom-checkbox"
                checked={isFlowMode} 
                onChange={() => setIsFlowMode(!isFlowMode)}
              />
              <span style={{ fontWeight: 'bold' }}>Flow Mode (Auto-Continue)</span>
            </label>
          </div>
        </>
      )}

      {activeSubTaskName && !isBurnedOut && (
        <div style={{ marginBottom: '15px' }}>
          <span style={{ fontSize: '0.7em', color: '#666' }}>Active Focus:</span>
          <div style={{ fontWeight: 'bold', fontSize: '1em' }}>{activeSubTaskName}</div>
        </div>
      )}

      <div style={{ 
        fontSize: '3em', 
        fontWeight: 'bold', 
        fontFamily: 'Courier New, Courier, monospace',
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #eee',
        backgroundColor: timeLeft < 0 ? '#e8f5e9' : '#fafafa',
        color: timeLeft < 0 ? '#2e7d32' : '#333'
      }}>
        {formatTime(timeLeft)}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={toggleTimer}
          disabled={isBurnedOut}
          style={{
            padding: '5px 15px',
            border: '2px solid black',
            backgroundColor: isActive ? '#ffccbc' : '#c8e6c9',
            cursor: isBurnedOut ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: isBurnedOut ? 0.5 : 1
          }}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={resetTimer}
          style={{
            padding: '5px 15px',
            border: '2px solid black',
            backgroundColor: '#fff',
            cursor: 'pointer'
          }}
        >
          {isBurnedOut ? 'Recovered' : 'Reset'}
        </button>
      </div>

      {!isBurnedOut && (
        <div style={{ marginTop: '15px', fontSize: '0.7em', color: '#888' }}>
          Total Session Focus: {Math.floor(totalFocusTime / 60)}m / 90m
        </div>
      )}
    </div>
  );
}

export default PomodoroTimer;
