let file = "";

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
          console.log(this.response);
          parseResponseJson(JSON.parse(this.response));
        }
      };
	xttp.open("POST", "/process");
	xttp.send(form_data);
});

function parseResponseJson(data) {
    if(data['error_msg'] === '') {
        updateText(data['img_text'])
    } else {
        updateText('Error: ' + data['error_msg']);
    }
}

function updateText(text) {
    let text_box = document.getElementById('text');
    text_box.innerText = text;
}
