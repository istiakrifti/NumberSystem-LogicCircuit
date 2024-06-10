import React, { useState } from 'react';


const Linecoding = () => {
  const [inputValue, setInputValue] = useState('');
  const [activeButton, setActiveButton] = useState(null); 
  const [nrzLActive, setNRZLActive] = useState(false);
  const [nrzIActive, setNRZIActive] = useState(false);
  
  const handleNRZLClick = () => {
    setNRZLActive(!nrzLActive);
  };

  const handleNRZIClick = () => {
    setNRZIActive(!nrzIActive);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

//   const handleNRZLClick = () => {
//     setActiveButton(activeButton === 'NRZ-L' ? null : 'NRZ-L');
//   };

//   const handleNRZIClick = () => {
//     setActiveButton(activeButton === 'NRZ-I' ? null : 'NRZ-I');
//   };
  const drawNRZI = () => {
    const lines = [];
    let currentY = 25; 

    for (let i = 0; i < inputValue.length; i++) {
      const x = 10 + i * 125;
      const nextX = x + 125;

      if (inputValue[i] === '0') {
        
        lines.push(
          <line key={`h-${i}`} x1={x} y1={currentY} x2={nextX} y2={currentY} stroke="red" strokeWidth="4" />
        );
      } else if (inputValue[i] === '1') {
        const previousY = currentY;
        currentY = currentY === 25 ? 235 : 25;
        lines.push(
          <line key={`h-${i}`} x1={x} y1={currentY} x2={nextX} y2={currentY} stroke="red" strokeWidth="4" />
        );

        
      }

      if (i < inputValue.length - 1 &&  inputValue[i + 1]==1) {
        lines.push(
          <line key={`v-${i}`} x1={nextX} y1={currentY} x2={nextX} y2={currentY === 25 ? 235 : 25} stroke="red" strokeWidth="4" />
        );
      }
    }

    return lines;
  };

  return (
    
    <div style={{ padding: '20px', margin: 'auto', textAlign: 'center' }}>
      <form>
        <div style={{width:'250px', display:'flex', justifyContent:'center'}}>
          <label htmlFor="input">Input:</label>
          <input
            type="text"
            id="input"
            value={inputValue}
            onChange={handleInputChange}
            style={{ marginLeft: '10px', padding: '5px', width: '100%' }}
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <button
            type="button"
            onClick={handleNRZLClick}
            style={{ marginBottom: '10px', padding: '10px 20px', width: '300px', display:'block' }}
          >
            NRZ-L
          </button>
          {nrzLActive && (
            <div className="slide-div">
              
              <div className="svg-container">
              <svg width="1000" height="300" xmlns="http://www.w3.org/2000/svg">
              <line x1="10" y1="130" x2="990" y2="130" stroke="black" strokeWidth="2"/>
              {/* <line x1="10" y1="10" x2="10" y2="290" stroke="black" strokeWidth="2"/> */}
              {/* {inputValue[0] && (
                    <text x="62" y="25" fontSize="14" fill="black">
                      {inputValue[0]}
                    </text>
                  )} */}
                  {[...Array(8)].map((_, index) => {
                    const x = 10 + index * 125;
                    return (
                      <React.Fragment key={index}>
                        <line x1={x} y1="10" x2={x} y2="290" stroke="black" strokeWidth="2"/>
                        {inputValue[index ] && (
                          <text x={x + 62} y="15" fontSize="20" fill="black" fontWeight="bold">
                            {inputValue[index]}
                          </text>
                        )}
                          {inputValue[index] === '0' && (
                          <line
                          x1={10 + index * 125}
                          y1="25"
                          x2={135 + index * 125}
                          y2="25"
                          stroke="red"
                          strokeWidth="4"
                          />
                        )}
                         {inputValue[index] === '1' && (
                          <line
                            x1={10 + index * 125}
                            y1="235"
                            x2={135 + index * 125}
                            y2="235"
                            stroke="red"
                            strokeWidth="4"
                          />
                        )}
                        {(inputValue[index] === '0' && inputValue[index + 1] === '1') && (
                          <line
                            x1={135 + index * 125}
                            y1="25"
                            x2={135 + index * 125}
                            y2="235"
                            stroke="red"
                            strokeWidth="4"
                          />
                        )}
                        {(inputValue[index] === '1' && inputValue[index + 1] === '0') && (
                          <line
                            x1={135 + index * 125}
                            y1="235"
                            x2={135 + index * 125}
                            y2="25"
                            stroke="red"
                            strokeWidth="4"
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </svg>

              </div>

              
            </div>
          )}
          <button
            type="button"
            onClick={handleNRZIClick}
            style={{ padding: '10px 20px',marginTop:'20px' ,width: '300px' ,display:'block'}}
          >
            NRZ-I
          </button>
          {nrzIActive && (
            <div className="slide-div">
              <div className="svg-container">
                <svg width="1000" height="300" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10" y1="130" x2="990" y2="130" stroke="black" strokeWidth="2" />
                  {[...Array(8)].map((_, index) => {
                    const x = 10 + index * 125;
                    return (
                      <React.Fragment key={index}>
                        <line x1={x} y1="10" x2={x} y2="290" stroke="black" strokeWidth="2" />
                        {inputValue[index] && (
                          <text x={x + 62} y="15" fontSize="20" fill="black" fontWeight="bold">
                            {inputValue[index]}
                          </text>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {drawNRZI()}
                </svg>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
    
  );
};

export default Linecoding;
