const wrapper = document.querySelector('.wrapper'),
      inputPart = wrapper.querySelector('.input-part'),
      infoTxt = inputPart.querySelector('.info-txt'),
      inputField = inputPart.querySelector('input'),
      locationBtn = inputPart.querySelector('button'),
      wImage = document.querySelector(".weather-part img"),
      arrowBack = document.querySelector("header i")

      let api;

      inputField.addEventListener("keyup", e => {
        if(e.key == "Enter"  && inputField.value != ""){
            requestApi(inputField.value)
        }
      })

      locationBtn.addEventListener("click",  () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(onSuccess,onError)
        }else{
            console.log("Tarayıcınız geolocation'ı desteklemiyor...")
        }
      })

      function onSuccess(position){
        const {latitude, longitude} = position.coords;
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4a9f7a83ca065db55ac2640b7b81a04f`;
        fetchData()
      }

      function onError(error){
        infoTxt.innerText = error.messege
        infoTxt.classList.add("error")
      }

      function requestApi(city){
         api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4a9f7a83ca065db55ac2640b7b81a04f`;
         fetchData();
      }

      function fetchData(){
        infoTxt.innerText = "Sonuçlar getiriliyor..."
        infoTxt.classList.add("pending")
        fetch(api).then(response => response.json()).then(result => weatherDetails(result))
      }

      function weatherDetails(info){
        if(info.cod == "404"){
            infoTxt.classList.replace("pending", "error")
            infoTxt.innerText = `${inputField.value} şehri bulunamadı...`
        }else{
            const city = info.name
            const country = info.sys.country
            const {description, id} = info.weather[0]
            const {feels_like, humidity, temp} = info.main


            if(id==800){
                wImage.src = "img/clear.svg"
            }else if(id => 200 && id <= 232){
                wImage.src = "img/storm.svg"
            }else if(id => 600 && id <= 622){
                wImage.src = "img/snow.svg"
            }else if(id => 701 && id <= 781){
                wImage.src = "img/haze.svg"
            }else if(id => 801 && id <= 804){
                wImage.src = "img/cloud.svg"
            }else if(id => 300 && id <= 321 || (id => 500 && id <= 531)){
                wImage.src = "img/rain.svg"
            }

            wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
            wrapper.querySelector(".weather").innerText = description
            wrapper.querySelector(".location").innerText = `${city}, ${country}`
            wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
            wrapper.querySelector(".humidity span").innerText = `${humidity}%`
       
    
            infoTxt.classList.remove("pending", "error")
            wrapper.classList.add("active")
        }
        
    }

    arrowBack.addEventListener("click", () => {
        wrapper.classList.remove("active")
    })
