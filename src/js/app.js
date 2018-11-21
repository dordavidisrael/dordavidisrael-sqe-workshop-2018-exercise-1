import $ from 'jquery';
import {parseCode,bigfunc} from './code-analyzer';




$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        let x = document.getElementById('t').rows[1].cells;
        x[1].innerHTML=bigfunc(parsedCode);
    });
});
