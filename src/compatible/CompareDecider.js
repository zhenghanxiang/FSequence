import FSeq from "../FSeq.js"

export default class CompareDecider {

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
        return FSeq.compare(seq1, seq2);
    }

}

