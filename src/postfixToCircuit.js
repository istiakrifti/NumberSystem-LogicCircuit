import React, { useState } from 'react';

const PostfixEvaluator = () => {
  const [expression, setExpression] = useState('');
  const [stack, setStack] = useState([]);
  const [elements, setElements] = useState([]);
  const variables = [];
  let disOfVar = 10;
  let heightofVar = 20;
  let stepDuration = 400;
  let gateX = 400;
  let gateY = 60;

  const svgMapOpt = {
    '*': `<path d="M 70 100 C 100 100, 100 140, 70 140 M 70 100 L 70 140" stroke="black" fill="transparent" stroke-width="2" />`,
    '+': `<path d="M 70 100 C 105 105, 100 110, 115 127" stroke="black" fill="transparent" stroke-width="2" />
    <path d="M 70 154 C 105 148, 100 143, 115 127" stroke="black" fill="transparent" stroke-width="2" />
    <path d="M 70 100 C 80 110, 80 140, 70 154" stroke="black" fill="transparent" stroke-width="2" />`,
    '\'': `<path d="M 10 80 L 45 105 L 10 135 Z" stroke="black" fill="transparent" stroke-width="2" />
    <circle cx="50" cy="105" r="5" fill="none" stroke="black" stroke-width="2"/>`
  };


  const getPositionX = (char) => {
    const variable = variables.find(variable => variable.name === char);
    return variable ? variable.positionX : null;
  };
  

  const isOperand = (char) => {
    // Check if the character is an alphabetic variable (a-z or A-Z)
    return /^[a-zA-Z]+$/.test(char);
  };
  let str = '';
  const evaluateExpression = () => {
    const tempStack = [];
    str += `<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">`;
    for (let char of expression) {
      if (isOperand(char)) {
        if(!variables.some(variable => variable.name === char))
          {
            str += 
            `<text x=${disOfVar} y="40" font-family="Verdana" font-size="25" fill="black">${char}</text>
            <line x1=${disOfVar+7} y1="50" x2=${disOfVar+7} y2="1025" stroke="black" stroke-width="2" />`;
          const variable = {
            name: char,
            positionX: disOfVar + 7
          }; 
          variables.push(variable);
          disOfVar += 30;
          }
          const stackVar = {
            name: char,
            position: 0,
            positionX: getPositionX(char)
          }; 
        tempStack.push(stackVar);
        
      } else{
        // Pop two operands from the stack
        // const svg = svgMapOpt[char]

        const operand2 = tempStack.pop();
        const operand1 = tempStack.pop();

        const step = 1 + (operand1.position>=operand2.position ? operand1.position : operand2.position);

        if(char === '*') 
        {
          str += `<path d="M ${gateX} ${gateY} C ${gateX+40} ${gateY}, ${gateX+40} ${gateY+50}, ${gateX} ${gateY+50} M ${gateX} ${gateY} L ${gateX} ${gateY+50}" stroke="black" fill="transparent" stroke-width="2" />`;
          gateY += 80;
        }

        if(operand1.name.length ===1)
        {
          str += `<line x1=${operand1.positionX} y1=${heightofVar+50} x2=${stepDuration*step} y2=${heightofVar+50} stroke="black" stroke-width="2" />
          <circle cx=${operand1.positionX} cy=${heightofVar+50} r="4"/>`
          heightofVar += 30;
        }
        if(operand2.name.length ===1)
        {
          str += `<line x1=${operand2.positionX} y1=${heightofVar+50} x2=${stepDuration*step} y2=${heightofVar+50} stroke="black" stroke-width="2" />
          <circle cx=${operand2.positionX} cy=${heightofVar+50} r="4"/>`
          heightofVar += 30;
        }
        
        
        // Combine them with the operator into a string
        const combined = `${operand1.name}${char}${operand2.name}`;
        const stackVar = {
          name: combined,
          position: step,
          positionX: 0
        }; 
        tempStack.push(stackVar);
        
      }
    }
    str += `</svg>`;
    setStack(tempStack);
    setElements(str);
  };

  return (
    <div>
      <h2>Postfix Expression Evaluator</h2>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter postfix expression"
      />
      <button onClick={evaluateExpression}>Evaluate</button>
      <h3>Stack Content</h3>
      <div dangerouslySetInnerHTML={{ __html: elements }} />
    </div>
    
  );
};

export default PostfixEvaluator;
