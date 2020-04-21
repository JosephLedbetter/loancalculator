// LISTEN FOR SUBMISSION
document.getElementById('loan-form').addEventListener('submit', function(e){

// // Hide Results
document.getElementById('results').style.display = 'none';

// // Show Loader 
document.querySelector('#loading').style.display = 'block';

setTimeout(calculateResults, 2000);

e.preventDefault();
});


// CALCULATE RESULTS FUNCTION
function  calculateResults(){
    console.log('Calculating...')
// UI Variables
    const item = document.getElementById('item')
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    const saveLoan = document.getElementById('save');
    const clearSaved = document.getElementById('clear-saved');

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
        
        // // Showing results after calculation
        document.getElementById('results').style.display = 'block';
        // // Hiding loader after calculation
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please review your numbers and try again')
    }

    const results = document.querySelector('#clear');
    results.addEventListener('click', clearResults);


    function clearResults(e){
        item.value = "";
        amount.value = "";
        interest.value = "";
        years.value = "";
        monthlyPayment.value = "";
        totalPayment.value = "";  
        totalInterest.value = "";    
}

saveLoan.addEventListener('click', saveCalculation);
clearSaved.addEventListener('click', deleteAllSaved);


}


function saveCalculation(){
    
        let loanList = JSON.parse(localStorage.getItem('allLoans')); 
        if (loanList == null) loanList = [];
        
        let newLoanItem= [
        'Purchase Item: ' + item.value, 
        'Loan Amount: ' + amount.value,
        'Interest Rate: ' + interest.value, 
        'Years to repay: ' + years.value, 
             ];
    console.log(newLoanItem);
        loanList.push(newLoanItem);

        localStorage.setItem('allLoans', JSON.stringify(loanList));
        
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
    setTimeout(clearError, 2000);

}

function clearError(){
    document.querySelector('.alert').remove();
    document.querySelector('#loading').style.display = 'none';
}


function deleteAllSaved(newLoan){
    localStorage.clear();
}

// localStorage.removeItem('loanList');
// localStorage.removeItem('allLoans')