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

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
    
    // Computing the monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x - 1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Please review your numbers and try again')
    }

    const results = document.getElementById('results');
    results.addEventListener('click', clearResults);

    e.preventDefault();
}

function clearResults(e){
    console.log('click heard')
}





function showError(error){

    // createElement() to create as a reponse to an invalid entry
    const errDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errDiv.appendChild(document.createTextNode(error)) 

    // Insert error above heading
    card.insertBefore(errDiv, heading);

    // CLEAR ERROR setTimout() to remove the header after a certain number of seconds to inprove user experience.
    setTimeout(clearError, 3000);

}

function clearError(){
    document.querySelector('.alert').remove();
}