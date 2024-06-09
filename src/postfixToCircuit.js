import React, { useState } from 'react';

const PostfixEvaluator = () => {
  const [expression, setExpression] = useState('');
  const [stack, setStack] = useState([]);
  const [elements, setElements] = useState([]);
  const variables = [];
  let disOfVar = 10;
  let heightofVar = 20;
  let stepDuration = 400;
  const svgMapOpt = {
    '+': <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><line x1="8" y1="1" x2="8" y2="15" stroke="black" /><line x1="1" y1="8" x2="15" y2="8" stroke="black" /></svg>,
    '*': <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="3" x2="13" y2="13" stroke="black" /><line x1="3" y1="13" x2="13" y2="3" stroke="black" /></svg>,
    '\'': <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="3" x2="13" y2="13" stroke="black" /><line x1="3" y1="13" x2="13" y2="3" stroke="black" /></svg>
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
      if (char.length === 1 && char >= "A" && char <= "Z")
        {
          if(!variables.includes(char))
          {
            str += 
            `<text x=${disOfVar} y="40" font-family="Verdana" font-size="25" fill="black">${char}</text>
            <line x1=${disOfVar+7} y1="50" x2=${disOfVar+7} y2="1025" stroke="black" stroke-width="2" />
            <line x1=${disOfVar+7} y1=${heightofVar+50} x2=${stepDuration} y2=${heightofVar+50} stroke="black" stroke-width="2" />
            <circle cx=${disOfVar+7} cy=${heightofVar+50} r="4"/>
          `;
          
          variables.push(char);
          disOfVar += 30;
          heightofVar += 40;
          }
        }
      if (isOperand(char)) {
        tempStack.push(char);
      } else{
        // Pop two operands from the stack
        const svg = svgMapOpt[char];
        const operand2 = tempStack.pop();
        const operand1 = tempStack.pop();
        
        // Combine them with the operator into a string
        const combined = `${operand1}${char}${operand2}`;
        tempStack.push(combined);
        
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
