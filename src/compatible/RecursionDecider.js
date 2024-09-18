import FSeq from "../FSeq.js"
import CompositeDecider from "./CompositeDecider.js"

export default class RecursionDecider {

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
        
        const keyItems = this.getKeyItems(subSeqs);

        const seqList = [];
        const seqListEq = [];
        const secondeSeqList = [];
        for (let i = 0; i < keyItems.length - 1; i++) {
            seqList.push(keyItems[i][0]);
            const compareL = CompositeDecider.compareL(seqList);
            if (compareL > 0) {
                seqListEq.length = 0;
                secondeSeqList.length = 0;
                continue;
            } else {
                seqList.pop();
                if (seqListEq.length === 0 && compareL === 0) {
                    seqListEq.push(keyItems[i][0]);
                    secondeSeqList.push(keyItems[i - 1][1]);
                    secondeSeqList.push(keyItems[i][1]);
                    if (CompositeDecider.compareL(secondeSeqList) > 0) {
                        continue;
                    }
                }
                seqListEq.push(keyItems[i][0]);
                if (seqListEq.length > 0 && CompositeDecider.compareL(seqListEq) === 0) {
                    secondeSeqList.push(keyItems[i][1]);
                    if (CompositeDecider.compareL(secondeSeqList) > 0) {
                        continue;
                    }
                }
                throw new Error("兼容链异常");
            }
        }
        seqList.push(keyItems[keyItems.length - 1][0]);
        const compareL = CompositeDecider.compareL(seqList);
        if (compareL > 0) {
            return 1;
        } else {
            if (seqListEq.length === 0 && compareL === 0) {
                secondeSeqList.push(keyItems[keyItems.length - 2][1]);
                secondeSeqList.push(keyItems[keyItems.length - 1][1]);
                return CompositeDecider.compareL(secondeSeqList);
            }
            if (seqListEq.length > 0) {
                const seqListEqPair = [seqListEq[seqListEq.length - 1], keyItems[keyItems.length - 1][0]];
                secondeSeqList.push(keyItems[keyItems.length - 1][1]);
                if (seqListEq.length > 0 && CompositeDecider.compareL(seqListEqPair) === 0) {
                    return CompositeDecider.compareL(secondeSeqList);
                }
            }
        }
        return -1;
    }

    static getKeyItem(seq) {
        const addCores = this.getlastAddItem(seq);
        const superFakeCore = this.getSuperFakeCore(addCores);
        const subSeqs = FSeq.getSubSeq(superFakeCore);
        const result = [[], []];
        if (CompositeDecider.compareL(subSeqs) > 0) {
            result[0] = subSeqs[subSeqs.length - 1];
        } else {
            result[0] = subSeqs[subSeqs.length - 2];
            result[1] = subSeqs[subSeqs.length - 1];
        }
        return result;
    }

    static getKeyItems(seq) {
        const result = new Array(seq.length);
        for (let i = 0; i < seq.length; i++) {
            result[i] = this.getKeyItem(seq[i]);
        }
        return result;
    }

    static getSuperFakeCore(seq) {
        if (FSeq.isOne(seq)) {
            return seq;
        }
        const subSeqs = FSeq.getSubSeq(seq);
        const a = subSeqs[subSeqs.length - 1];
        const b = subSeqs.length > 1 ? subSeqs[subSeqs.length - 2] : null;
        const pre_b = this.getPreLevel(b);
        if (CompositeDecider.compareL(subSeqs) <= 0 && CompositeDecider.compareL(this.toArray(FSeq.getSupSeq0(pre_b), a)) <= 0) {
            return this.getSuperFakeCore(a);
        } else {
            return seq;
        }
    }

    static toArray(...seqs) {
        return seqs;
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
            return this.getlastAddItem(a);
        }
    }

    static getPreLevel(seq) {
        if (FSeq.isEmpty(seq)) {
            return seq;
        }
        const fseq2Items = FSeq.fseq2Items(seq);
        if (fseq2Items.length > 1) {
            const lastItem = fseq2Items[fseq2Items.length - 1];
            const lastItem_2 = fseq2Items[fseq2Items.length - 2];
            if (FSeq.compare(lastItem, lastItem_2) === 0) {
                return FSeq.minus(seq, lastItem);
            }
        }
        const lastItem = fseq2Items[fseq2Items.length - 1];
        const subSeqs = FSeq.getSubSeq(lastItem);
        const a = subSeqs[subSeqs.length - 1];
        if (!FSeq.isLimit(a)) {
            const new_a = FSeq.expand(a);
            if (!FSeq.isLimit(new_a)) {
                return FSeq.getSupSeq1(subSeqs, subSeqs.length - 1, new_a);
            }
        }
        return seq;
    }
}

