// ✅ 1. Using eval() - Quick but unsafe for user input
function evalMethod(expression) {
  return eval(expression);
}

// ✅ 2. Using Function() with validation (safer)
function safeEval(expression) {
  // Allow only numbers, + - * / ( ) . and spaces
  if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
    throw new Error("Invalid characters in expression");
  }
  return new Function('return ' + expression)();
}

// ✅ 3. Custom parser using Shunting Yard Algorithm (Fully Safe, No eval)
function parseExpression(expr) {
  const outputQueue = [];
  const operatorStack = [];
  const operators = {
    '+': { precedence: 1, associativity: 'Left' },
    '-': { precedence: 1, associativity: 'Left' },
    '*': { precedence: 2, associativity: 'Left' },
    '/': { precedence: 2, associativity: 'Left' }
  };

  // Tokenize
  const tokens = expr.match(/\d+(\.\d+)?|[+\-*/()]/g);
  if (!tokens) throw new Error("Invalid expression");

  tokens.forEach(token => {
    if (!isNaN(token)) {
      outputQueue.push(token);
    } else if (operators[token]) {
      while (
        operatorStack.length &&
        operators[operatorStack[operatorStack.length - 1]] &&
        (
          (operators[token].associativity === 'Left' &&
          operators[token].precedence <= operators[operatorStack[operatorStack.length - 1]].precedence)
        )
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop();
    }
  });

  while (operatorStack.length) {
    outputQueue.push(operatorStack.pop());
  }

  // Evaluate RPN
  const stack = [];
  outputQueue.forEach(token => {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(a / b); break;
      }
    }
  });

  return stack[0];
}

// ✅ Test all methods
const expression = "10 + 2 * (6 / 3)";

console.log("Using eval():", evalMethod(expression));         // 14
console.log("Using safeEval():", safeEval(expression));       // 14
console.log("Using custom parser:", parseExpression(expression)); // 14
