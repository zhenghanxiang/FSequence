import FSeq from "./FSeq.js"
import FSeqConverter from "./FSeqConverter.js"
import FakeTest from "./FakeTest.js"
import FFFZ2FSeqTest from "./FFFZ2FSeqTest.js"


var express = "ψZ[ω^ω](ω^ω+ω)";
var error = FSeqConverter.validateFFFZ(express);
console.log(error);
var seq = FSeqConverter.fffz2FSeq(express);
var expand =  FSeq.expand(seq);
var expandFFFZ =  FSeqConverter.fSeq2FFFZ(expand,0);

console.log(express);
console.log(seq);
console.log(expand);
console.log(expandFFFZ);


FFFZ2FSeqTest.test();

FakeTest.test0();