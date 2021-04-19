let settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
  "method": "POST",
  "headers": {
    "x-rapidapi-host": "google-translate1.p.rapidapi.com",
    "x-rapidapi-key": "26f0b80993msh6d0b26a82ebdee9p170cf9jsn8cb726e71210",
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "source": "en",
    "q": "Contact Form | Name | Contact Number | Email",
    "target": ""
  }

}

let request = () => {
	$.ajax(settings).done((response) => {
		console.log(response);
	});
}