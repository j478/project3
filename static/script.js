let file;
let loading = document.getElementById('progress');
let text_box = document.getElementById('text');
loading.style.display = 'none';
let formattedText = "";

/**
 * Listen for when a file is attached using the add file button.
 */
document.querySelector('#add_file').addEventListener('change', () => {
	file = document.querySelector('#add_file').files[0];
	updatePic(file);
});

/**
 * Update display picture.
 * @param f: File object.
 */
function updatePic(f) {
    document.querySelector('#image').src = URL.createObjectURL(f);
	document.getElementById('file-name').innerText = f.name;
}

document.querySelector('#submit').addEventListener('click', () => {
    onSubmit()

});
/**
 * Handles making request to server. On callback, calls parseResponseJson to update displayed text.
 */
function onSubmit() {
    text_box.style.display = 'none';
    loading.style.display = 'block';

	let form_data = new FormData();
	form_data.append("file", file);

	let xttp = new XMLHttpRequest();
	xttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          parseResponseJson(JSON.parse(this.response));
        }
      };
	xttp.open("POST", "/process");
	xttp.send(form_data);
}

/**
 * Parses data. If error present, display error message.
 * @param data: JSON.
 */
function parseResponseJson(data) {
    if(data['error_msg'] === '') {
        updateText(data['img_text'])
    } else {
        updateText('Error: ' + data['error_msg']);
    }
}

/**
 * Add text and remove loading.
 * @param text: String
 */
function updateText(text) {
    text_box.innerText = text;
    text_box.style.display = 'block';
    loading.style.display = 'none';
	//format(text);
}

/**
 * Listen for user click on translate button.
 */
document.querySelector('#translate').addEventListener('click', () => {
	let language = document.querySelector('#language');
	let text=text_box.innerText;
	settings.data.target=language.value;
	settings.data.q=text;
	request();
});

document.querySelector('#PDF').addEventListener('click', () => {
	let form_data = new FormData();
	form_data.append("text", text_box.innerText);
	
	let xttp = new XMLHttpRequest();
	xttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          console.log(this.response);
        }
      };
	xttp.open("POST", "/pdf");
	xttp.send(form_data);
	
});
