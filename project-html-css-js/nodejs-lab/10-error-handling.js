try {
  JSON.parse('{invalid json}');
} catch (error) {
  console.error('Handled error:', error.message);
}
function divide(first, second) { if (second === 0) throw new Error('Cannot divide by zero'); return first / second; }
try { console.log(divide(10, 2)); } catch (error) { console.error(error.message); }