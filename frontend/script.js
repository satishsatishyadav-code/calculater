class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.mode = 'basic';
        this.base = 'dec';
        this.shouldResetScreen = false;
        this.history = [];
        this.memory = 0;
        this.apiUrl = 'http://localhost:3000/api';
        
        // Load from backend
        this.loadFromBackend();
        
        this.displayCurrent = document.querySelector('.current-operand');
        this.displayPrevious = document.querySelector('.previous-operand');
        this.displayBase = document.querySelector('.base-indicator');
        this.displayDecimal = document.querySelector('.decimal-equivalent');
        this.historyPanel = document.querySelector('.history-panel');
        this.historyList = document.querySelector('.history-list');
        this.memoryIndicator = document.querySelector('.memory-indicator');
        
        this.setupEventListeners();
        this.updateMemoryIndicator();
    }

    setupEventListeners() {
        // Mode tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                if (tab.dataset.action === 'toggle-history') {
                    this.toggleHistory();
                } else {
                    this.switchMode(tab.dataset.mode);
                }
            });
        });

        // Base selector (programmer mode)
        document.querySelectorAll('.base-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchBase(btn.dataset.base));
        });

        // Number buttons
        document.querySelectorAll('.btn.number').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.value === '.') {
                    this.appendDecimal();
                } else if (btn.dataset.value === '-') {
                    this.toggleSign();
                } else {
                    this.appendNumber(btn.dataset.value);
                }
            });
        });

        // Hex buttons
        document.querySelectorAll('.btn.hex').forEach(btn => {
            btn.addEventListener('click', () => this.appendNumber(btn.dataset.value));
        });

        // Operator buttons
        document.querySelectorAll('.btn.operator').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.action === 'operator') {
                    this.chooseOperation(btn.dataset.value);
                } else if (btn.dataset.action === 'bitwise') {
                    this.bitwiseOperation(btn.dataset.value);
                }
            });
        });

        // Scientific buttons
        document.querySelectorAll('.btn.scientific').forEach(btn => {
            btn.addEventListener('click', () => this.scientificOperation(btn.dataset.value));
        });

        // Parentheses
        document.querySelectorAll('.btn.parentheses').forEach(btn => {
            btn.addEventListener('click', () => this.appendParenthesis(btn.dataset.value));
        });

        // Clear and backspace
        document.querySelector('.btn.clear').addEventListener('click', () => this.clear());
        document.querySelectorAll('.btn[data-action="backspace"]').forEach(btn => {
            btn.addEventListener('click', () => this.backspace());
        });

        // Memory buttons
        document.querySelectorAll('.btn.memory').forEach(btn => {
            btn.addEventListener('click', () => {
                switch (btn.dataset.action) {
                    case 'memory-clear':
                        this.memoryClear();
                        break;
                    case 'memory-recall':
                        this.memoryRecall();
                        break;
                    case 'memory-plus':
                        this.memoryPlus();
                        break;
                    case 'memory-minus':
                        this.memoryMinus();
                        break;
                }
            });
        });

        // Clear history
        document.querySelector('.clear-history').addEventListener('click', () => this.clearHistory());

        // Equals
        document.querySelectorAll('.btn.equals').forEach(btn => {
            btn.addEventListener('click', () => this.calculate());
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    switchMode(mode) {
        this.mode = mode;
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.mode === mode);
        });
        document.querySelectorAll('.keypad').forEach(keypad => {
            keypad.classList.remove('active');
        });
        document.querySelector(`.${mode}-mode`).classList.add('active');
        
        // Hide history panel when switching modes
        this.historyPanel.style.display = 'none';
        
        // Show/hide base indicator and decimal equivalent
        if (mode === 'programmer') {
            this.base = 'dec'; // Always start with DEC in programmer mode
            this.displayBase.style.display = 'block';
            this.displayBase.textContent = 'DEC';
            this.displayDecimal.style.display = 'block';
            document.querySelectorAll('.base-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.base === 'dec');
            });
            const programmerKeypad = document.querySelector('.programmer-mode');
            programmerKeypad.dataset.base = 'dec';
        } else {
            this.displayBase.style.display = 'none';
            this.displayDecimal.style.display = 'none';
        }
        
        this.clear();
    }

    switchBase(base) {
        if (this.mode !== 'programmer') return;
        
        // Convert current value to decimal using CURRENT base
        const decimalValue = this.convertToDecimal(this.currentOperand, this.base);
        
        // Convert decimal value to NEW base
        const newOperand = this.convertFromDecimal(decimalValue, base);
        
        // NOW update the base and operand
        this.base = base;
        this.currentOperand = newOperand;
        
        document.querySelectorAll('.base-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.base === base);
        });
        
        // Update keypad for hex
        const programmerKeypad = document.querySelector('.programmer-mode');
        programmerKeypad.dataset.base = base;
        
        // Update base indicator
        this.displayBase.textContent = base.toUpperCase();
        
        this.updateDisplay();
    }

    convertToDecimal(value, fromBase) {
        if (!value || value === '0' || value === '') return 0;
        
        try {
            switch (fromBase) {
                case 'hex':
                    return parseInt(value, 16);
                case 'bin':
                    return parseInt(value, 2);
                case 'oct':
                    return parseInt(value, 8);
                case 'dec':
                    return parseInt(value, 10);
                default:
                    return parseInt(value, 10);
            }
        } catch {
            return 0;
        }
    }

    convertFromDecimal(value, toBase) {
        if (value === 0) return '0';
        
        const isNegative = value < 0;
        const absValue = Math.abs(Math.floor(value));
        
        let result;
        switch (toBase) {
            case 'hex':
                result = absValue.toString(16).toUpperCase();
                break;
            case 'bin':
                result = absValue.toString(2);
                break;
            case 'oct':
                result = absValue.toString(8);
                break;
            case 'dec':
            default:
                result = absValue.toString(10);
                break;
        }
        
        return isNegative ? '-' + result : result;
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        // Validate input based on current base
        if (this.mode === 'programmer') {
            switch (this.base) {
                case 'bin':
                    // Only allow 0 and 1
                    if (!/^[01]$/.test(number)) return;
                    break;
                case 'oct':
                    // Only allow 0-7
                    if (!/^[0-7]$/.test(number)) return;
                    break;
                case 'hex':
                    // Allow 0-9 and A-F
                    if (!/^[0-9A-Fa-f]$/.test(number)) return;
                    break;
                case 'dec':
                    // Only allow 0-9
                    if (!/^[0-9]$/.test(number)) return;
                    break;
            }
        }
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        
        this.updateDisplay();
    }

    appendDecimal() {
        if (this.mode === 'programmer') return; // No decimals in programmer mode
        if (this.shouldResetScreen) {
            this.currentOperand = '0';
            this.shouldResetScreen = false;
        }
        if (this.currentOperand.includes('.')) return;
        this.currentOperand += '.';
        this.updateDisplay();
    }

    toggleSign() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.startsWith('-')) {
            this.currentOperand = this.currentOperand.slice(1);
        } else {
            this.currentOperand = '-' + this.currentOperand;
        }
        this.updateDisplay();
    }

    appendParenthesis(paren) {
        if (this.mode !== 'scientific') return;
        this.currentOperand += paren;
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    bitwiseOperation(operation) {
        const current = parseInt(this.currentOperand, this.base === 'hex' ? 16 : this.base === 'bin' ? 2 : this.base === 'oct' ? 8 : 10);
        
        if (isNaN(current)) return;
        
        let result;
        switch (operation) {
            case 'AND':
                result = current & (this.previousOperand ? parseInt(this.previousOperand, 10) : current);
                break;
            case 'OR':
                result = current | (this.previousOperand ? parseInt(this.previousOperand, 10) : current);
                break;
            case 'XOR':
                result = current ^ (this.previousOperand ? parseInt(this.previousOperand, 10) : current);
                break;
            case 'NOT':
                result = ~current;
                break;
            case 'LSH':
                result = current << 1;
                break;
            case 'RSH':
                result = current >> 1;
                break;
        }
        
        this.currentOperand = this.convertFromDecimal(result, this.base);
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    scientificOperation(operation) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        if (this.currentOperand === '0') {
            this.currentOperand = '';
        }
        
        let funcName;
        switch (operation) {
            case 'sin':
                funcName = 'sin(';
                break;
            case 'cos':
                funcName = 'cos(';
                break;
            case 'tan':
                funcName = 'tan(';
                break;
            case 'log':
                funcName = 'log(';
                break;
            case 'ln':
                funcName = 'ln(';
                break;
            case 'sqrt':
                funcName = 'sqrt(';
                break;
            case 'pi':
                this.currentOperand += Math.PI.toString();
                this.updateDisplay();
                return;
            case 'e':
                this.currentOperand += Math.E.toString();
                this.updateDisplay();
                return;
            case 'fact':
                funcName = 'fact(';
                break;
        }
        
        this.currentOperand += funcName;
        this.updateDisplay();
    }

    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    calculate() {
        // Basic mode calculation (traditional calculator)
        if (this.mode === 'basic' || (this.previousOperand !== '' && this.operation !== undefined)) {
            let computation;
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (this.operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    if (current === 0) {
                        this.currentOperand = 'Error';
                        this.updateDisplay();
                        return;
                    }
                    computation = prev / current;
                    break;
                case '%':
                    computation = prev % current;
                    break;
                case '^':
                    computation = Math.pow(prev, current);
                    break;
                default:
                    return;
            }
            
            this.currentOperand = computation.toString();
            this.operation = undefined;
            this.previousOperand = '';
            this.shouldResetScreen = true;
            this.addToHistory(`${prev} ${this.operation} ${current}`, computation);
            this.updateDisplay();
            return;
        }
        
        // Scientific mode calculation (expression evaluation)
        if (this.mode === 'scientific') {
            try {
                let expression = this.currentOperand;
                
                // Replace function names with Math functions
                expression = expression.replace(/sin\(/g, 'Math.sin(');
                expression = expression.replace(/cos\(/g, 'Math.cos(');
                expression = expression.replace(/tan\(/g, 'Math.tan(');
                expression = expression.replace(/log\(/g, 'Math.log10(');
                expression = expression.replace(/ln\(/g, 'Math.log(');
                expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
                expression = expression.replace(/fact\(/g, 'this.factorial(');
                expression = expression.replace(/\^/g, '**');
                
                // Convert degrees to radians for trig functions
                expression = expression.replace(/Math\.sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
                expression = expression.replace(/Math\.cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
                expression = expression.replace(/Math\.tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
                
                // Evaluate the expression
                const result = eval(expression);
                
                if (isNaN(result) || !isFinite(result)) {
                    this.currentOperand = 'Error';
                } else {
                    this.currentOperand = result.toString();
                    this.addToHistory(expression, result);
                }
                
                this.operation = undefined;
                this.previousOperand = '';
                this.shouldResetScreen = true;
                this.updateDisplay();
            } catch (error) {
                this.currentOperand = 'Error';
                this.updateDisplay();
            }
        }
    }

    toggleHistory() {
        const isVisible = this.historyPanel.style.display !== 'none';
        this.historyPanel.style.display = isVisible ? 'none' : 'block';
    }

    async addToHistory(expression, result) {
        if (result === 'Error') return;
        
        try {
            await fetch(`${this.apiUrl}/history`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ expression, result })
            });
            
            // Reload history from backend
            const response = await fetch(`${this.apiUrl}/history`);
            this.history = await response.json();
            this.renderHistory();
        } catch (error) {
            console.error('Error adding to history:', error);
            // Fallback to local history
            this.history.unshift({ expression, result });
            if (this.history.length > 20) {
                this.history.pop();
            }
            this.renderHistory();
        }
    }

    async clearHistory() {
        try {
            await fetch(`${this.apiUrl}/history`, { method: 'DELETE' });
            this.history = [];
            this.renderHistory();
        } catch (error) {
            console.error('Error clearing history:', error);
            this.history = [];
            this.renderHistory();
        }
    }

    renderHistory() {
        this.historyList.innerHTML = '';
        
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<div class="history-empty">No history yet</div>';
            return;
        }
        
        this.history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="expression">${item.expression}</div>
                <div class="result">= ${item.result}</div>
            `;
            historyItem.addEventListener('click', () => {
                this.currentOperand = item.result.toString();
                this.shouldResetScreen = true;
                this.updateDisplay();
            });
            this.historyList.appendChild(historyItem);
        });
    }

    async memoryClear() {
        try {
            await fetch(`${this.apiUrl}/memory`, { method: 'DELETE' });
            this.memory = 0;
            this.updateMemoryIndicator();
        } catch (error) {
            console.error('Error clearing memory:', error);
            this.memory = 0;
            this.updateMemoryIndicator();
        }
    }

    async memoryRecall() {
        try {
            const response = await fetch(`${this.apiUrl}/memory`);
            const data = await response.json();
            this.memory = data.value || 0;
            this.currentOperand = this.memory.toString();
            this.shouldResetScreen = true;
            this.updateDisplay();
        } catch (error) {
            console.error('Error recalling memory:', error);
            this.currentOperand = this.memory.toString();
            this.shouldResetScreen = true;
            this.updateDisplay();
        }
    }

    async memoryPlus() {
        const currentValue = parseFloat(this.currentOperand);
        if (!isNaN(currentValue)) {
            try {
                const response = await fetch(`${this.apiUrl}/memory/add`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ value: currentValue })
                });
                const data = await response.json();
                this.memory = data.value;
                this.updateMemoryIndicator();
            } catch (error) {
                console.error('Error adding to memory:', error);
                this.memory += currentValue;
                this.updateMemoryIndicator();
            }
        }
    }

    async memoryMinus() {
        const currentValue = parseFloat(this.currentOperand);
        if (!isNaN(currentValue)) {
            try {
                const response = await fetch(`${this.apiUrl}/memory/subtract`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ value: currentValue })
                });
                const data = await response.json();
                this.memory = data.value;
                this.updateMemoryIndicator();
            } catch (error) {
                console.error('Error subtracting from memory:', error);
                this.memory -= currentValue;
                this.updateMemoryIndicator();
            }
        }
    }

    updateMemoryIndicator() {
        if (this.memory !== 0) {
            this.memoryIndicator.classList.add('active');
            this.memoryIndicator.textContent = `M: ${this.memory}`;
        } else {
            this.memoryIndicator.classList.remove('active');
            this.memoryIndicator.textContent = 'M';
        }
    }

    async loadFromBackend() {
        try {
            // Load memory
            const memoryResponse = await fetch(`${this.apiUrl}/memory`);
            const memoryData = await memoryResponse.json();
            this.memory = memoryData.value || 0;
            
            // Load history
            const historyResponse = await fetch(`${this.apiUrl}/history`);
            const historyData = await historyResponse.json();
            this.history = historyData || [];
            
            this.renderHistory();
        } catch (error) {
            console.error('Error loading from backend:', error);
            // Fallback to localStorage if backend is not available
            this.loadFromStorage();
        }
    }

    loadFromStorage() {
        try {
            const savedData = localStorage.getItem('calculatorData');
            if (savedData) {
                const data = JSON.parse(savedData);
                this.memory = data.memory || 0;
                this.history = data.history || [];
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
        }
    }

    saveToStorage() {
        try {
            const data = {
                memory: this.memory,
                history: this.history
            };
            localStorage.setItem('calculatorData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        if (this.mode === 'programmer') {
            this.base = 'dec';
            this.displayBase.textContent = 'DEC';
            document.querySelectorAll('.base-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.base === 'dec');
            });
            const programmerKeypad = document.querySelector('.programmer-mode');
            programmerKeypad.dataset.base = 'dec';
        }
        this.updateDisplay();
    }

    backspace() {
        if (this.shouldResetScreen) {
            this.clear();
            return;
        }
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '' || this.currentOperand === '-') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.displayCurrent.textContent = this.currentOperand;
        
        if (this.operation != null) {
            this.displayPrevious.textContent = `${this.previousOperand} ${this.operation}`;
        } else {
            this.displayPrevious.textContent = '';
        }
        
        // Show decimal equivalent in programmer mode
        if (this.mode === 'programmer') {
            const decimalValue = this.convertToDecimal(this.currentOperand, this.base);
            this.displayDecimal.textContent = `DEC: ${decimalValue}`;
        }
    }

    handleKeyboard(e) {
        if (e.key >= '0' && e.key <= '9') {
            this.appendNumber(e.key);
        } else if (e.key === '.') {
            this.appendDecimal();
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            this.chooseOperation(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            this.calculate();
        } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
            this.clear();
        } else if (e.key === 'Backspace') {
            this.backspace();
        } else if (e.shiftKey && e.key === 'M') {
            e.preventDefault();
            this.memoryClear();
        } else if (e.shiftKey && e.key === 'R') {
            e.preventDefault();
            this.memoryRecall();
        } else if (e.shiftKey && e.key === 'P') {
            e.preventDefault();
            this.memoryPlus();
        } else if (e.shiftKey && e.key === 'S') {
            e.preventDefault();
            this.memoryMinus();
        }
    }
}

// Initialize calculator
const calculator = new Calculator();
