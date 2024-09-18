import FSeq from "../FSeq.js"
import CompositeDecider from "./CompositeDecider.js"


export default class SingleSubSeqRecursionDecider {
    
    static compareL(subSeqs) {
        if (subSeqs == null || subSeqs.length === 0) {
            return 1;
        }
        const seq1 = subSeqs.length > 1 ? subSeqs[subSeqs.length - 2] : null;
        const seq2 = subSeqs[subSeqs.length - 1];
        
        if (FSeq.isEmpty(seq1) || FSeq.isEmpty(seq2)) {
            return !FSeq.isEmpty(seq1) ? -1 : !FSeq.isEmpty(seq2) ? 1 : 0;
        }
        
        if (!FSeq.isLimit(seq1) && !FSeq.isLimit(seq2)) {
            return 0;
        }
        if (!FSeq.isLimit(seq1) && FSeq.isLimit(seq2)) {
            return -1;
        }
        if (FSeq.isLimit(seq1) && !FSeq.isLimit(seq2)) {
            return 1;
        }
        
        return CompositeDecider.compareL(this.getRealCores(subSeqs));
    }
    
    static getRealCores(seq) {
        const result = new Array(seq.length);
        for (let i = 0; i < seq.length; i++) {
            result[i] = this.getRealCore(seq[i]);
        }
        return result;
    }
    
    static getRealCore(seq) {
        if (FSeq.isOne(seq)) {
            return seq;
        }
        const subSeqs = FSeq.getSubSeq(seq);
        const a = subSeqs[subSeqs.length - 1];
        if (subSeqs.length === 1) {
            return a;
        } else {
            return this.getRealCore(a);
        }
    }
}

