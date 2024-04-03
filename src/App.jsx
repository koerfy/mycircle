import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './App.css';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklistItems, setChecklistItems] = useState({});

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('checklistItems'));
    if (storedItems) {
      setChecklistItems(storedItems);
    }
  }, []);

  const handleDateClick = date => {
    setDate(date);
    setShowChecklist(true);
  };

  const toggleChecklistItem = item => {
    const updatedItems = {
      ...checklistItems,
      [date.toDateString()]: {
        ...(checklistItems[date.toDateString()] || {}),
        [item]: !checklistItems[date.toDateString()]?.[item], 
      },
    };
    setChecklistItems(updatedItems);
    localStorage.setItem('checklistItems', JSON.stringify(updatedItems));
  };

  const renderChecklist = () => {
    const items = checklistItems[date.toDateString()] || {};
    return (
      <div className="checklist">
        <h2>{date.toDateString()}</h2>
        <h3>Check-off List</h3>
        <ul>
        <li onClick={() => toggleChecklistItem('Item 11')} className={items['Item 11'] ? 'checked' : ''}>
          1. Wake up by 8am weekdays, 9am weekends
          </li>
          <li onClick={() => toggleChecklistItem('Item 1')} className={items['Item 1'] ? 'checked' : ''}>
          2. No social media 1hr after waking up/1hr before bed
          </li>
          <li onClick={() => toggleChecklistItem('Item 2')} className={items['Item 2'] ? 'checked' : ''}>
          3. Journal for 10minutes at least 5 days/week
          </li>
          <li onClick={() => toggleChecklistItem('Item 3')} className={items['Item 3'] ? 'checked' : ''}>
          4. Read at least 1 Bible chapter/day(example Esther 1)
          </li>
          <li onClick={() => toggleChecklistItem('Item 4')} className={items['Item 4'] ? 'checked' : ''}>
          5. Spend time in prayer and or devotion(at least 15min)
          </li>
          <li onClick={() => toggleChecklistItem('Item 9')} className={items['Item 9'] ? 'checked' : ''}>
          6. Read 10 pages of any book each day (non fiction/self help) or listen to an educational podcast.
          </li>
          <li onClick={() => toggleChecklistItem('Item 5')} className={items['Item 5'] ? 'checked' : ''}>
          7. Eat well/healthy-no fast food, no sugared sodas, juices/alcohol, no processed sugars- cookies, ice cream, cakes etc(can modify for the week or only on weekends)
          </li>
          <li onClick={() => toggleChecklistItem('Item 8')} className={items['Item 8'] ? 'checked' : ''}>
          8. Drink 3L liters m(100oz) of water a day
          </li>   
          <li onClick={() => toggleChecklistItem('Item 7')} className={items['Item 7'] ? 'checked' : ''}>
          9. Exercise for 30-45 minutes every day at least 5 days/week.( don’t skip 2 days in a row)
          </li>
          <li onClick={() => toggleChecklistItem('Item 13')} className={items['Item 13'] ? 'checked' : ''}>
          10. Move daily- goal of 10,000 steps, but you can build up from 5,000 steps ( walk around the neighborhood)
          </li>
          <li onClick={() => toggleChecklistItem('Item 10')} className={items['Item 10'] ? 'checked' : ''}>
          11. No electronics after 10pm/be in bed preparing for sleep by 10:30pm
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="app">
      <div className="calendar-container">
        <h1>75 Days Soft Challenge</h1>
        <Calendar onClickDay={handleDateClick} value={date} />
      </div>
      {showChecklist && renderChecklist()}
    </div>
  );
};

export default App;
