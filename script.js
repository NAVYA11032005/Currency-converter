
        // List of countries/currencies
        let countries = [
            'USD', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS',
            'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD',
            'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP',
            'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP',
            'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD',
            'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP',
            'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD',
            'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP',
            'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY',
            'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD',
            'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD','MAD', 
            'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 
            'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 
            'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 
            'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 
            'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 
            'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB',
            'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 
            'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 
            'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 
            'ZMW', 'ZWL'
        ];

        // Populate dropdowns with currency options
        countries.forEach(function(v){
            document.getElementById('country').innerHTML += '<option value="'+v+'">'+v+'</option>';
            document.getElementById('country1').innerHTML += '<option value="'+v+'">'+v+'</option>';
        });

        // Set default values
        document.getElementById('country').value = 'USD';
        document.getElementById('country1').value = 'EUR';

        // Conversion function
        function convert(v) {
            let from = document.getElementById('country').value;
            let to = document.getElementById('country1').value;
            let amount = parseFloat(v) || 0;

            // Show loading indicator
            document.getElementById('loading').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';

            fetch("https://open.er-api.com/v6/latest/" + from)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                // Hide loading indicator
                document.getElementById('loading').style.display = 'none';
                
                let rates = data.rates;
                if (rates && rates[to]) {
                    let convertedAmount = (amount * rates[to]).toFixed(2);
                    document.getElementById('result').textContent = convertedAmount;
                    
                    // Update conversion rate display
                    document.getElementById('conversionRate').textContent = 
                        `1 ${from} = ${rates[to].toFixed(4)} ${to}`;
                } else {
                    document.getElementById('errorMessage').textContent = 
                        'Error: Could not find exchange rate for selected currencies';
                    document.getElementById('errorMessage').style.display = 'block';
                }
            })
            .catch(function(error) {
                // Hide loading indicator and show error
                document.getElementById('loading').style.display = 'none';
                document.getElementById('errorMessage').textContent = 
                    'Error fetching exchange rates. Please try again.';
                document.getElementById('errorMessage').style.display = 'block';
                console.error('Error:', error);
            });
        }

        // Swap currencies function
        function swapCurrencies() {
            let fromSelect = document.getElementById('country');
            let toSelect = document.getElementById('country1');
            
            let temp = fromSelect.value;
            fromSelect.value = toSelect.value;
            toSelect.value = temp;
            
            // Trigger conversion with current amount
            convert(document.getElementById('amount').value);
        }

        // Initialize the converter
        document.addEventListener('DOMContentLoaded', function() {
            convert(1); // Convert 1 unit by default to show the rate
        });
  