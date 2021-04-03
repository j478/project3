let file = "";
let response = "";

document.querySelector('#add_file').addEventListener('change', () => {
	file = document.querySelector('#add_file').files[0];
	document.querySelector('#image').src = URL.createObjectURL(file);
});

document.querySelector('#submit').addEventListener('click', () => {
	let form_data = new FormData();
	form_data.append("file", file);

	let xttp = new XMLHttpRequest();
	xttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          response = this.response;
          console.log(response);
        }
      };
	xttp.open("POST", "/process");
	console.log("LOL IM RUNNING");
	xttp.send(form_data);
});
