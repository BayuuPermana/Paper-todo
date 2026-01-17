import React from 'react';

function PaperCalendar() {
  const today = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days = [];
  // Add empty slots for days of the previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Add days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="paper-calendar" style={{
      padding: '15px',
      border: '2px solid black',
      borderRadius: '5px',
      boxShadow: '3px 3px 0px black',
      backgroundColor: '#fff',
      fontFamily: 'inherit'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '1.1em', textAlign: 'center' }}>
        {monthNames[currentMonth]} {currentYear}
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '2px',
        textAlign: 'center',
        fontSize: '0.8em'
      }}>
        {dayLabels.map(label => (
          <div key={label + Math.random()} style={{ fontWeight: 'bold', borderBottom: '1px solid black' }}>
            {label}
          </div>
        ))}
        
        {days.map((day, index) => (
          <div key={index} style={{
            padding: '5px 0',
            backgroundColor: day === currentDate ? '#fff9c4' : 'transparent',
            borderRadius: day === currentDate ? '50%' : '0',
            border: day === currentDate ? '1px dashed black' : 'none',
            fontWeight: day === currentDate ? 'bold' : 'normal',
            color: day === null ? 'transparent' : 'inherit'
          }}>
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaperCalendar;
