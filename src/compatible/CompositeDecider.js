import CompareDecider from "./CompareDecider.js"
import CrossLayerRecursionDecider from "./CrossLayerRecursionDecider.js"
import LastAddItemDecider from "./LastAddItemDecider.js"
import RecursionDecider from "./RecursionDecider.js"
import SingleSubSeqRecursionDecider from "./SingleSubSeqRecursionDecider.js"

export default class CompositeDecider {
    static M = 5;

    static compareL(subSeqs) {
        if (subSeqs == null || subSeqs.length <= 1) {
            return 1;
        }

        const compatibleRuleIndex = new Array(subSeqs.length);
        compatibleRuleIndex[0] = CompositeDecider.M - 1;
        for (let i = 1; i < subSeqs.length - 1; i++) {
            const compareL = CompositeDecider.compareLForSubLength(subSeqs, compatibleRuleIndex, i + 1);
            if (compareL <= 0) {
                throw new Error("兼容链校验异常");
            }
        }
        return CompositeDecider.compareLForSubLength(subSeqs, compatibleRuleIndex, subSeqs.length);
    }

    static compareLForSubLength(subSeqs, compatibleRuleIndex, length) {
        if (subSeqs == null || subSeqs.length === 0) {
            return 0;
        }
        if (subSeqs.length === 1) {
            return 1;
        }
        if (length === 1) {
            return 1;
        }
        const newSubSeqs = subSeqs.slice(0, length);

        L1: for (let i = 1; i < CompositeDecider.M; i++) {
            const lastTwo = [newSubSeqs[newSubSeqs.length - 2], newSubSeqs[newSubSeqs.length - 1]];
            if (CompositeDecider.compareLN(lastTwo, i) > 0) {
                for (let k = i + 1; k < CompositeDecider.M; k++) {
                    if (CompositeDecider.compareLN(newSubSeqs, k) > 0) {
                        continue L1;
                    }
                }
                if (i === 1) {
                    compatibleRuleIndex[length - 1] = 1;
                    return 1;
                }
                const compatibleChain_i = CompositeDecider.getCompatibleChain(newSubSeqs, compatibleRuleIndex, i);
                if (CompositeDecider.compareLN(compatibleChain_i, i) > 0) {
                    compatibleRuleIndex[length - 1] = i;
                    return 1;
                }
            }
        }
        const seqsForeq = [subSeqs[length - 2], subSeqs[length - 1]];
        for (let i = 1; i < CompositeDecider.M; i++) {
            if (CompositeDecider.compareLN(seqsForeq, i) === 0) {
                compatibleRuleIndex[length - 1] = -1;
                return 0;
            }
        }
        compatibleRuleIndex[length - 1] = -1;
        return -1;
    }

    static getCompatibleChain(subSeqs, compatibleRuleIndex, ruleIndex) {
        const list = [];
        if (subSeqs == null || subSeqs.length === 0) {
            return list;
        }
        list.push(subSeqs[0]);
        if (subSeqs.length === 1) {
            return list;
        }
        for (let i = 1; i < subSeqs.length - 1; i++) {
            if (compatibleRuleIndex[i] > ruleIndex) {
                list.length = 0;
            } else if (compatibleRuleIndex[i] === ruleIndex) {
                if (list.length === 0 && i > 0) {
                    list.push(subSeqs[i - 1]);
                }
                list.push(subSeqs[i]);
            }
        }
        list.push(subSeqs[subSeqs.length - 1]);
        return list;
    }

    static compareLN(subSeqs, n) {
        switch (n) {
            case 1:
                return CrossLayerRecursionDecider.compareL(subSeqs);
            case 2:
                return RecursionDecider.compareL(subSeqs);
            case 3:
                return LastAddItemDecider.compareL(subSeqs);
            case 4:
                return CompareDecider.compareL(subSeqs);
            default:
                return CompareDecider.compareL(subSeqs);
        }
    }
}

