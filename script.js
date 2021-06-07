let weather = {
    apiKey: "95f27eb8c8304adbcd97903cd9596551",
    lon: 0,
    lat: 0,
    fetchWeather: function (city) {


        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => {
                this.displayWeather(data);
                this.lat = data.coord.lat;
                this.lon = data.coord.lon;
                this.fetchForecast();
            });
    },
    displayWeather: function (data) {
        const {
            name
        } = data;
        const {
            icon,
            description
        } = data.weather[0];
        const {
            temp,
            humidity
        } = data.main;
        const {
            speed
        } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        console.log(icon);

        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";






    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);

    },

    displayForecast: function (dailyForecast) {
        var table = document.getElementById("myClass");

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(0);
        var row1 = table.insertRow(1);
        row1.style.fontSize = "16px";
        var row2 = table.insertRow(2);
        row2.style.fontSize = "16px";
        var row3 = table.insertRow(3);
        row3.style.fontSize = "15px";
        var row4 = table.insertRow(4);

        var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let dt = new Date();
        let i = dt.getDay();
        for (let item of dailyForecast) {

            // console.log(item.weather[0]);

            row.innerHTML = row.innerHTML + `<td>${day[i++%7]}</td>`;
            row1.innerHTML = row1.innerHTML + `<td>Min ${item.temp.min} °C</td>`;
            row2.innerHTML = row2.innerHTML + `<td>Max ${item.temp.max} °C</td>`;
            row3.innerHTML = row3.innerHTML + `<td>Humidity ${item.humidity}%</td>`;
            row4.innerHTML = row4.innerHTML + `<td><img src=
            "https://openweathermap.org/img/wn/${item.weather[0].icon}.png"></td>`;
        }


    },
    fetchForecast: async function () {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=hourly&units=metric&appid=${this.apiKey}`);
        let data = await response.json();
        this.displayForecast(data.daily);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    var Table = document.getElementById("myClass");
    Table.innerHTML = "";
    weather.search();
    // weather
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            var Table = document.getElementById("myClass");
            Table.innerHTML = "";
            weather.search();
        }
    });

weather.fetchWeather("kolkata");
// //http://api.openweathermap.org/data/2.5/weather?q={Delhi}&appid={95f27eb8c8304adbcd97903cd9596551}
// https: //api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly&appid=95f27eb8c8304adbcd97903cd9596551