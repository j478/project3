let file = "";

document.querySelector('#add_file').addEventListener('change', () => {
	file = document.querySelector('#add_file').files[0];
	document.querySelector('#image').src = URL.createObjectURL(file);
});


document.querySelector('#submit').addEventListener('click', () => {
	let form_data = new FormData(file)
	/*
	$.ajax({
		type: "POST",
		url: "/process",
		data: form_data,
		cache: false,
	});
	*/
	
    let xttp=new XMLHttpRequest();
    xttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //this is where we pull the information out.
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send(form_data);
});
