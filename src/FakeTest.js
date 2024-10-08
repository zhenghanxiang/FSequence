import FSeq from "./FSeq.js"
import CompositeDecider from "./compatible/CompositeDecider.js"

export default class FakeTest {
    
    static map = new Map();
    
    static getSuccessor(seq) {
        return FSeq.getSuccessor(FakeTest.map.get(seq));
    }
    
    static getSupSeq(...ordinals) {
        const subSeqs = new Array(ordinals.length);
        for (let i = 0; i < ordinals.length; i++) {
            subSeqs[i] = FakeTest.map.get(ordinals[i]);
            if (subSeqs[i] === undefined) {
                console.log(`${ordinals[i]} 不存在`);
            }
        }
        return FSeq.getSupSeq00(subSeqs);
    }
	static test(ordinal1, ordinal2, assertResult) {
		this.test1(ordinal1, ordinal2, assertResult);
		//this.test1(ordinal2, ordinal1, 0-assertResult);
	}	

    
    static test1(ordinal1, ordinal2, assertResult) {
        const seq1 = FakeTest.map.get(ordinal1);
        const seq2 = FakeTest.map.get(ordinal2);
        if (seq1 === undefined) {
            console.log(`${ordinal1} 不存在`);
        }
        if (seq2 === undefined) {
            console.log(`${ordinal2} 不存在`);
        }
		let assertResultMsg = assertResult===1?"存在":"不存在";
        if (seq1 !== undefined && seq2 !== undefined) {
			const seqs = [seq1, seq2];
            const compareL = CompositeDecider.compareL(seqs);
			let compareLMsg = compareL===1?"存在":"不存在";
			if((compareL >0 && assertResult > 0) 
				|| (compareL === 0 && assertResult === 0)
			    || (compareL < 0 && assertResult < 0)
			){
				console.log(`[${ordinal1},${ordinal2}] ${compareLMsg} ，符合预期结果 ${assertResultMsg}`);
			} else if ((compareL>0 && assertResult<=0) ||(compareL<=0 && assertResult>0)  ){
				console.error(`[${ordinal1},${ordinal2}] ${compareLMsg}， 不符合预期结果 ${assertResultMsg}`);
			} else {
				console.warn(`[${ordinal1},${ordinal2}] ${compareLMsg}${compareL}， 不符合预期结果 ${assertResultMsg}${assertResult}`);
			}
        }
    }

	static test2(assertResult, ...ordinals) {
		const seqs = new Array(ordinals.length);
		let i = 0;
		for (const ordinal of ordinals) {
			const seq = FakeTest.map.get(ordinal);
			if (seq === null) {
				console.log(`${ordinal}不存在`);
				return;
			} else {
				seqs[i] = seq;
				i++;
			}
		}
		const compareL = CompositeDecider.compareL(seqs);
		const compareLMsg = compareL > 0 ? "" : "不";
		const assertMsg = assertResult > 0 ? "" : "不";
	
		const join = ordinals.join(",");
		if ((compareL > 0 && assertResult > 0) 
			|| (compareL === 0 && assertResult === 0)
			|| (compareL < 0 && assertResult < 0)) {
			console.log(`[${join}] ${compareLMsg}存在，符合预期结果 ${assertMsg}存在`);			
		} else if ((compareL > 0 && assertResult <= 0) || (compareL <= 0 && assertResult > 0)) {
			console.error(`[${join}]:${compareL}${compareLMsg}存在 不符合预期结果 ${assertResult}${assertMsg}存在`);
		} else {
			console.warn(`[${join}]:${compareL}${compareLMsg}存在 不符合预期结果 ${assertResult}${assertMsg}存在`);
		}
	}
    
