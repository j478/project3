// settings is the object that contains all of the 'settings' for the translate API. It is passed into the ajax request(jquery).
// request is a function that sends the ajax request as well as a callback that prints the object to the console.
// according to the translate api webpage, we have 500 translations per month, however I have seen many different numbers so far,
// so test this function sparingly

let settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
  "method": "POST",
  "headers": {
    "x-rapidapi-host": "google-translate1.p.rapidapi.com",
    "x-rapidapi-key": "1c3ebbef39msh27276bee1b01d59p157aaajsn3fb54cc9e59e",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "source": "",
    "q": "Hello, World!",
    "target": "es"
  }

}

let request = () => {
	$.ajax(settings).done((response) => {
		console.log(response);
		text_box.innerText = response.data.translations[0].translatedText;
	});
	
}