import React, { useState, useEffect } from 'react';

function PomodoroTimer({ activeSubTaskName, onTaskComplete }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      // Play a sound or alert here if we wanted to be fancy
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Reset timer if task changes
  useEffect(() => {
    setTimeLeft(25 * 60);
    setIsActive(false);
  }, [activeSubTaskName]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pomodoro-timer" style={{
      padding: '20px',
      border: '2px solid black',
      borderRadius: '5px',
      boxShadow: '3px 3px 0px black',
      backgroundColor: '#fff',
      textAlign: 'center'
    }}>
      <h3 style={{ marginTop: 0, fontSize: '1.2em' }}>Pomodoro</h3>
      
      {activeSubTaskName ? (
        <div style={{ marginBottom: '15px' }}>
          <span style={{ fontSize: '0.9em', color: '#666' }}>Focusing on:</span>
          <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{activeSubTaskName}</div>
        </div>
      ) : (
        <div style={{ marginBottom: '15px', fontStyle: 'italic', color: '#aaa' }}>
          Select a step to focus
        </div>
      )}

      <div style={{ 
        fontSize: '3em', 
        fontWeight: 'bold', 
        fontFamily: 'Courier New, Courier, monospace',
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #eee',
        backgroundColor: '#fafafa'
      }}>
        {formatTime(timeLeft)}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={toggleTimer}
          style={{
            padding: '5px 15px',
            border: '2px solid black',
            backgroundColor: isActive ? '#ffccbc' : '#c8e6c9',
            cursor: 'pointer',
            fontWeight: 'bold'
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
          Reset
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
