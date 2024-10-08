import CompositeDecider from "./compatible/CompositeDecider.js"

export default class FSeq {
    
    static N = 3;
    static M = 5;

    static expand(seq) {
        if (this.isEmpty(seq)) {
            return seq;
        }
        if (this.isOne(seq)) {
            return [];
        }
        const subSeqs = this.getSubSeq(seq);
        const a = subSeqs[subSeqs.length - 1];
        const b = subSeqs.length > 1 ? subSeqs[subSeqs.length - 2] : null;

        // If a < b, expand to (a)
        if (!this.isEmpty(b) && this.compare(a, b) < 0) {
            return this.expand(this.getSupSeq0(a));
        }
        /*
         * If [#,b,a] is compatible, expand to [#,b,a]([#,b,a](...[#,b,a](a)...))
         * If [#,b,a] is not compatible
         *     If a == b, expand to[#](expand(a))
         *     If a != b, expand to [#,b](expand(a))
         */
        if (CompositeDecider.compareL(subSeqs) > 0) {
            let result = a;
            if(!this.isLimit(a)){
                result = this.expand(a);
            }
            for (let i = 0; i < this.N; i++) {
                result = this.getSupSeq1(subSeqs, subSeqs.length, result);
            }
            return result;
        } else {
            if (this.compare(a, b) === 0) {
                const c = subSeqs.length > 2 ? subSeqs[subSeqs.length-3] : null;
                const newA = this.add(c,this.expand(this.minus(a, c)));
                return this.getSupSeq1(subSeqs,subSeqs.length-2,newA);	
            }else{
                let newA;
                if(!this.isLimit(b)) {
                    const b_pre = this.expand(b);
                    newA = this.add(b_pre,this.expand(this.minus(a, b_pre)));
                }else {
                    newA = this.add(b,this.expand(this.minus(a, b)));
                }
                return this.getSupSeq1(subSeqs, subSeqs.length - 1, newA);
            }
        }
    }

    static compare(seq1, seq2) {
        if (this.isEmpty(seq1) || this.isEmpty(seq2)) {
            return !this.isEmpty(seq1) ? 1 : !this.isEmpty(seq2) ? -1 : 0;
        }

        const subSeqs1 = this.getSubSeq(seq1);
        const subSeqs2 = this.getSubSeq(seq2);

        for (let i = 0; i < Math.min(subSeqs1.length, subSeqs2.length); i++) {
            const compare = this.compare(subSeqs1[i], subSeqs2[i]);
            if (compare === 0) {
                continue;
            } else {
                return compare;
            }
        }
        return subSeqs2.length - subSeqs1.length;
    }

    static getSubSeq(seq) {
        const resultList = [];
        const item = [];
        for (let i = 1; i < seq.length; i++) {
            if (1 === seq[i]) {
                resultList.push([...item]);
                item.length = 0;
                continue;
            }
            item.push(seq[i] - 1);
        }
        resultList.push([...item]);
        const result = resultList.map(arr => [...arr]);
        return result;
    }
    
    static getSupSeq1(subSeqArray, retainLength, ...appendSubSeqArray) {
        const resultList = [];
        for (let i = 0; i < retainLength; i++) {
            resultList.push(1);
            const param_i = subSeqArray[i];
            if (this.isEmpty(param_i)) {
                continue;
            }
            for (let j = 0; j < param_i.length; j++) {
                resultList.push(param_i[j] + 1);
            }
        }
        if (appendSubSeqArray != null && appendSubSeqArray.length > 0) {
            for (let i = 0; i < appendSubSeqArray.length; i++) {
                resultList.push(1);
                if (this.isEmpty(appendSubSeqArray[i])) {
                    continue;
                }
                const param_i = appendSubSeqArray[i];
                for (let j = 0; j < param_i.length; j++) {
                    resultList.push(param_i[j] + 1);
                }
            }
        }
        return resultList;
    }
    
    static getSupSeq0(...subSeqArray) {
        const resultList = [];
        for (let i = 0; i < subSeqArray.length; i++) {
            resultList.push(1);
            if (this.isEmpty(subSeqArray[i])) {
                continue;
            }
            const param_i = subSeqArray[i];
            for (let j = 0; j < param_i.length; j++) {
                const param_i_j = param_i[j];
                resultList.push(param_i_j + 1);
            }
        }
        return resultList;
    }

    static getSupSeq00(subSeqArray) {
        const resultList = [];
        for (let i = 0; i < subSeqArray.length; i++) {
            resultList.push(1);
            if (this.isEmpty(subSeqArray[i])) {
                continue;
            }
            const param_i = subSeqArray[i];
            for (let j = 0; j < param_i.length; j++) {
                const param_i_j = param_i[j];
                resultList.push(param_i_j + 1);
            }
        }
        return resultList;
    }
    
    
    static isEmpty(seq) {
        return seq == null || seq.length === 0;
    }
    
