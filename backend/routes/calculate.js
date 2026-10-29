const express = require('express');
const router = express.Router();

// Calculate endpoint
router.post('/', (req, res) => {
    const { operation, operand1, operand2, expression } = req.body;
    
    let result;
    
    try {
        if (expression) {
            // Evaluate expression (for scientific mode)
            // Note: In production, use a safer evaluation method
            result = eval(expression);
        } else if (operation && operand1 !== undefined) {
            // Basic operations
            const op1 = parseFloat(operand1);
            const op2 = operand2 !== undefined ? parseFloat(operand2) : 0;
            
            switch (operation) {
                case '+':
                    result = op1 + op2;
                    break;
                case '-':
                    result = op1 - op2;
                    break;
                case '*':
                    result = op1 * op2;
                    break;
                case '/':
                    if (op2 === 0) {
                        res.status(400).json({ error: 'Division by zero' });
                        return;
                    }
                    result = op1 / op2;
                    break;
                case '%':
                    result = op1 % op2;
                    break;
                case '^':
                    result = Math.pow(op1, op2);
                    break;
                default:
                    res.status(400).json({ error: 'Invalid operation' });
                    return;
            }
        } else {
            res.status(400).json({ error: 'Invalid request' });
            return;
        }
        
        if (isNaN(result) || !isFinite(result)) {
            res.status(400).json({ error: 'Invalid result' });
            return;
        }
        
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
