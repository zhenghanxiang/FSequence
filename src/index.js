//import "@babel/polyfill";
import FSeq from "./FSeq.js"
import FSeqConverter from "./FSeqConverter.js"
import FakeTest from "./FakeTest.js"
import FFFZ2FSeqTest from "./FFFZ2FSeqTest.js"


function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
var inputPattern=/^1(,\d+)*$/g
var numberPattern=/^\d+$/g

 function expand0(){
    let input_fffz = document.getElementById("input_fffz").value;
    let input_seq = document.getElementById("input_fffz").value;
    let input_n = document.getElementById("input_n").value;

    numberPattern.lastIndex = 0;
    if (!numberPattern.test(input_n))  return;
    //let input_m = document.getElementById("input_m").value;
    FSeq.N = parseInt(input_n);
    //FSeq.M = parseInt(input_m);
    let seq = [];
    if(isEmpty(input_fffz)){
        inputPattern.lastIndex = 0;
        if (!inputPattern.test(input_seq))  {
            document.getElementById("output_fffz").value = `fseq Input validate fail !`;
            document.getElementById("output_seq").value = "";
            return;
        }
        const errors = FSeqConverter.validateSeq(input_seq);
        if(errors.length > 0){
            document.getElementById("output_fffz").value = errors.join("\n");
            document.getElementById("output_seq").value = "";
            return;
        }
        seq = input_seq;
        input_fffz = FSeqConverter.fSeq2FFFZ(seq,1);
    }else{
        const errors = FSeqConverter.validateFFFZ(input_fffz);
        if(errors.length > 0){
            document.getElementById("output_fffz").value = errors.join("\n");
            document.getElementById("output_seq").value = "";
            return;
        }
        seq = FSeqConverter.fffz2FSeq(input_fffz);
    }
    const errors = FSeqConverter.validateFake(seq);
    if(errors.length > 0){
        document.getElementById("output_fffz").value = errors.join("\n");
        document.getElementById("output_seq").value = "";
        return;
    }
    let expand =  FSeq.expand(seq);
    let expandFFFZ =  FSeqConverter.fSeq2FFFZ(expand,1);


    document.getElementById("input_fffz").value = input_fffz;
    document.getElementById("input_seq").value = FSeq.isEmpty(seq)?"":seq.join(",");
    document.getElementById("output_fffz").value = expandFFFZ;
    document.getElementById("output_seq").value = FSeq.isEmpty(expand)?"":expand.join(",");
}

document.getElementById("expand_button").onclick = expand0;

window.onload=function (){
    console.clear();
    console.log("index.js");
    FakeTest.test0();
    FFFZ2FSeqTest.test();
}

export default {FSeq,FSeqConverter,FakeTest}
export {FSeq,FSeqConverter,FakeTest}

