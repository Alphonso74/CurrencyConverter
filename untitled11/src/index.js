import React, {useState} from 'react'; //useState is a hook
import ReactDOM from 'react-dom';
import './styles.css';
import axios from 'axios';

function App() {

    //const [rates,setRates] = useState(null); //rates is a state variable, setRates used to update rates with returned data
    const apiURL = 'https://api.exchangeratesapi.io/latest';


    //axios approach to fetch data using setRates method and assign it to rates
    // const fetchData = async () => {
    //
    //
    //     const response = await axios.get(apiURL);
    //     const answer =  document.getElementById("output");
    //
    //
    //     const currency1 = document.getElementById("currencysoptions").value;
    //     const currency2 = document.getElementById("currencysoptions2").value;
    //     const currencyvalue = document.getElementById("conversionvalue").value;
    //
    //
    //     setRates(response.data);
    //
    //
    //     const ratedata = rates.base;
    //     const form = document.getElementById("mainform");
    //
    //     form.addEventListener("submit",function (e) {
    //         answer.innerText = {ratedata};
    //         e.preventDefault();
    //     });
    // };


    //fetch approach to outputting data from api
    async function fetchRates() { //await keyword permitted in async functions

        const answer = document.getElementById("output");
        const currency1 = document.getElementById("currencysoptions").value;
        const currency2 = document.getElementById("currencysoptions2").value;
        const currencyvalue = document.getElementById("conversionvalue").value;
        const form = document.getElementById("mainform");

        ////////***********************

        // try {
        //     let res = await fetch(apiURL);
        //     return await res.json();
        // } catch (error) {
        //
        //     console.log(error, "jhhihihhhi");
        //
        // }

        ////////***********************

        //Prevent incomplete form submission
        if (currency1 === "Select Currency" || currency2 === "Select Currency" || currencyvalue === "") {

            form.addEventListener("submit", function (e) {
                alert("Please fully complete form to submit");
                form.reload();
                e.preventDefault();
            });

        } else {

            //Convert back to EUR by currencyvalue/currency1Rate
            if (currency2 === "EUR") {

                //console.log("Test3");

                if (currency1 === 'HKD') {

                    fetch(apiURL)
                        .then(resp => resp.text())
                        .then(data => {


                            console.log(data.toString());
                            const dt = data;
                            const substring = dt.substring(29, 35);
                            // const substring = "6";
                            console.log(substring);
                            const numberVersion = parseFloat(substring);
                            console.log(parseFloat((currencyvalue / numberVersion).toString()));
                            const final = parseFloat((currencyvalue / numberVersion).toString());

                            // console.log(numberVersion + 1);
                            answer.innerText = "Answer: " + final.toString();

                            //setRates(data);
                            //console.log(data.toString());

                        });

                }
            }


            //If currency1 is EUR convert it straight to currency2
            // currencyvalue * currency2Rate

           else if(currency1 === 'EUR') {

                if(currency2 === 'HKD') {

                    fetch(apiURL)
                        .then(resp => resp.text())
                        .then(data => {


                            console.log(data.toString());
                            const dt = data;
                            const substring = dt.substring(29, 35);
                            // const substring = "6";
                            console.log(substring);
                            const numberVersion = parseFloat(substring);
                            console.log(parseFloat((currencyvalue * numberVersion).toString()));
                            const final = parseFloat((currencyvalue * numberVersion).toString());

                            // console.log(numberVersion + 1);
                            answer.innerText = "Answer: " + final.toString();

                            //setRates(data);
                            //console.log(data.toString());

                        });
                }

            }

            //Take value of currency1 if its not EUR, convert to EUR then covert to currency2
            // currencyvalue/currency1Rate then convertedValue * currency2Rate
            else {

                if((currency1 === 'HKD' && currency2 === 'CAD')){


                    fetch(apiURL)
                        .then(resp => resp.text())
                        .then(data => {


                            console.log(data.toString());
                            const dt = data;
                            const substringHKD = dt.substring(29, 35);
                            const substringCAD = dt.substring(16,22);
                            // console.log(substringHKD + " HKD");
                            // console.log(substringCAD + " CAD");
                            const numberVersionHKD = parseFloat(substringHKD);
                            const numberVersionCAD = parseFloat(substringCAD);

                            // const numberVersion = parseInt(substring, 10);

                            // console.log(parseFloat((currencyvalue * numberVersion).toString()));
                            const final = parseFloat((currencyvalue / numberVersionHKD).toString());
                            const final2 = parseFloat((final * numberVersionCAD).toString());


                            answer.innerText = "Answer: " + final2.toString();



                        });


                }
                else if((currency1 === 'CAD' && currency2 === 'HKD')){

                    fetch(apiURL)
                        .then(resp => resp.text())
                        .then(data => {


                            console.log(data.toString());
                            const dt = data;
                            const substringHKD = dt.substring(29, 35);
                            const substringCAD = dt.substring(16,22);
                            // console.log(substringHKD + " HKD");
                            // console.log(substringCAD + " CAD");
                            const numberVersionHKD = parseFloat(substringHKD);
                            const numberVersionCAD = parseFloat(substringCAD);

                            // const numberVersion = parseInt(substring, 10);

                            // console.log(parseFloat((currencyvalue * numberVersion).toString()));
                            const final = parseFloat((currencyvalue / numberVersionCAD).toString());
                            const final2 = parseFloat((final * numberVersionHKD).toString());


                            answer.innerText = "Answer: " + final2.toString();



                        });

                }

            }

            // console.log(currency1);
            // console.log(currency2);
            // console.log(currencyvalue);




            form.addEventListener("submit", function (e) {
                e.preventDefault();
            });


        }
    }

    //Calls async fetchRates gets json and outputs rates to answer textview
    // async function renderRates() {
    //     let rates = await fetchRates();
    //
    //     const answer = document.getElementById("output");
    //
    //     let html = '';
    //     rates.map(rate => {
    //         let htmlSegment = rate.rates;
    //
    //
    //         html += htmlSegment;
    //     });
    //
    //     // let container = document.querySelector('.container');
    //     // container.innerHTML = html;
    //     const form = document.getElementById("mainform");
    //
    //     form.addEventListener("submit", function (e) {
    //         answer.innerText = html;
    //         e.preventDefault();
    //     });
    // }



    return (
        <div className="App">

            <h1>Alphonso's Currency Converter</h1>

            <div>
                <form id="mainform">
                    <p>Enter Currency Data</p>
                    <body>
                    <select id="currencysoptions">
                        <option>Select Currency</option>
                        <option>EUR</option>
                        <option>CAD</option>
                        <option>HKD</option>
                        <option>ISK</option>
                        <option>PHP</option>
                        <option>DKK</option>
                        <option>HUF</option>
                        <option>CZK</option>
                        <option>AUD</option>
                        <option>RON</option>
                        <option>SEK</option>
                        <option>IDR</option>
                        <option>BRL</option>
                        <option>RUB</option>
                        <option>HRK</option>
                        <option>JPY</option>
                        <option>THB</option>
                        <option>CHF</option>
                        <option>SGD</option>
                        <option>PLN</option>
                        <option>BGN</option>
                        <option>TRY</option>
                        <option>CNY</option>
                        <option>NOK</option>
                        <option>NZD</option>
                        <option>ZAR</option>
                        <option>USD</option>
                        <option>MXN</option>
                        <option>ILS</option>
                        <option>GBP</option>
                        <option>KRW</option>
                        <option>MYR</option>
                    </select>
                    <input type="number" id="conversionvalue" className="conversionvalue" placeholder="Amount"/>
                    </body>

                    <body>

                    <p>Select Currency To Convert To</p>

                    <select id="currencysoptions2">
                        <option>Select Currency</option>
                        <option>EUR</option>
                        <option>CAD</option>
                        <option>HKD</option>
                        <option>ISK</option>
                        <option>PHP</option>
                        <option>DKK</option>
                        <option>HUF</option>
                        <option>CZK</option>
                        <option>AUD</option>
                        <option>RON</option>
                        <option>SEK</option>
                        <option>IDR</option>
                        <option>BRL</option>
                        <option>RUB</option>
                        <option>HRK</option>
                        <option>JPY</option>
                        <option>THB</option>
                        <option>CHF</option>
                        <option>SGD</option>
                        <option>PLN</option>
                        <option>BGN</option>
                        <option>TRY</option>
                        <option>CNY</option>
                        <option>NOK</option>
                        <option>NZD</option>
                        <option>ZAR</option>
                        <option>USD</option>
                        <option>MXN</option>
                        <option>ILS</option>
                        <option>GBP</option>
                        <option>KRW</option>
                        <option>MYR</option>
                    </select>
                    </body>

                <button className="fetch-button" onClick={fetchRates}>CONVERT!</button>
                <br />
                </form>
            </div>

            {/* Display data from API */}

            <div className="answerOutput">

                <h1 id="output"></h1>


            </div>

        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