    static test0() {
		console.log("====================================================================================");
		console.log("Fake测试");
		console.log("====================================================================================");
        this.test("", "1", 1);
		this.test("ω", "ω+1", 1);
		this.test("ω", "ω+2", 1);
		this.test("ω2", "ω2+1", 1);
		this.test("ω2", "ω2+2", 1);
		this.test("ω2", "ε0+1", 1);
		this.test("ω3", "ω3+1", 1);
		this.test("ω^2", "ω^2+1", 1);
		this.test("ω^2", "ω^2+1", 1);
		this.test("ω^2", "ω^2+ω", 1);
		this.test("ω^2+ω","ω^2+ω+1", 1);
		this.test("ω^2+ω","(ω^2)*2+1", 1);
		this.test("ω^2", "ω^2+ω+1", 1);
		this.test("ω^2", "ω^2+ω2", 1);
		this.test("ω^ω", "ω^ω+1", 1);
		this.test("ω^ω", "ω^ω+ω", 1);
		this.test("ω^ω", "ω^(ω+1)", 1);
		this.test("(ω^ω)*2", "ω^(ω+1)", 1);
		this.test("(ω^ω)*2", "Γ0*ω", 1);
		this.test("ω^(ω2)", "Γ0*ω", 1);
		this.test("ε0", "ε0+1", 1);
		this.test("ε0", "ε0+ω", 1);
		this.test("ε0", "ε0*ω", 1);
		this.test("ε0", "ε0^ω", 1);
		this.test("ε0", "ε(ω)", 1);
		this.test("ε0", "ε(ω2)", 1);
		this.test("ε0", "ε(ω^2)", 1);
		this.test("ε0", "ε(ω^ω)", 1);
		this.test("ε0*2", "ε0*2+ω", 1);
		this.test("ε0*2", "ε0*ω", 1);
		this.test("ε0*2", "ε0^ω", 1);
		this.test("ε0*2", "ε(ω)", 1);
		this.test("ε0*2", "ε(ω2)", 1);
		this.test("ε0*2", "ε(ω^2)", 1);
		this.test("ε0*2", "ε(ω^ω)", 1);
		this.test("ε0*(ω+1)", "ε0*ω2", 1);
		this.test("ε0*(ω+1)", "ε0*ω^2", 1);
		this.test("ε0*(ω+1)", "ε0*ω^ω", 1);
		this.test("ε0*(ω+1)", "ε0^ω", 1);
		this.test("ε0*(ω+1)", "ε(ω)", 1);
		this.test("ε0*(ω+1)", "ψ(Ω_ω*ω)", 1);
		this.test("ε0*(ω+1)", "ψ(Ω_ω*ω2)", 1);
		this.test("ε0*(ω+1)", "ψ(Ω_ω*ω^2)", 1);
		this.test("ε0*(ω+1)", "ψ(Ω_ω*ω^ω)", 1);
		this.test("ε0*(ω+2)", "ψ(Ω_ω*ω)", 1);
		this.test("ε0*(ω^2+1)", "ψ((Ω_ω)^2*ω)", 1);
		this.test("ε0*(ω^2+1)", "ψ((Ω_ω)^2*ω2)", 1);
		this.test("ε0*(ω^2+1)", "ψ((Ω_ω)^2*ω^2)", 1);
		this.test("ε0*(ω^2+1)", "ψ((Ω_ω)^2*ω^ω)", 1);
		this.test("ε0*(ω^ω+1)", "ψ((Ω_ω)^ω)", 1);
		this.test("ε0*(ω^ω+1)", "ψ((Ω_ω)^ω2)", 1);
		this.test("ε0*(ω^ω+1)", "ψ((Ω_ω)^ω*ω)", 1);
		this.test("ε0*(ω^ω+1)", "ψ((Ω_ω)^(ω2))", 1);
		this.test("ε0*(ω^ω+1)", "ψ((Ω_ω)^(ω^2))", 1);
		this.test("ε0*(ω^ω+1)", "ψ((Ω_ω)^(ω^ω))", 1);


		this.test("ω", "ω2", 0);
		this.test("ω", "ω^2", -1);
		this.test("ω", "ω^2+ω", 0);
		this.test("ω", "ω^(ω+1)", -1);
		this.test("ω", "ω^ω", -1);
		this.test("ω", "ω^ω+ω^2", -1);
		this.test("ω", "ω^(ω+2)", -1);
		this.test("ω", "ω^ω^ω", -1);
		this.test("ω2", "ω3", 0);
		this.test("ω2", "ω^2+ω", 0);
		this.test("ω2", "ω^ω", -1);
		this.test("ω2", "ω^ω+ω^2", -1);
		this.test("ω2", "ω^(ω+1)", -1);
		this.test("ω2", "ω^(ω+2)", -1);
		this.test("ω2", "ω^ω^ω", -1);
		this.test("ω2", "ε0", -1);
		this.test("ω2", "ε0+ω", 0);
		this.test("ω2", "ε0*2", -1);
		this.test("ω2", "ε0*ω", -1);
		this.test("ω2", "ε0*ω^2", -1);
		this.test("ω3", "ω^2", -1);
		this.test("ω3", "ω^ω", -1);
		this.test("ω3", "ε0", -1);
		this.test("ω3", "ε1", -1);
		this.test("ω3", "ε1^2", -1);
		this.test("ω3", "ε1^ε1", -1);
		this.test("ω3", "ω4", 0);
		this.test("ω^2", "(ω^2)*2",0);
		this.test("ω^2", "(ω^2)*3",0);
		this.test("ω^2", "ω^3",-1);
		this.test("ω^2", "ω^ω",-1);
		this.test("ω^2", "ω^ω+ω^2",0);
		this.test("ω^2", "(ω^ω)*2+ω^2",0);
		this.test("ω^2", "ω^(ω+1)",-1);//20240821修改
		this.test("ω^2", "ω^(ω+2)",-1);
		this.test("ω^2", "ω^(ω+3)",-1);
		this.test("ω^2", "ω^(ω2+2)",-1);
		this.test("ω^2", "ω^(ω2+3)",-1);
		this.test("ω^2", "ε0", -1);
		this.test("ω^2", "ε0*ω", -1);//20240821修改
		this.test("ω^2", "ε0*ω^2", -1);
		this.test("ω^2", "ε0*ω^3", -1);
		this.test("ω^2", "ε(ε0)", -1);
		this.test("ω^2+ω", "ω^2+ω2", 0);
		this.test("ω^2+ω", "(ω^2)*2", -1);
		this.test("ω^2+ω", "(ω^2)*2+ω", 0);
		this.test("ω^2+ω", "(ω^2)*3", -1);
		this.test("ω^2+ω", "ω^3", -1);
		this.test("ω^2+ω", "ω^ω", -1);
		this.test("ω^2+ω", "ε0", -1);
		this.test("ω^2+ω", "ε(ω)", -1);
		this.test("ω^2+ω", "ε(ω)^2", -1);
		this.test("ω^2+ω", "ε(ω)^ε(ω)", -1);
		this.test("ω^2+ω2", "ε(ω)", -1);
		this.test("ω^2+ω2", "ε(ω+1)", -1);
		this.test("ω^2+ω2", "ε(ω+1)^2", -1);
		this.test("ω^2+ω2", "ε(ω+1)^ε(ω+1)", -1);
		this.test("(ω^2)*2", "(ω^2)*3",0);
		this.test("(ω^2)*2", "ω^ω",-1);
		this.test("(ω^2)*2", "ω^ω+ω^2",0);
		this.test("(ω^2)*2", "(ω^ω)*2+ω^2",0);
		this.test("(ω^2)*2", "ω^(ω+2)",-1);
		this.test("(ω^2)*2", "ω^(ω+3)",-1);
		this.test("(ω^2)*2", "ω^(ω2+2)",-1);
		this.test("(ω^2)*2", "ω^(ω2+3)",-1);
		this.test("(ω^2)*2", "ε0*ω", -1);//20240821修改
		this.test("(ω^2)*2", "ε0*ω^2", -1);
		this.test("(ω^2)*2", "ε0*ω^3", -1);
		this.test("ω^ω", "(ω^ω)*2", 0);
		this.test("ω^ω", "(ω^ω)*3", 0);
		this.test("ω^ω", "ω^(ω2)", 0);
		this.test("ω^ω", "ω^ω^2", -1);
		this.test("ω^ω", "ω^ω^ω", -1);
		this.test("ω^ω", "ω^ω^ω+ω^ω", 0);
		this.test("ω^ω", "ω^ω^ω+(ω^ω)*2", 0);
		this.test("ω^ω", "ω^(ω^ω+ω)", 0);
		this.test("ω^ω", "ω^(ω^ω+ω2)", 0);
		this.test("ω^ω", "ω^(ω^ω+ω^2)", -1);
		this.test("ω^ω", "ω^ω^(ω+1)", -1);
		this.test("ω^ω", "ω^ω^(ω^2+1)", -1);
		this.test("ω^ω", "ω^ω^(ω^ω+1)", -1);
		this.test("ω^ω", "ε0", -1);
		this.test("ω^ω", "ε0*ω^ω", 0);
		this.test("ω^ω", "ε0*ω^ω^2", -1);
		this.test("ω^ω", "ε0*ω^(ω2)", 0);
		this.test("ω^ω", "φ(ω,0)", -1);
		this.test("(ω^ω)*2", "(ω^ω)*3", 0);
		this.test("(ω^ω)*2", "ω^(ω2)", 0);
		this.test("(ω^ω)*2", "ω^ω^ω", -1);
		this.test("(ω^ω)*2", "ω^ω^ω+ω^ω", 0);
		this.test("(ω^ω)*2", "ω^ω^ω+(ω^ω)*2", 0);
		this.test("(ω^ω)*2", "ω^(ω^ω+ω)", 0);
		this.test("(ω^ω)*2", "ω^(ω^ω+ω2)", 0);
		this.test("(ω^ω)*2", "ω^(ω^ω+ω^2)", -1);
		this.test("(ω^ω)*2", "ω^ω^(ω+1)", -1);
		this.test("(ω^ω)*2", "ω^ω^(ω^2+1)", -1);
		this.test("(ω^ω)*2", "ω^ω^(ω^ω+1)", -1);
		this.test("(ω^ω)*2", "ε0", -1);
		this.test("(ω^ω)*2", "ε0*ω^ω", 0);
		this.test("(ω^ω)*2", "ε0*ω^(ω2)", 0);
		this.test("(ω^ω)*2", "ε0*ω^ω^2", -1);
		this.test("(ω^ω)*2", "Γ0", -1);
		this.test("(ω^ω)*2", "Γ0*2", -1);
		this.test("(ω^ω)*2", "Γ0*ω^ω", 0);
		this.test("(ω^ω)*2", "Γ0*ε0", -1);
		this.test("(ω^ω)*2", "Γ0^2", -1);
		this.test("(ω^ω)*2", "Γ0^Γ0", -1);
		this.test("(ω^ω)*2", "ε(Γ0+1)", -1);
		this.test("(ω^ω)*2", "φ(ε(Γ0+1),0)", -1);
		this.test("ω^(ω+1)", "(ω^(ω+1))*2", 0);
		this.test("ω^(ω+1)", "ω^(ω+2)", -1);
		this.test("ω^(ω+1)", "ω^(ω2)", -1);
		this.test("ω^(ω+1)", "ω^(ω2+1)", -1);
		this.test("ω^(ω+1)", "ω^(ω3)", -1);
		this.test("ω^(ω+1)", "ω^ω^2", -1);
		this.test("ω^(ω+1)", "ω^ω^ω", -1);
		this.test("ω^(ω+1)", "ε0", -1);
		this.test("ω^(ω+1)", "φ(ω,0)", -1);
		this.test("ω^(ω+1)", "Γ0", -1);
		this.test("ω^(ω+1)", "Γ0*2", -1);
		this.test("ω^(ω+1)", "Γ0*ω", -1);
		this.test("ω^(ω+1)", "φ(ω,Γ0+1)", -1);
		this.test("(ω^(ω+1))*2", "(ω^(ω+1))*3", 0);
		this.test("ω^ω^ω", "ω^ω^(ω2)", 0);
		this.test("ω^ω^(ω2)+ω^ω", "ω^ω^(ω2)*2", -1);//20240821修改
		this.test("ε0", "ε0*2", 0);
		this.test("ε0", "ε1", 0);
		this.test("ε0", "ε(ω+1)", 0);
		this.test("ε0", "ε(ω^2+1)", 0);
		this.test("ε0", "ε(ε0)", 0);
		this.test("ε0", "ζ0", -1);
		this.test("ε0", "η0", -1);
		this.test("ε0", "Γ0", -1);
		this.test("ε0", "LVO", -1);
		this.test("ε0", "ψ(Ω_2)", 0);
		this.test("ε0", "ψ(Ω_3)", 0);
		this.test("ε0*2", "ε0*3", 0);
		this.test("ε0*2", "ε0^2", 0);
		this.test("ε0*2", "ε0^ε0", 0);
		this.test("ε0*2", "ε1", 0);
		this.test("ε0*2", "ε(ω+1)", 0);
		this.test("ε0*2", "ε(ε0)", 0);
		this.test("ε0*2", "ζ0", -1);
		this.test("ε0*2", "η0", -1);
		this.test("ε0*2", "Γ0", -1);
		this.test("ε0*2", "LVO", -1);
		this.test("ε0*2", "ψ(Ω_2)", 0);
		this.test("ε0*2", "ψ(Ω_3)", 0);
		this.test("ε0*2", "ψ(Ω_ω)", -1);
		this.test("ε1", "ε(ω^2+1)", 0);
		this.test("ε1", "ε(ω^ω+1)", 0);
		this.test("ε1", "ψ(Ω_2)", 0);
		this.test("ε(ω)", "ε(ω^2+ω)", 0);

		this.test("ω^ω", "ω^ω^ω+ω", 1);
		this.test("ω^ω", "ω^(ω^ω+1)", 1);
		this.test("ω^ω", "ε0*ω", 1);
		this.test("ω^ω", "ε0*ω^2", 1);
		this.test("ω^ω", "ε0*ω^(ω+1)", 1);
		this.test("ω^ω", "ε0*ω^(ω2+1)", 1);
		this.test("(ω^ω)*2", "ω^ω^ω+ω", 1);
		this.test("(ω^ω)*2", "ω^(ω^ω+1)", 1);
		this.test("(ω^ω)*2", "ε0*ω", 1);
		this.test("(ω^ω)*2", "ε0*ω^2", 1);
		this.test("(ω^ω)*2", "ε0*ω^(ω+1)", 1);
		this.test("(ω^ω)*2", "ε0*ω^(ω2+1)", 1);
		this.test("ω^(ω+1)", "ω^(ω+1)+ω^ω", 1);
		this.test("ω^(ω+1)+ω^ω", "(ω^(ω+1))*2", 1);
		this.test("(ω^(ω+1))*2", "(ω^(ω+1))*2+ω^ω", 1);
		this.test("(ω^(ω+1))*2+ω^ω", "(ω^(ω+1))*3", 1);
		this.test("ω^ω^(ω+1)", "ω^ω^(ω+1)+ω^ω", 1);//20240821修改
		this.test("ω^ω^(ω+1)+ω^ω", "ω^ω^(ω+1)*2", -1);//20240821修改
		this.test("ω^ω^(ω+1)", "ω^(ω^(ω+1)+ω^ω)", 1);
		this.test("ω^(ω^(ω+1)+ω^ω)", "ω^(ω^(ω+1)*2)", 1);
		this.test("ω^ω^(ω2)", "ω^ω^(ω2)+ω^ω", 1);//20240821修改

		this.test("ε0", "φ(ω,0)", 1);
		this.test("ε0", "SVO", 1);
		this.test("ε0", "SHO", 1);
		this.test("ε0*2", "φ(ω,0)", 1);
		this.test("ε0*2", "SVO", 1);
		this.test("ε1", "ε(ω)", 1);
		this.test("ε1", "SHO", 1);
		this.test("ε(ω)", "ε(ω+1)", 1);
		this.test("ε(ω+1)", "SHO", 1);
		this.test("ζ0", "ε(ζ0+1)", 1);


		this.test2(1, "ω^(ω+1)","ω^(ω+1)+ω^ω","ω^(ω+1)*2");
		this.test2(-1, "ω^(ω+1)+ω^ω","ω^(ω+1)*2","ω^(ω+1)*2+ω^ω");
		this.test2(-1, "ω^(ω+1)","ω^(ω+1)+ω^ω","ω^(ω+1)*2","ω^(ω+1)*2+ω^ω");
		this.test2(1, "ω^(ω2)","ω^(ω2)+ω^(ω+1)","ω^(ω2)+ω^(ω+1)+ω^ω");

		this.test2(-1, "ε0","ε(ω)","ε(ω+1)");
		this.test2(1, "ε(ω)","ε(ω+1)","ε(ω2)");
		this.test2(1, "ε(ω^(ω+1))","ε(ω^(ω+1)+ω^ω)","ε(ω^(ω+1)*2)");
		this.test2(-1, "ε(ω^(ω+1)+ω^ω)","ε(ω^(ω+1)*2)","ε(ω^(ω+1)*2+ω^ω)");
		this.test2(-1, "ε(ω^(ω+1))","ε(ω^(ω+1)+ω^ω)","ε(ω^(ω+1)*2)","ε(ω^(ω+1)*2+ω^ω)");
		
		this.test2(1, "ω^ω^(ω2)","ω^(ω^(ω2)+ω^(ω+1))","ω^(ω^(ω2)+ω^(ω+1)+ω^ω)");











    }
    
