import FSeq from "./FSeq.js"
import FSeqConverter from "./FSeqConverter.js"

export default class FFFZ2FSeqTest {
    
    static map = new Map();

	static test() {
		console.log("====================================================================================");
		console.log("FFFZ转序列测试=");
		console.log("====================================================================================");
		for (const [key, value] of FFFZ2FSeqTest.map.entries()) {
			const fffz2fSeq = FSeqConverter.fffz2FSeq(key);
			const equals = this.arraysEqual(value, fffz2fSeq);
			if (!equals) {
				throw new Error(`${key} ===>\n${fffz2fSeq}\n转换错误==========1========\n`);
			}else{
				console.log(`${key} ===>\n${fffz2fSeq}\n通过\n`)
			}
		}
		console.log("====================================================================================");
		console.log("F序列转FFFZ测试");
		console.log("====================================================================================");
		for (const [key, value] of FFFZ2FSeqTest.map.entries()) {
			const fSeq2FFFZ = FSeqConverter.fSeq2FFFZ(value, 0);
	        if (key !== fSeq2FFFZ) {
				throw new Error(`${value} ===>\n${fSeq2FFFZ}\n转换错误=========2=========\n`);
			}else{
				console.log(`${value} ===>\n${fSeq2FFFZ}\n通过\n`);
			}
		}
	}
	
	static arraysEqual(arr1, arr2) {
		if (arr1.length !== arr2.length) return false;
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) return false;
		}
		return true;
	}
    
    static getSuccessor(seq) {
        return FSeq.getSuccessor(FFFZ2FSeqTest.map.get(seq));
    }
    
    static getSupSeq(...ordinals) {
        const subSeqs = new Array(ordinals.length);
        for (let i = 0; i < ordinals.length; i++) {
            subSeqs[i] = FFFZ2FSeqTest.map.get(ordinals[i]);
            if (subSeqs[i] === undefined) {
                console.log(`${ordinals[i]} 不存在`);
            }
        }
        return FSeq.getSupSeq00(subSeqs);
    }
    
    static {
        FFFZ2FSeqTest.map.set("1", FSeq.getOne());
		FFFZ2FSeqTest.map.set("2", this.getSuccessor("1"));
		FFFZ2FSeqTest.map.set("3", this.getSuccessor("2"));
		FFFZ2FSeqTest.map.set("4", this.getSuccessor("3"));
		FFFZ2FSeqTest.map.set("ω", this.getSupSeq("1"));
		FFFZ2FSeqTest.map.set("ω+1", this.getSupSeq("2","2"));
		FFFZ2FSeqTest.map.set("ω+2", this.getSupSeq("2","3"));
		FFFZ2FSeqTest.map.set("ω+3", this.getSupSeq("2","4"));
		FFFZ2FSeqTest.map.set("ω2", this.getSupSeq("2","ω"));
		FFFZ2FSeqTest.map.set("ω2+1", this.getSupSeq("2","ω+1"));
		FFFZ2FSeqTest.map.set("ω2+2", this.getSupSeq("2","ω+2"));
		FFFZ2FSeqTest.map.set("ω2+3", this.getSupSeq("2","ω+3"));
		FFFZ2FSeqTest.map.set("ω3", this.getSupSeq("2","ω2"));
		FFFZ2FSeqTest.map.set("ω3+1", this.getSupSeq("2","ω2+1"));
		FFFZ2FSeqTest.map.set("ω3+2", this.getSupSeq("2","ω2+2"));
		FFFZ2FSeqTest.map.set("ω^2", this.getSupSeq("2"));
		FFFZ2FSeqTest.map.set("ω^2+1", this.getSupSeq("3","3"));
		FFFZ2FSeqTest.map.set("ω^2+ω", this.getSupSeq("3","ω"));
		FFFZ2FSeqTest.map.set("ω^2+ω+1", this.getSupSeq("3","ω+1"));
		FFFZ2FSeqTest.map.set("ω^2+ω2", this.getSupSeq("3","ω2"));
		FFFZ2FSeqTest.map.set("(ω^2)*2", this.getSupSeq("3","ω^2"));
		FFFZ2FSeqTest.map.set("(ω^2)*2+1", this.getSupSeq("3","ω^2+1"));
		FFFZ2FSeqTest.map.set("(ω^2)*3", this.getSupSeq("3","(ω^2)*2"));
		FFFZ2FSeqTest.map.set("ω^3", this.getSupSeq("3"));
		FFFZ2FSeqTest.map.set("ω^ω", this.getSupSeq("ω","ω"));
		FFFZ2FSeqTest.map.set("ω^ω+1", this.getSupSeq("ω","ω+1","ω+1"));
		FFFZ2FSeqTest.map.set("ω^ω+ω", this.getSupSeq("ω","ω+1","ω2"));
		FFFZ2FSeqTest.map.set("ω^ω+ω^2", this.getSupSeq("ω","ω+1","ω^2"));
		FFFZ2FSeqTest.map.set("(ω^ω)*2", this.getSupSeq("ω","ω+1","ω^ω"));
		FFFZ2FSeqTest.map.set("(ω^ω)*3", this.getSupSeq("ω","ω+1","(ω^ω)*2"));
		FFFZ2FSeqTest.map.set("ω^(ω+1)", this.getSupSeq("ω","ω+1"));
		FFFZ2FSeqTest.map.set("ω^(ω+1)+1", this.getSupSeq("ω","ω+2","ω+2"));
		FFFZ2FSeqTest.map.set("ω^(ω+1)+ω", this.getSupSeq("ω","ω+2","ω2"));
		FFFZ2FSeqTest.map.set("ω^(ω+1)+ω^2", this.getSupSeq("ω","ω+2","ω^2"));
		FFFZ2FSeqTest.map.set("ω^(ω+1)+ω^ω", this.getSupSeq("ω","ω+2","ω^ω"));
		FFFZ2FSeqTest.map.set("(ω^(ω+1))*2", this.getSupSeq("ω","ω+2","ω^(ω+1)"));
		FFFZ2FSeqTest.map.set("(ω^(ω+1))*3", this.getSupSeq("ω","ω+2","(ω^(ω+1))*2"));
		FFFZ2FSeqTest.map.set("ω^(ω+2)", this.getSupSeq("ω","ω+2"));
		FFFZ2FSeqTest.map.set("ω^(ω+3)", this.getSupSeq("ω","ω+3"));
		FFFZ2FSeqTest.map.set("ω^(ω2)", this.getSupSeq("ω","ω2"));
		FFFZ2FSeqTest.map.set("ω^ω^2", this.getSupSeq("ω","ω^2"));
		FFFZ2FSeqTest.map.set("ω^ω^ω", this.getSupSeq("ω","ω^ω"));
		FFFZ2FSeqTest.map.set("ω^ω^ω+ω^ω", this.getSupSeq("ω","ω^ω+1","(ω^ω)*2"));
		FFFZ2FSeqTest.map.set("ω^ω^ω+(ω^ω)*2", this.getSupSeq("ω","ω^ω+1","(ω^ω)*3"));
		FFFZ2FSeqTest.map.set("(ω^ω^ω)*2", this.getSupSeq("ω","ω^ω+1","ω^ω^ω"));
    }
}