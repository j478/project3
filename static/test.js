let testFuncs = [testAddFile, testSubmitNoFile, testSubmitFile, testSubmitBadFile];

function test() {
    console.log('TEST SUITE');
    for(let i=0; i < testFuncs.length; i++) {
        let test = testFuncs[i];
        try {
            test();
            console.log('(' + i + ')' + test.name + ': PASS')
        } catch(e) {
            console.log('(' + i + ')' + test.name + ': FAIL');
            console.log(e);
        }
        location.reload();
    }
}

function testAddFile() {
    let f_req = new XMLHttpRequest();
    f_req.responseType = 'arraybuffer';

	f_req.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            file = new File([this.response], 'test.jpg');
            updatePic(file);
        }
      };
	f_req.open("GET", "/static/img/test/sample.jpg");
	f_req.send();
}

function testSubmitNoFile() {
    file = null;
    onSubmit();
}

function testSubmitFile() {
    testAddFile();
    onSubmit();
}

function testSubmitBadFile() {
    let f_req = new XMLHttpRequest();
    f_req.responseType = 'arraybuffer';

	f_req.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            file = new File([this.response], 'btest.txt');
            onSubmit();
        }
      };
	f_req.open("GET", "/static/img/test/bad.txt");
	f_req.send();
}
