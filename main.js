


const createMain = () => {

    const apiKey = '5DGJ35NYPY2XNBKJ7DC2PQKKL';

    const getWeather = async (city) => {
        let data_weather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`,{mode: 'cors'})
        let weather = await data_weather.json();

        
        return weather;


    }

    return {getWeather}
}


const createDisplay = () => {
    const app = createMain();

    const main = document.querySelector('.main');
    
    const weatherForm= document.createElement('div');
    weatherForm.classList+='weather-form';
    weatherForm.innerHTML=`
        <h2>Weather Search</h2>
        <form>
            <label>City</label>
            <input type='text' id='input-city'>
            <select id='input-mode' >
                <option value='1'> Farenheit</option>
                <option value='2'> Celcius</option>
            </select>
            <button type='submit'>Submit</button>
        </form>
    `;

    const weatherInfo = document.createElement('div');
    weatherInfo.classList+='weather-info';
    weatherInfo.innerHTML= `<h4>Here will be weather information</h4>`

    main.appendChild(weatherForm);  
    main.appendChild(weatherInfo);

    
    weatherForm.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const city = document.querySelector('#input-city').value;
        const mode = document.querySelector('#input-mode').value;

        const information = await app.getWeather(city)
        showInfo(information,mode);

    })

     function showInfo (information,mode) {

        let temp_mode= 0;
    
        if(mode==1) temp_mode=information.currentConditions.temp;
        else    temp_mode= (information.currentConditions.temp - 32 ) * 0.5556;

        weatherInfo.innerHTML=`
        <h2>${information.resolvedAddress}</h2>
        <h3>Information</h3>
        <div class = 'weather-info-content'>
            <p class='info'>Temperature: ${temp_mode.toFixed(2)}</p>
            <p class='info'>Humidity: % ${information.currentConditions.humidity}</p>
            <p class='info'>Description: ${information.description}</p>
        </div>
       `;
       weatherInfo.classList.add ('loaded');
    }

}


const App = createDisplay();
