import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    let update = setInterval(() => {
      setTime(new Date());
    }, 1 * 1000);
  }, []);

  return (
    <div className="group-num-nav">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};

export default Clock;
