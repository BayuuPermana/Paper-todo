import React from 'react';

function PaperCalendar({ activityLog }) {
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

  const getIntensityColor = (day) => {
    if (!day || !activityLog) return 'transparent';
    
    // Create date string in local YYYY-MM-DD format
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toLocaleDateString('en-CA');
    const pts = activityLog[dateStr] || 0;

    if (pts === 0) return 'transparent';
    if (pts < 3) return '#eee'; // Light graphite
    if (pts < 6) return '#ccc'; // Medium graphite
    if (pts < 10) return '#888'; // Dark graphite
    return '#333'; // Heavy graphite (Solenya tier)
  };

  const getTextColor = (day) => {
    if (!day || !activityLog) return 'inherit';
    const date = new Date(currentYear, currentMonth, day);
    const dateStr = date.toLocaleDateString('en-CA');
    const pts = activityLog[dateStr] || 0;
    return pts >= 10 ? '#fff' : 'inherit';
  };

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
        
        {days.map((day, index) => {
          const intensity = getIntensityColor(day);
          const isToday = day === currentDate;
          
          return (
            <div key={index} style={{
              padding: '5px 0',
              backgroundColor: intensity,
              borderRadius: isToday ? '50%' : '2px',
              border: isToday ? '1px dashed black' : 'none',
              fontWeight: isToday ? 'bold' : 'normal',
              color: day === null ? 'transparent' : getTextColor(day),
              transition: 'background-color 0.3s ease'
            }}>
              {day || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaperCalendar;