    static {
        FakeTest.map.set("", []);
		FakeTest.map.set("1", FSeq.getOne());
		FakeTest.map.set("2", this.getSuccessor("1"));
		FakeTest.map.set("3", this.getSuccessor("2"));
		FakeTest.map.set("4", this.getSuccessor("3"));
		FakeTest.map.set("ω", this.getSupSeq("1"));
		FakeTest.map.set("ω+1", this.getSupSeq("2","2"));
		FakeTest.map.set("ω+2", this.getSupSeq("2","3"));
		FakeTest.map.set("ω+3", this.getSupSeq("2","4"));
		FakeTest.map.set("ω2", this.getSupSeq("2","ω"));
		FakeTest.map.set("ω2+1", this.getSupSeq("2","ω+1"));
		FakeTest.map.set("ω2+2", this.getSupSeq("2","ω+2"));
		FakeTest.map.set("ω2+3", this.getSupSeq("2","ω+3"));
		FakeTest.map.set("ω3", this.getSupSeq("2","ω2"));
		FakeTest.map.set("ω3+1", this.getSupSeq("2","ω2+1"));
		FakeTest.map.set("ω3+2", this.getSupSeq("2","ω2+2"));
		FakeTest.map.set("ω4", this.getSupSeq("2","ω3"));
		FakeTest.map.set("ω^2", this.getSupSeq("2"));
		FakeTest.map.set("ω^2+1", this.getSupSeq("3","3"));
		FakeTest.map.set("ω^2+ω", this.getSupSeq("3","ω"));
		FakeTest.map.set("ω^2+ω+1", this.getSupSeq("3","ω+1"));
		FakeTest.map.set("ω^2+ω2", this.getSupSeq("3","ω2"));
		FakeTest.map.set("(ω^2)*2", this.getSupSeq("3","ω^2"));
		FakeTest.map.set("(ω^2)*2+1", this.getSupSeq("3","ω^2+1"));
		FakeTest.map.set("(ω^2)*2+ω", this.getSupSeq("3","ω^2+ω"));
		FakeTest.map.set("(ω^2)*3", this.getSupSeq("3","(ω^2)*2"));
		FakeTest.map.set("ω^3", this.getSupSeq("3"));
		FakeTest.map.set("ω^3+ω", this.getSupSeq("4","ω"));
		FakeTest.map.set("ω^3+ω^2", this.getSupSeq("4","ω^2"));
		FakeTest.map.set("ω^ω", this.getSupSeq("ω","ω"));
		FakeTest.map.set("ω^ω+1", this.getSupSeq("ω","ω+1","ω+1"));
		FakeTest.map.set("ω^ω+ω", this.getSupSeq("ω","ω+1","ω2"));
		FakeTest.map.set("ω^ω+ω2", this.getSupSeq("ω","ω+1","ω3"));
		FakeTest.map.set("ω^ω+ω^2", this.getSupSeq("ω","ω+1","ω^2"));
		FakeTest.map.set("(ω^ω)*2", this.getSupSeq("ω","ω+1","ω^ω"));
		FakeTest.map.set("(ω^ω)*2+ω^2", this.getSupSeq("ω","ω+1","ω^ω+ω^2"));
		FakeTest.map.set("(ω^ω)*3", this.getSupSeq("ω","ω+1","(ω^ω)*2"));
		FakeTest.map.set("ω^(ω+1)", this.getSupSeq("ω","ω+1"));
		FakeTest.map.set("ω^(ω+1)+1", this.getSupSeq("ω","ω+2","ω+2"));
		FakeTest.map.set("ω^(ω+1)+ω", this.getSupSeq("ω","ω+2","ω2"));
		FakeTest.map.set("ω^(ω+1)+ω^2", this.getSupSeq("ω","ω+2","ω^2"));
		FakeTest.map.set("ω^(ω+1)+ω^ω", this.getSupSeq("ω","ω+2","ω^ω"));
		FakeTest.map.set("(ω^(ω+1))*2", this.getSupSeq("ω","ω+2","ω^(ω+1)"));
		FakeTest.map.set("ω^(ω+1)*2", this.getSupSeq("ω","ω+2","ω^(ω+1)"));
		FakeTest.map.set("(ω^(ω+1))*2+ω^ω", this.getSupSeq("ω","ω+2","ω^(ω+1)+ω^ω"));
		FakeTest.map.set("ω^(ω+1)*2+ω^ω", this.getSupSeq("ω","ω+2","ω^(ω+1)+ω^ω"));
		FakeTest.map.set("(ω^(ω+1))*3", this.getSupSeq("ω","ω+2","(ω^(ω+1))*2"));
		FakeTest.map.set("ω^(ω+1)*3", this.getSupSeq("ω","ω+2","(ω^(ω+1))*2"));
		FakeTest.map.set("ω^(ω+2)", this.getSupSeq("ω","ω+2"));
		FakeTest.map.set("ω^(ω+3)", this.getSupSeq("ω","ω+3"));
		FakeTest.map.set("ω^(ω2)", this.getSupSeq("ω","ω2"));
		FakeTest.map.set("ω^(ω2)+1", this.getSupSeq("ω","ω2+1","ω2+1"));
		FakeTest.map.set("ω^(ω2)+ω^ω", this.getSupSeq("ω","ω2+1","ω^ω"));
		FakeTest.map.set("ω^(ω2)+ω^(ω+1)", this.getSupSeq("ω","ω2+1","ω^(ω+1)"));
		FakeTest.map.set("ω^(ω2)+ω^(ω+1)+ω^ω", this.getSupSeq("ω","ω2+1","ω^(ω+1)+ω^ω"));
		FakeTest.map.set("ω^(ω2+1)", this.getSupSeq("ω","ω2+1"));
		FakeTest.map.set("ω^(ω2+2)", this.getSupSeq("ω","ω2+2"));
		FakeTest.map.set("ω^(ω2+3)", this.getSupSeq("ω","ω2+3"));
		FakeTest.map.set("ω^(ω3)", this.getSupSeq("ω","ω3"));
		FakeTest.map.set("ω^ω^2", this.getSupSeq("ω","ω^2"));
		FakeTest.map.set("ω^(ω^2+1)", this.getSupSeq("ω","ω^2+1"));
		FakeTest.map.set("ω^ω^ω", this.getSupSeq("ω","ω^ω"));
		FakeTest.map.set("ω^ω^ω+1", this.getSupSeq("ω","ω^ω+1","ω^ω+1"));
		FakeTest.map.set("ω^ω^ω+ω", this.getSupSeq("ω","ω^ω+1","ω^ω+ω"));
		FakeTest.map.set("ω^ω^ω+ω^ω", this.getSupSeq("ω","ω^ω+1","(ω^ω)*2"));
		FakeTest.map.set("ω^ω^ω+(ω^ω)*2", this.getSupSeq("ω","ω^ω+1","(ω^ω)*3"));
		FakeTest.map.set("ω^(ω^ω+1)", this.getSupSeq("ω","ω^ω+1"));
		FakeTest.map.set("ω^(ω^ω+ω)", this.getSupSeq("ω","ω^ω+ω"));
		FakeTest.map.set("ω^(ω^ω+ω2)", this.getSupSeq("ω","ω^ω+ω2"));
		FakeTest.map.set("ω^(ω^ω+ω^2)", this.getSupSeq("ω","ω^ω+ω^2"));
		FakeTest.map.set("ω^ω^(ω+1)", this.getSupSeq("ω","ω^(ω+1)"));	
		FakeTest.map.set("ω^ω^(ω+1)+ω^ω", this.getSupSeq("ω","ω^(ω+1)+1","ω^(ω+1)+ω^ω"));	
		FakeTest.map.set("ω^ω^(ω+1)*2", this.getSupSeq("ω","ω^(ω+1)+1","ω^ω^(ω+1)"));	
		FakeTest.map.set("ω^(ω^(ω+1)+ω^ω)", this.getSupSeq("ω","ω^(ω+1)+ω^ω"));	
		FakeTest.map.set("ω^(ω^(ω+1)*2)", this.getSupSeq("ω","(ω^(ω+1))*2"));	
		FakeTest.map.set("ω^(ω^(ω+1)*2+ω^ω)", this.getSupSeq("ω","(ω^(ω+1))*2+ω^ω"));	
		FakeTest.map.set("ω^ω^(ω^2+1)", this.getSupSeq("ω","ω^(ω^2+1)"));		
		FakeTest.map.set("ω^ω^(ω^ω+1)", this.getSupSeq("ω","ω^(ω^ω+1)"));		
		FakeTest.map.set("ω^ω^(ω2)", this.getSupSeq("ω","ω^(ω2)"));
		FakeTest.map.set("ω^ω^(ω2)+ω^ω", this.getSupSeq("ω","ω^(ω2)+1","ω^(ω2)+ω^ω"));
		FakeTest.map.set("ω^ω^(ω2)*2", this.getSupSeq("ω","ω^(ω2)+1","ω^ω^(ω2)"));
		FakeTest.map.set("ω^(ω^(ω2)+ω^(ω+1))", this.getSupSeq("ω","ω^(ω2)+ω^(ω+1)"));
		FakeTest.map.set("ω^(ω^(ω2)+ω^(ω+1)+ω^ω)", this.getSupSeq("ω","ω^(ω2)+ω^(ω+1)+ω^ω"));
		FakeTest.map.set("ε0", this.getSupSeq("ω"));
		FakeTest.map.set("ε0+1", this.getSupSeq("ω+1","ω+1"));
		FakeTest.map.set("ε0+ω", this.getSupSeq("ω+1","ω2"));
		FakeTest.map.set("ε0+ω^2", this.getSupSeq("ω+1","ω^2"));
		FakeTest.map.set("ε0+ω^ω", this.getSupSeq("ω+1","ω^ω"));
		FakeTest.map.set("ε0*2", this.getSupSeq("ω+1","ε0"));
		FakeTest.map.set("ε0*2+ω", this.getSupSeq("ω+1","ε0+ω"));
		FakeTest.map.set("ε0*3", this.getSupSeq("ω+1","ε0*2"));
		FakeTest.map.set("ε0*ω", this.getSupSeq("ω+1"));
		FakeTest.map.set("ε0*ω+1", this.getSupSeq("ω+2","ω+2"));
		FakeTest.map.set("ε0*ω+ω", this.getSupSeq("ω+2","ω2"));
		FakeTest.map.set("ε0*ω+ω^2", this.getSupSeq("ω+2","ω^2"));
		FakeTest.map.set("ε0*ω+ω^ω", this.getSupSeq("ω+2","ω^ω"));
		FakeTest.map.set("ε0*(ω+1)", this.getSupSeq("ω+2","ε0"));
		FakeTest.map.set("ε0*(ω+2)", this.getSupSeq("ω+2","ε0*2"));
		FakeTest.map.set("ε0*ω2", this.getSupSeq("ω+2","ε0*ω"));
		FakeTest.map.set("ε0*ω3", this.getSupSeq("ω+2","ε0*ω2"));
		FakeTest.map.set("ε0*ω^2", this.getSupSeq("ω+2"));
		FakeTest.map.set("ε0*(ω^2+1)", this.getSupSeq("ω+3","ε0"));
		FakeTest.map.set("ε0*ω^2*2", this.getSupSeq("ω+3","ε0*ω^2"));
		FakeTest.map.set("ε0*ω^3", this.getSupSeq("ω+3"));
		FakeTest.map.set("ε0*ω^ω", this.getSupSeq("ω2","ω2"));
		FakeTest.map.set("ε0*ω^ω+1", this.getSupSeq("ω2","ω2+1","ω2+1"));
		FakeTest.map.set("ε0*(ω^ω+1)", this.getSupSeq("ω2","ω2+1","ε0"));
		FakeTest.map.set("ε0*(ω^ω+ω)", this.getSupSeq("ω2","ω2+1","ε0*ω"));
		FakeTest.map.set("ε0*ω^ω2", this.getSupSeq("ω2","ω2+1","ε0*ω^ω"));
		FakeTest.map.set("ε0*ω^(ω+1)", this.getSupSeq("ω2","ω2+1"));
		FakeTest.map.set("ε0*ω^(ω+1)+1", this.getSupSeq("ω2","ω2+2","ω2+2"));
		FakeTest.map.set("ε0*(ω^(ω+1)+1)", this.getSupSeq("ω2","ω2+2","ε0"));
		FakeTest.map.set("ε0*ω^(ω+1)*2", this.getSupSeq("ω2","ω2+2","ε0*ω^(ω+1)"));
		FakeTest.map.set("ε0*ω^(ω+2)", this.getSupSeq("ω2","ω2+2"));
		FakeTest.map.set("ε0*ω^(ω+3)", this.getSupSeq("ω2","ω2+3"));
		FakeTest.map.set("ε0*ω^(ω2)", this.getSupSeq("ω2","ω3"));
		FakeTest.map.set("ε0*ω^(ω2+1)", this.getSupSeq("ω2","ω3+1"));
		FakeTest.map.set("ε0*ω^ω^2", this.getSupSeq("ω2","ω^2"));
		FakeTest.map.set("ε0*ω^ω^ω", this.getSupSeq("ω2","ω^ω"));
		FakeTest.map.set("ε0^2", this.getSupSeq("ω2","ε0"));
		FakeTest.map.set("ε0^ω", this.getSupSeq("ω2","ε0*ω"));
		FakeTest.map.set("ε0^ε0", this.getSupSeq("ω2","ε0^2"));
		FakeTest.map.set("ε1", this.getSupSeq("ω2"));
		FakeTest.map.set("ε1^2", this.getSupSeq("ω3","ε1"));
		FakeTest.map.set("ε1^ε1", this.getSupSeq("ω3","ε1^2"));
		FakeTest.map.set("ε(ω)", this.getSupSeq("ω^2","ω^2"));
		FakeTest.map.set("ε(ω)^2", this.getSupSeq("ω^2","ω^2+ω","ε(ω)"));
		FakeTest.map.set("ε(ω)^ε(ω)", this.getSupSeq("ω^2","ω^2+ω","ε(ω)^2"));
		FakeTest.map.set("ε(ω+1)", this.getSupSeq("ω^2","ω^2+ω"));
		FakeTest.map.set("ε(ω+1)^2", this.getSupSeq("ω^2","ω^2+ω2","ε(ω+1)"));
		FakeTest.map.set("ε(ω+1)^ε(ω+1)", this.getSupSeq("ω^2","ω^2+ω2","ε(ω+1)^2"));
		FakeTest.map.set("ε(ω2)", this.getSupSeq("ω^2","(ω^2)*2"));
		FakeTest.map.set("ε(ω3)", this.getSupSeq("ω^2","(ω^2)*3"));
		FakeTest.map.set("ε(ω^2)", this.getSupSeq("ω^2","ω^3"));
		FakeTest.map.set("ε(ω^2+1)", this.getSupSeq("ω^2","ω^3+ω"));
		FakeTest.map.set("ε(ω^2+ω)", this.getSupSeq("ω^2","ω^3+ω^2"));
		FakeTest.map.set("ε(ω^ω)", this.getSupSeq("ω^2","ω^ω"));
		FakeTest.map.set("ε(ω^ω+1)", this.getSupSeq("ω^2","ω^ω+ω"));
		FakeTest.map.set("ε(ω^(ω+1))", this.getSupSeq("ω^2","ω^(ω+1)"));
		FakeTest.map.set("ε(ω^(ω+1)+ω^ω)", this.getSupSeq("ω^2","ω^(ω+1)+ω^ω"));
		FakeTest.map.set("ε(ω^(ω+1)*2)", this.getSupSeq("ω^2","ω^(ω+1)*2"));
		FakeTest.map.set("ε(ω^(ω+1)*2+ω^ω)", this.getSupSeq("ω^2","ω^(ω+1)*2+ω^ω"));
		FakeTest.map.set("ε(ε0)", this.getSupSeq("ω^2","ε0"));
		FakeTest.map.set("ζ0", this.getSupSeq("ω^2"));
		FakeTest.map.set("ε(ζ0+1)", this.getSupSeq("ω^2+ω"));
		FakeTest.map.set("η0", this.getSupSeq("ω^3"));
		FakeTest.map.set("φ(ω,0)", this.getSupSeq("ω^ω","ω^ω"));
		FakeTest.map.set("Γ0", this.getSupSeq("ω^ω"));
		FakeTest.map.set("Γ0*2", this.getSupSeq("ω^ω+1","Γ0"));
		FakeTest.map.set("Γ0*ω", this.getSupSeq("ω^ω+1"));
		FakeTest.map.set("Γ0*ω^ω", this.getSupSeq("ω^ω+ω","ω^ω+ω"));
		FakeTest.map.set("Γ0*ε0", this.getSupSeq("ω^ω+ω","ε0"));
		FakeTest.map.set("Γ0^2", this.getSupSeq("ω^ω+ω","Γ0"));
		FakeTest.map.set("Γ0^Γ0", this.getSupSeq("ω^ω+ω","Γ0^2"));
		FakeTest.map.set("ε(Γ0+1)", this.getSupSeq("ω^ω+ω"));
		FakeTest.map.set("φ(ω,Γ0+1)", this.getSupSeq("ω^ω","ε0"));
		FakeTest.map.set("φ(ε(Γ0+1),0)", this.getSupSeq("(ω^ω)*2","ε(Γ0+1)"));
		FakeTest.map.set("SVO", this.getSupSeq("ω^ω^ω","ω^ω^ω"));
		FakeTest.map.set("LVO", this.getSupSeq("ω^ω^ω"));
		FakeTest.map.set("ψ(Ω_2)", this.getSupSeq("ε0","ε0"));
		FakeTest.map.set("ψ(Ω_3)", this.getSupSeq("ε0","ψ(Ω_2)"));
		FakeTest.map.set("ψ(Ω_ω)", this.getSupSeq("ε0"));
		FakeTest.map.set("ψ(Ω_ω*ω)", this.getSupSeq("ε0*ω","ε0*ω"));
		FakeTest.map.set("ψ(Ω_ω*ω2)", this.getSupSeq("ε0*ω","ε0*ω2"));
		FakeTest.map.set("ψ(Ω_ω*ω^2)", this.getSupSeq("ε0*ω","ε0*ω^2"));
		FakeTest.map.set("ψ(Ω_ω*ω^ω)", this.getSupSeq("ε0*ω","ε0*ω^ω"));
		FakeTest.map.set("ψ((Ω_ω)^2*ω)", this.getSupSeq("ε0*ω^2","ε0*ω^2"));
		FakeTest.map.set("ψ((Ω_ω)^2*ω2)", this.getSupSeq("ε0*ω^2","ε0*ω^2*2"));
		FakeTest.map.set("ψ((Ω_ω)^2*ω^2)", this.getSupSeq("ε0*ω^2","ε0*ω^3"));
		FakeTest.map.set("ψ((Ω_ω)^2*ω^ω)", this.getSupSeq("ε0*ω^2","ε0*ω^ω"));
		FakeTest.map.set("ψ((Ω_ω)^ω)", this.getSupSeq("ε0*ω^ω","ε0*ω^ω"));
		FakeTest.map.set("ψ((Ω_ω)^ω2)", this.getSupSeq("ε0*ω^ω","ε0*ω^ω2"));
		FakeTest.map.set("ψ((Ω_ω)^ω*ω)", this.getSupSeq("ε0*ω^ω","ε0*ω^(ω+1)","ε0*ω^(ω+1)"));
		FakeTest.map.set("ψ((Ω_ω)^(ω2))", this.getSupSeq("ε0*ω^ω","ε0*ω^(ω2)"));
		FakeTest.map.set("ψ((Ω_ω)^(ω^2))", this.getSupSeq("ε0*ω^ω","ε0*ω^ω^2"));
		FakeTest.map.set("ψ((Ω_ω)^(ω^ω))", this.getSupSeq("ε0*ω^ω","ε0*ω^ω^ω"));
		FakeTest.map.set("SHO", this.getSupSeq("ε(ω)","ε(ω)"));
		FakeTest.map.set("ψZ[ω^2](ω^(ω+1)+ω^ω)", this.getSupSeq("ω^2","ω^(ω+1)+ω^ω"));
		FakeTest.map.set("ψZ[ω^2](ω^(ω+1)*2)", this.getSupSeq("ω^2","(ω^(ω+1))*2"));
    }
}