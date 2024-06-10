import React, { useState } from 'react';

const PostfixEvaluator = () => {
  const [expression, setExpression] = useState('');
  const [stack, setStack] = useState([]);
  const [elements, setElements] = useState([]);
  const variables = [];
  const stepsY = []
  let disOfVar = 10;
  let heightofVar = 20;
  
  let gateX = 400;
  let gateY = 60;

  // const svgMapOpt = {
  //   '*': `<path d="M 70 100 C 100 100, 100 140, 70 140 M 70 100 L 70 140" stroke="black" fill="transparent" stroke-width="2" />`,
  //   '+': `<path d="M 70 100 C 105 105, 100 110, 115 127" stroke="black" fill="transparent" stroke-width="2" />
  //   <path d="M 70 154 C 105 148, 100 143, 115 127" stroke="black" fill="transparent" stroke-width="2" />
  //   <path d="M 70 100 C 80 110, 80 140, 70 154" stroke="black" fill="transparent" stroke-width="2" />`,
  //   '\'': `<path d="M 10 80 L 45 105 L 10 135 Z" stroke="black" fill="transparent" stroke-width="2" />
  //   <circle cx="50" cy="105" r="5" fill="none" stroke="black" stroke-width="2"/>`
  // };


  const getPositionX = (char) => {
    const variable = variables.find(variable => variable.name === char);
    return variable ? variable.positionX : null;
  };
  const getStepY = (step) => {
    const variable = stepsY.find(variable => variable.num === step);
    return variable ? variable : null;
  };
  

  const isOperand = (char) => {
    // Check if the character is an alphabetic variable (a-z or A-Z)
    return /^[a-zA-Z]+$/.test(char);
  };
  let str = '';
  const evaluateExpression = () => {
    const tempStack = [];
    str += `<svg width="10000" height="1000" xmlns="http://www.w3.org/2000/svg">`;

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
      }
    }

    let stepDuration = disOfVar + 100;

    for (let char of expression) {
      if (isOperand(char)) {
        const stackVar = {
          name: char,
          position: 0,
          positionX: getPositionX(char),
          gateOutX: -1,
          gateOutY: -1,
          isNot: false
        }; 
        tempStack.push(stackVar);
        
      } else{
        // Pop two operands from the stack

        if(char === '\'')
        {
          const operand1 = tempStack.pop();

          operand1.isNot = true;
          
          tempStack.push(operand1);

        }
        else
        {
        
          const operand2 = tempStack.pop();
          const operand1 = tempStack.pop();

          const step = 1 + (operand1.position>=operand2.position ? operand1.position : operand2.position);
          let outX = -1;
          let outY = -1;
        
          if(char === '*') 
          {
            let sty = gateY;
            let stx = stepDuration;
            if(!stepsY.some(variable => variable.num === step))
            {
              const varb = {
                num: step,
                gateX: stepDuration,
                gateY: gateY
              }
              stepsY.push(varb);
              stepDuration += disOfVar+100;
              gateY += 50;
            }
            else
            {
              const temp = getStepY(step);
              sty = temp.gateY + 100;
              stx = temp.gateX;
              temp.gateY += 100;
            }
            
            str += `<path d="M ${stx} ${sty} C ${stx+40} ${sty}, ${stx+40} ${sty+50}, ${stx} ${sty+50} M ${stx} ${sty} L ${stx} ${sty+50}" stroke="black" fill="transparent" stroke-width="2" />`;
            outX = getStepY(step).gateX + 30;
            outY = getStepY(step).gateY + 25;
          }

          if(char === '+') 
          {
            let sty = gateY;
            let stx = stepDuration;
            if(!stepsY.some(variable => variable.num === step))
            {
                const varb = {
                  num: step,
                  gateX: stepDuration,
                  gateY: gateY
                }
                stepsY.push(varb);
                stepDuration += disOfVar+100;
                gateY += 50;
              }
              else
              {
                const temp = getStepY(step);
                sty = temp.gateY + 100;
                stx = temp.gateX;
                temp.gateY += 100;
              }
              
              str += `<path d="M ${stx} ${sty} C ${stx+35} ${sty+5}, ${stx+30} ${sty+10}, ${stx+45} ${sty+27}" stroke="black" fill="transparent" stroke-width="2" />
              <path d="M ${stx} ${sty+54} C ${stx+35} ${sty+48}, ${stx+30} ${sty+43}, ${stx+45} ${sty+27}" stroke="black" fill="transparent" stroke-width="2" />
              <path d="M ${stx} ${sty} C ${stx+10} ${sty+10}, ${stx+10} ${sty+40}, ${stx} ${sty+54}" stroke="black" fill="transparent" stroke-width="2" />`;
              outX = getStepY(step).gateX + 45;
              outY = getStepY(step).gateY + 27;
          }

          if(operand1.name.length === 1 && operand2.name.length ===1)
          {
            let x = 0;
            if(char==='+') x += 5;

            let temp = getStepY(step).gateY+40;
            if(temp>=heightofVar)
            {
              if(!operand1.isNot){str += `<line x1=${operand1.positionX} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
              <circle cx=${operand1.positionX} cy=${getStepY(step).gateY+10} r="4"/>`;}
              else{
                str += `<line x1=${operand1.positionX} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x-50} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                <path d="M ${getStepY(step).gateX+x-50} ${getStepY(step).gateY} L ${getStepY(step).gateX+x-50+15} ${getStepY(step).gateY+10} L ${getStepY(step).gateX+x-50} ${getStepY(step).gateY+20} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX+x-50+19} cy=${getStepY(step).gateY+10} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX+x-50+23} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                <circle cx=${operand1.positionX} cy=${getStepY(step).gateY+10} r="4"/>`;
              }

              if(!operand2.isNot){str += `<line x1=${operand2.positionX} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <circle cx=${operand2.positionX} cy=${getStepY(step).gateY+40} r="4"/>`;}
              else{
                str += `<line x1=${operand2.positionX} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x-50} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
                <path d="M ${getStepY(step).gateX+x-50} ${getStepY(step).gateY+30} L ${getStepY(step).gateX+x-50+15} ${getStepY(step).gateY+40} L ${getStepY(step).gateX+x-50} ${getStepY(step).gateY+50} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX+x-50+19} cy=${getStepY(step).gateY+40} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX+x-50+23} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
                <circle cx=${operand2.positionX} cy=${getStepY(step).gateY+40} r="4"/>`;
              }
              
              heightofVar = temp + 50; 
            }
            else
            {
              let x = 0;
              if(char==='+') x += 5;

              if(!operand1.isNot)
              {
                str += `<line x1=${operand1.positionX} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${heightofVar} stroke="black" stroke-width="2" />
              <circle cx=${operand1.positionX} cy=${heightofVar} r="4"/>
              <line x1=${getStepY(step).gateX-30} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
              `;
              } 
              else{
                str += `<line x1=${operand1.positionX} y1=${heightofVar} x2=${getStepY(step).gateX-30-53} y2=${heightofVar} stroke="black" stroke-width="2" />
              <circle cx=${operand1.positionX} cy=${heightofVar} r="4"/>
              <path d="M ${getStepY(step).gateX-30-53} ${heightofVar-10} L ${getStepY(step).gateX-30-53+15} ${heightofVar} L ${getStepY(step).gateX-30-53} ${heightofVar+10} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX-30-53+19} cy=${heightofVar} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX-30-53+23} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${heightofVar} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
              `;
              }
              heightofVar += 30;

              if(!operand2.isNot)
              {
                str += `<line x1=${operand2.positionX} y1=${heightofVar} x2=${getStepY(step).gateX-40} y2=${heightofVar} stroke="black" stroke-width="2" />
              <circle cx=${operand2.positionX} cy=${heightofVar} r="4"/>
              <line x1=${getStepY(step).gateX-40} y1=${heightofVar} x2=${getStepY(step).gateX-40} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-40} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              `;
              } 
              else{
                str += `<line x1=${operand2.positionX} y1=${heightofVar} x2=${getStepY(step).gateX-40-53} y2=${heightofVar} stroke="black" stroke-width="2" />
              <circle cx=${operand2.positionX} cy=${heightofVar} r="4"/>
              <path d="M ${getStepY(step).gateX-40-53} ${heightofVar-10} L ${getStepY(step).gateX-40-53+15} ${heightofVar} L ${getStepY(step).gateX-40-53} ${heightofVar+10} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX-40-53+19} cy=${heightofVar} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX-40-53+23} y1=${heightofVar} x2=${getStepY(step).gateX-40} y2=${heightofVar} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-40} y1=${heightofVar} x2=${getStepY(step).gateX-40} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-40} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              `;
              }
              heightofVar += 50;
            }
            
          }
          else if(operand1.name.length === 1 && operand2.name.length !== 1)
          {
            let x = 0;
            if(char==='+') x += 5;

            if(!operand2.isNot)  {str += `<line x1=${operand2.gateOutX} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-40} y2=${operand2.gateOutY} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-40} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                `;}
              else
              {
                str += `<line x1=${operand2.gateOutX} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-40-53} y2=${operand2.gateOutY} stroke="black" stroke-width="2" />
                <path d="M ${getStepY(step).gateX-40-53} ${operand2.gateOutY-10} L ${getStepY(step).gateX-40-53+15} ${operand2.gateOutY} L ${getStepY(step).gateX-40-53} ${operand2.gateOutY+10} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX-40-53+19} cy=${operand2.gateOutY} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX-40-53+23} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-40} y2=${operand2.gateOutY} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-40} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                `;
              }
              
            let temp = getStepY(step).gateY+40;
            if(temp>=heightofVar)
            {
              if(!operand1.isNot){str += `<line x1=${operand1.positionX} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <circle cx=${operand1.positionX} cy=${getStepY(step).gateY+40} r="4"/>`;}
              else{
                str += `<line x1=${operand1.positionX} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x-50} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
                <path d="M ${getStepY(step).gateX+x-50} ${getStepY(step).gateY+30} L ${getStepY(step).gateX+x-50+15} ${getStepY(step).gateY+40} L ${getStepY(step).gateX+x-50} ${getStepY(step).gateY+50} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX+x-50+19} cy=${getStepY(step).gateY+40} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX+x-50+23} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
                <circle cx=${operand1.positionX} cy=${getStepY(step).gateY+40} r="4"/>`;
              }
              heightofVar = temp + 50; 
            }
            else
            {
              if(!operand1.isNot)
              {
                str += `<line x1=${operand1.positionX} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${heightofVar} stroke="black" stroke-width="2" />
              <circle cx=${operand1.positionX} cy=${heightofVar} r="4"/>
              <line x1=${getStepY(step).gateX-30} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              `;
              } 
              else{
                str += `<line x1=${operand1.positionX} y1=${heightofVar} x2=${getStepY(step).gateX-30-53} y2=${heightofVar} stroke="black" stroke-width="2" />
              <circle cx=${operand1.positionX} cy=${heightofVar} r="4"/>
              <path d="M ${getStepY(step).gateX-30-53} ${heightofVar-10} L ${getStepY(step).gateX-30-53+15} ${heightofVar} L ${getStepY(step).gateX-30-53} ${heightofVar+10} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX-30-53+19} cy=${heightofVar} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX-30-53+23} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${heightofVar} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              `;
              }
              heightofVar += 50;
            }
          }
          else if(operand1.name.length !== 1 && operand2.name.length === 1)
          {  
            let x = 0;
            if(char==='+') x += 5;

            if(!operand1.isNot)  {str += `<line x1=${operand1.gateOutX} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40} y2=${operand1.gateOutY} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                `;}
              else
              {
                str += `<line x1=${operand1.gateOutX} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40-53} y2=${operand1.gateOutY} stroke="black" stroke-width="2" />
                <path d="M ${getStepY(step).gateX-40-53} ${operand1.gateOutY-10} L ${getStepY(step).gateX-40-53+15} ${operand1.gateOutY} L ${getStepY(step).gateX-40-53} ${operand1.gateOutY+10} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX-40-53+19} cy=${operand1.gateOutY} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX-40-53+23} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40} y2=${operand1.gateOutY} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                `;
              }

            let temp = getStepY(step).gateY+40;
            if(temp>=heightofVar)
            {
              if(!operand2.isNot){str += `<line x1=${operand2.positionX} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <circle cx=${operand2.positionX} cy=${getStepY(step).gateY+40} r="4"/>`;}
              else{
                str += `<line x1=${operand2.positionX} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x-50} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
                <path d="M ${getStepY(step).gateX+x-50} ${getStepY(step).gateY+30} L ${getStepY(step).gateX+x-50+15} ${getStepY(step).gateY+40} L ${getStepY(step).gateX+x-50} ${getStepY(step).gateY+50} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX+x-50+19} cy=${getStepY(step).gateY+40} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX+x-50+23} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
                <circle cx=${operand2.positionX} cy=${getStepY(step).gateY+40} r="4"/>`;
              }
              heightofVar = temp + 50; 

            }
            else
            {
              
              if(!operand2.isNot)
              {
                str += `<line x1=${operand2.positionX} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${heightofVar} stroke="black" stroke-width="2" />
              <circle cx=${operand2.positionX} cy=${heightofVar} r="4"/>
              <line x1=${getStepY(step).gateX-30} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              `;
              } 
              else{
                str += `<line x1=${operand2.positionX} y1=${heightofVar} x2=${getStepY(step).gateX-30-53} y2=${heightofVar} stroke="black" stroke-width="2" />
              <circle cx=${operand2.positionX} cy=${heightofVar} r="4"/>
              <path d="M ${getStepY(step).gateX-30-53} ${heightofVar-10} L ${getStepY(step).gateX-30-53+15} ${heightofVar} L ${getStepY(step).gateX-30-53} ${heightofVar+10} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX-30-53+19} cy=${heightofVar} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX-30-53+23} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${heightofVar} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${heightofVar} x2=${getStepY(step).gateX-30} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              `;
              }
              heightofVar += 50;
            }
            
          }
          else
          {
            let x = 0;
            if(char==='+') x += 5;

              if(!operand1.isNot)  {str += `<line x1=${operand1.gateOutX} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40} y2=${operand1.gateOutY} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                `;}
              else
              {
                str += `<line x1=${operand1.gateOutX} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40-53} y2=${operand1.gateOutY} stroke="black" stroke-width="2" />
                <path d="M ${getStepY(step).gateX-40-53} ${operand1.gateOutY-10} L ${getStepY(step).gateX-40-53+15} ${operand1.gateOutY} L ${getStepY(step).gateX-40-53} ${operand1.gateOutY+10} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX-40-53+19} cy=${operand1.gateOutY} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX-40-53+23} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40} y2=${operand1.gateOutY} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${operand1.gateOutY} x2=${getStepY(step).gateX-40} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-40} y1=${getStepY(step).gateY+10} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+10} stroke="black" stroke-width="2" />
                `;
              }


              if(!operand2.isNot) {str += `<line x1=${operand2.gateOutX} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-30} y2=${operand2.gateOutY} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-30} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              <line x1=${getStepY(step).gateX-30} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
              `;}
              else
              {
                str += `<line x1=${operand2.gateOutX} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-30-53} y2=${operand2.gateOutY} stroke="black" stroke-width="2" />
                <path d="M ${getStepY(step).gateX-30-53} ${operand2.gateOutY-10} L ${getStepY(step).gateX-30-53+15} ${operand2.gateOutY} L ${getStepY(step).gateX-30-53} ${operand2.gateOutY+10} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${getStepY(step).gateX-30-53+19} cy=${operand2.gateOutY} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${getStepY(step).gateX-30-53+23} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-30} y2=${operand2.gateOutY} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-30} y1=${operand2.gateOutY} x2=${getStepY(step).gateX-30} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
                <line x1=${getStepY(step).gateX-30} y1=${getStepY(step).gateY+40} x2=${getStepY(step).gateX+x} y2=${getStepY(step).gateY+40} stroke="black" stroke-width="2" />
                `;
              }
          }
          
          
          // Combine them with the operator into a string
          const combined = `${operand1.name}${char}${operand2.name}`;
          
          const stackVar = {
            name: combined,
            position: step,
            positionX: 0,
            gateOutX: outX,
            gateOutY: outY,
            isNot: false
          }; 
          // str += `<line x1=${outX} y1=${outY} x2=${outX+5} y2=${outY} stroke="black" stroke-width="2" />`;

          tempStack.push(stackVar);
        }
        
      }
    }
    const lastElement = tempStack.pop();
    if(!lastElement.isNot) str += `<line x1=${lastElement.gateOutX} y1=${lastElement.gateOutY} x2=${lastElement.gateOutX+150} y2=${lastElement.gateOutY} stroke="black" stroke-width="2" />`;
    else
    {
      str += `<line x1=${lastElement.gateOutX} y1=${lastElement.gateOutY} x2=${lastElement.gateOutX+100} y2=${lastElement.gateOutY} stroke="black" stroke-width="2" />
      <path d="M ${lastElement.gateOutX+100} ${lastElement.gateOutY-10} L ${lastElement.gateOutX+100+15} ${lastElement.gateOutY} L ${lastElement.gateOutX+100} ${lastElement.gateOutY+10} Z" stroke="black" fill="transparent" stroke-width="2" />
                <circle cx=${lastElement.gateOutX+100+19} cy=${lastElement.gateOutY} r="3" fill="none" stroke="black" stroke-width="2"/>
                <line x1=${lastElement.gateOutX+100+23} y1=${lastElement.gateOutY} x2=${lastElement.gateOutX+100+100} y2=${lastElement.gateOutY} stroke="black" stroke-width="2" />
                `;
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
