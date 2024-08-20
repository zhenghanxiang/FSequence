import FFFZListener from "./FFFZListener.js"
import FSeqConverter from "../FSeqConverter.js"
import CNFNode from "./CNFNode.js"
import CNFUtil from "./CNFUtil.js"
import FSeq from "../FSeq.js"


export default class FFFZ2SeqListener extends FFFZListener {
    
    static OMAGE_SEQ = FSeq.getOumiga();
    
    cnfMap = new Map();
    seqMap = new Map();
    
    getSeq(ctx) {
        return this.seqMap.get(ctx);
    }
    
    getF(ctx) {
        return this.cnfMap.get(ctx);
    }

    exitRoot(ctx) {
		const fffz = ctx.fffz();
		this.seqMap.set(ctx, this.seqMap.get(fffz));
	}

    exitFffz(ctx) {
        const polynomial = ctx.polynomial();
        const fffzList = ctx.fffz();
        if (polynomial != null) {
            const cnf = this.cnfMap.get(polynomial);
            const polynomialSeq = this.convertToFSeq1(cnf);
            this.seqMap.set(ctx, polynomialSeq);
        }
        if (fffzList.length > 0) {
            const subSeqs = new Array(fffzList.length);
            let i = 0;
            for (const fffzContext of fffzList) {
                subSeqs[i] = this.seqMap.get(fffzContext);
                i++;
            }
            this.seqMap.set(ctx, FSeq.getSupSeq00(subSeqs));
        }
    }
    
    convertToFSeq1(cnf) {
        if (!cnf || cnf.length === 0) {
            return null;
        }
        if (cnf.length === 1) {
            return this.convertToFSeq0(cnf[0]);
        }
        let result = null;
        for (const cnfNode of cnf) {
            if (result == null) {
                result = this.convertToFSeq0(cnfNode);
                continue;
            }
            const subSeq = FSeq.getSubSeq(result);
            const a = subSeq[subSeq.length - 1];
            const b = subSeq.length > 1 ? subSeq[subSeq.length - 2] : null;
            const successor_a = FSeq.getSuccessor(a);
            const cnf_a = FSeqConverter.convertToCNF(a);
            const newCNF_a = CNFUtil.add0(cnf_a, cnfNode);
            const new_a = this.convertToFSeq1(newCNF_a);
            if(FSeq.compareL(b, successor_a)>0) {
				result = FSeq.getSupSeq1(subSeq, subSeq.length-1, successor_a, new_a);
			}else {
				result = FSeq.getSupSeq1(subSeq, subSeq.length-1, new_a);
			}
        }
        return result;
    }
    
    convertToFSeq0(cnfNode) {
        const expList = cnfNode.getExpList();
        if (!expList || expList.length === 0) {
            return FSeq.getSeq(cnfNode.getParam());
        }
        let expFSeq = null;
        let result = null;
        if (expList.length === 1) {
            const expfFNode = expList[0];
            if (!expfFNode.getExpList() || expfFNode.getExpList().length === 0) {
                expFSeq = FSeq.getSeq(expfFNode.getParam());
                result = FSeq.getSupSeq0(expFSeq);
            }
        }
        if (result == null) {
            expFSeq = this.convertToFSeq1(expList);
            result = FSeq.getSupSeq0(FFFZ2SeqListener.OMAGE_SEQ, expFSeq);
        }
        const factor = cnfNode.getParam();
        if (factor > 1) {
			const subSeq = FSeq.getSubSeq(result);
			const  a = subSeq[subSeq.length-1];
			const  b = subSeq.length>1?subSeq[subSeq.length-2]:null;
			const  successor_a = FSeq.getSuccessor(a);
			const  fake = FSeq.compareL(b, successor_a) ;
			for (let i = 1; i < factor; i++) {
				if(fake > 0) {
					result = FSeq.getSupSeq1(subSeq, subSeq.length-1, successor_a, result);
				}else {
					result = FSeq.getSupSeq1(subSeq, subSeq.length-1, result);
				}
			}
        }
        return result;
    }

    exitPolynomial(ctx) {
        const itemList = ctx.item();
        let mergedCNF = [];
        for (const itemContext of itemList) {
            const cnf = this.cnfMap.get(itemContext);
            mergedCNF = CNFUtil.add1(mergedCNF, cnf);
        }
        this.cnfMap.set(ctx, mergedCNF);
    }

    exitExponent(ctx) {
        const omega = ctx.OMEGA();
        const exponent = ctx.exponent();
        const factorCtx = ctx.factor();
        const factor = this.getFactor(factorCtx);
        const polynomial = ctx.polynomial();
        if (polynomial != null) {
            const polynomialCNF = this.cnfMap.get(polynomial);
            this.cnfMap.set(ctx, polynomialCNF);
            return;
        }
        let expList = null;
        if (exponent != null) {
            expList = this.cnfMap.get(exponent);
        } else if (omega != null) {
            const one = new CNFNode(null, 1);
            expList = [one];
        }
        const cnfNode = new CNFNode(expList, factor);
        const list = [cnfNode];
        this.cnfMap.set(ctx, list);
    }

    exitItem(ctx) {
        const omega = ctx.OMEGA();
        const exponent = ctx.exponent();
        const factor = this.getFactor(ctx.factor());
        let expList = null;

        if (omega !== null) {
            if (exponent !== null) {
                expList = this.cnfMap.get(exponent);
            } else {
                const one = new CNFNode(null, 1);
                expList = [];
                expList.push(one);
            }
        } else {
            expList = null;
        }

        const cnfNode = new CNFNode(expList, factor);
        const list = [];
        list.push(cnfNode);
        this.cnfMap.set(ctx, list);
    }

    getFactor(factorCtx) {
        let factor = 1;
        if (factorCtx !== null) {
            factor = parseInt(factorCtx.getText(), 10);
        }
        return factor;
    }
}