    static isLimit(seq) {
        if (this.isEmpty(seq)) {
            return true;
        }
        if (this.isOne(seq)) {
            return false;
        }
        const subSeqs = this.getSubSeq(seq);
        
        const a = subSeqs[subSeqs.length - 1];
        const b = subSeqs.length > 1 ? subSeqs[subSeqs.length - 2] : null;
        return this.isLimit(b) || this.isLimit(a);
    }
    
    static isOne(seq) {
		return this.compare(seq, this.getOne()) == 0;
    }
    
    static getSeq(n) {
        if (n === 0) {
            return null;
        }
        const one = this.getOne();
        let result = one;
        for (let i = 0; i < n - 1; i++) {
            result = this.getSupSeq0(one, result);
        }
        return result;
    }
    
    static getOne() {
        return [1];
    }

    static getOumiga() {
		return this.getSupSeq0(this.getOne());
	}
	
    static getEpsilon0() {
		return this.getSupSeq0(this.getOumiga());
	}

    static getSuccessor(seq) {
		if (this.isEmpty(seq)) {
			return this.getOne();
		}
		if (this.isOne(seq)) {
			return this.getSupSeq0(seq, seq);
		}
		const subSeq = this.getSubSeq(seq);
        const a = subSeq[subSeq.length-1];
		const b = subSeq.length>1?subSeq[subSeq.length-2]:null;
		const successor = this.getSuccessor(a);
		if (this.isLimit(b)) {
			return this.getSupSeq1(subSeq, subSeq.length - 1, successor, successor);
		} else {
			return this.getSupSeq1(subSeq, subSeq.length - 1, successor);
		}
	}

    static minus(seq1, seq2) {
        if (this.compare(seq1, seq2) < 0) {
            throw new Error("Runtime Exception");
        }
        if (this.compare(seq1, seq2) === 0) {
            return [];
        }
        
        let list1 = this.fseq2Items(seq1);
        list1.sort((e1, e2) => this.compare(e2, e1));
        let list2 = this.fseq2Items(seq2);
        list2.sort((e1, e2) => this.compare(e2, e1));
        
        let startIndex = 0;
        for (let i = 0; i < Math.min(list1.length, list2.length); i++) {
            if (this.compare(list1[i], list2[i]) > 0) {
                break;
            } else {
                startIndex = i + 1;
            }
        }
        let preResult = list1.slice(startIndex);
        return this.items2Fseq(preResult);
    }
    
    static add(seq1, seq2) {
        if (this.isEmpty(seq1) || this.isEmpty(seq2)) {
            return this.isEmpty(seq1) ? seq2 : seq1;
        }

        let list1 = this.fseq2Items(seq1);
        list1.sort((e1, e2) => this.compare(e2, e1));
        let list2 = this.fseq2Items(seq2);
        list2.sort((e1, e2) => this.compare(e2, e1));
        let preResult = [];
        for (let item of list1) {
            if (this.compare(item, list2[0]) >= 0) {
                preResult.push(item);
            }
        }
        preResult.push(...list2);
        return this.items2Fseq(preResult);
    }

    static fseq2Items(seq) {
        let result = [];
        if (this.isEmpty(seq)) {
            return result;
        }
        if (this.isOne(seq)) {
            result.push(seq);
            return result;
        }
        
        if (this.isTwo(seq)) {
            let one = this.getOne();
            result.push(one);
            result.push(one);
            return result;
        }
        
        let subSeqs = this.getSubSeq(seq);
        let a = subSeqs[subSeqs.length - 1];
        let b = subSeqs.length > 1 ? subSeqs[subSeqs.length - 2] : null;
        
        if (this.isLimit(b)) {
            result.push(seq);
            return result;
        } else {
            let b_pre = this.expand(b);
            let items = this.fseq2Items(this.minus(a, b_pre));
            let item = this.getSupSeq1(subSeqs, subSeqs.length - 2, b_pre);
            items.push(item);
            return items;
        }
    }

    static items2Fseq(preResult) {
        preResult.sort((e1, e2) => this.compare(e1, e2));
        let result = [];
        for (let is of preResult) {
            if (this.isEmpty(result)) {
                result = is;
                continue;
            }
            if (this.isOne(is)) {
                result = this.getSuccessor(result);
            } else {
                let subSeqs = this.getSubSeq(is);
                let a = subSeqs[subSeqs.length - 1];
                let successor_a = this.getSuccessor(a);
                let new_a = this.add(a, result);
                result = this.getSupSeq1(subSeqs, subSeqs.length - 1, successor_a, new_a);
            }
        }
        return result;
    }

    static isTwo(seq) {
        return this.compare(seq, this.getTwo()) === 0;
    }

    static getTwo() {
        return this.getSupSeq0(this.getOne(), this.getOne());
    }
}