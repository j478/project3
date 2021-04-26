let testFuncs = [testAddFile, testSubmitNoFile, testSubmitFile,
    testSubmitBadFile, testTranslate];

/**
 * Main test function. Runs all tests. Requires 'preserve log'
 * in console settings to view results.
 */
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
    }
}

/**
 * Test adding a given image.
 */
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

/**
 * Test submitting with no file attached to the request.
 */
function testSubmitNoFile() {
    file = null;
    onSubmit();
}

/**
 * Test submitting with an example file attached.
 */
function testSubmitFile() {
    testAddFile();
    onSubmit();
}

/**
 * Test submitting with a non-allowed filetype attached.
 */
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

function testTranslate() {
    testAddFile();
    testSubmitFile();
    translate();
}
