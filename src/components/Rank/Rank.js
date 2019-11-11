import React, { useState, useEffect } from 'react';

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    generateEmoji(entries);
  }, [entries]);

  function generateEmoji(entries) {
    fetch(`https://xv6vrffpe9.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
      .then(res => res.json())
      .then(data => {
        setEmoji(data.input);
      }).catch(err => console.error(err));
  }

  return (
    <div>
      <div className='white f3'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
      <div className='white f3'>
        {`Rank Badge: ${emoji}`}
      </div>
    </div>
  );
}

export default Rank;