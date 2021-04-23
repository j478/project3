let file = "";
let loading = document.getElementById('progress');
let text_box = document.getElementById('text');
loading.style.display = 'none';

document.querySelector('#add_file').addEventListener('change', () => {
	file = document.querySelector('#add_file').files[0];
	document.querySelector('#image').src = URL.createObjectURL(file);
	document.getElementById('file-name').innerText = file.name;
});

document.querySelector('#submit').addEventListener('click', () => {
    text_box.style.display = 'none';
    loading.style.display = 'block';

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
    text_box.innerText = text;
    text_box.style.display = 'block';
    loading.style.display = 'none';
}
function translate(){
	let language = document.getElementbyId(language);
	let text=text_box.value;
	settings.data.target=language.value;
	settings.data.q=text;
}
