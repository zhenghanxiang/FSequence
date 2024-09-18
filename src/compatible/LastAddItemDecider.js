import FSeq from "../FSeq.js"

export default class LastAddItemDecider {

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
        return FSeq.compare(LastAddItemDecider.getlastAddItem(seq1), LastAddItemDecider.getlastAddItem(seq2));
    }

    static getlastAddItem(seq) {
        if (FSeq.isOne(seq)) {
            return seq;
        }
        const subSeqs = FSeq.getSubSeq(seq);
        const a = subSeqs[subSeqs.length - 1];
        const b = subSeqs.length > 1 ? subSeqs[subSeqs.length - 2] : null;
        if (FSeq.isLimit(b)) {
            return seq;
        } else {
            return LastAddItemDecider.getlastAddItem(a);
        }
    }
}

