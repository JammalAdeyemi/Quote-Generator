const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote'); 
const loader = document.getElementById('loader');

// Show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide Loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
// Quote from API
async function getQuote(){
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try { //bcos of async function, d const is not going to set until response finish fetching. The data will not be set until it finish returning the response function in json format

        //If Author is blank, add 'Unknown'
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //Checking if Author field is blank and replace it with 'Unknown
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        //Reduce font size for long quotes
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText
        //stop loader,show quote
        complete();
    }catch(error){
        getQuote();
    }
}
//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote()
