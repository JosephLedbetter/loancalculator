// const loanAmount = document.querySelector('#amount');
/

// loadEventListener();

// function loadEventListener(){
   
// }

// LISTEN FOR SUBMISSION
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// CALCULATE RESULTS FUNCTION
function  calculateResults(e){
console.log('calculating')
// UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    e.preventDefault();
}