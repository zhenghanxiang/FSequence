import antlr4 from 'antlr4';
import FFFZLexer from "./FFFZParser/FFFZLexer.js"
import FFFZParser from "./FFFZParser/FFFZParser.js"
import FFFZ2SeqListener from "./FFFZParser/FFFZ2SeqListener.js"
import FFFZErrorListener from "./FFFZParser/FFFZErrorListener.js"
//import FFFZErrorStrategy from "./FFFZParser/FFFZErrorStrategy.js"
import CNFNode from "./FFFZParser/CNFNode.js"
import CNFUtil from "./FFFZParser/CNFUtil.js"
import FSeq from "./FSeq.js"
import CompositeDecider from "./compatible/CompositeDecider.js"


export default class FSeqConverter {
    
    static fffz2FSeq(express) {
        const input = new antlr4.InputStream(express);
        const lexer = new FFFZLexer(input);
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new FFFZParser(tokens);
        const errorlistener = new FFFZErrorListener()
        parser.removeErrorListeners();
        parser.addErrorListener(errorlistener);
        const expr = parser.root();
        const listener = new FFFZ2SeqListener();
        antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, expr);
        const seq = listener.getSeq(expr);
        return seq;
    }

    static validateFFFZ(express) {
        const errorlistener = new FFFZErrorListener();
        //const errorStrategy = new FFFZErrorStrategy();
        const input = new antlr4.InputStream(express);
        const lexer = new FFFZLexer(input);
        lexer.addErrorListener(errorlistener)
        //lexer._errHandler = errorStrategy;
        const tokens = new antlr4.CommonTokenStream(lexer);
        const parser = new FFFZParser(tokens);
        parser.addErrorListener(errorlistener);
        //parser._errHandler = errorStrategy;
        parser.root();
        return errorlistener.errors;
    }

    static validateSeq(seq) {
        let errors = [];
        for (let i = 1; i < seq.length; i++) {
            if(seq[i]<=0 || seq[i]-seq[i-1]>1){
                errors.push("fseq Input validate fail !")
            }
        }    
        return errors;
    }

    static validateFake(seq) {
        let errors = [];
        const subSeqs = FSeq.getSubSeq(seq);
        let temp_subSeqs = [];
        let temp_subSeqStrs = [];
        temp_subSeqs.push(subSeqs[0]);
        temp_subSeqStrs.push(this.fSeq2FFFZ(subSeqs[0],0))
        for (let i = 1; i < subSeqs.length-1; i++) {
            temp_subSeqs.push(subSeqs[i]);
            temp_subSeqStrs.push(this.fSeq2FFFZ(subSeqs[i],0))
            if(CompositeDecider.compareL(temp_subSeqs)<=0){
                errors.push(`fake validate fail [${temp_subSeqStrs}] not exist !`);
            }
        }    
        return errors;
    }
    
    static fSeq2FFFZ(seq, n) {
        if (seq == null) {
            return "0";
        }
        if (seq.length === 0) {
            return "0";
        }
        if (n <= 0) {
            if (FSeq.isOne(seq)) {
                return "1";
            }
            const direct = this.convertCNFStr(seq);
            if (direct != null) {
                return direct;
            }
        }
        const subSeqs = FSeq.getSubSeq(seq);
        let builder = "ψZ";
        if (subSeqs.length === 1) {
            builder += "(";
            const a = this.fSeq2FFFZ(subSeqs[subSeqs.length - 1], n - 1);
            builder += a;
            builder += ")";
            return builder;
        }
        builder += "[";
        for (let i = 0; i < subSeqs.length - 2; i++) {
            const convert = this.fSeq2FFFZ(subSeqs[i], n - 1);
            builder += convert + ",";
        }
        const b = this.fSeq2FFFZ(subSeqs[subSeqs.length - 2], n - 1);
        builder += b + "](";
        const a = this.fSeq2FFFZ(subSeqs[subSeqs.length - 1], n - 1);
        builder += a + ")";
        return builder;
    }

    static convertCNFStr(seq) {
        const epsilon0 = FSeq.getEpsilon0();
        if (FSeq.compare(seq, epsilon0) > 0) {
            return null;
        }
        if (FSeq.compare(seq, epsilon0) === 0) {
            return "ε0";
        }
        const cnf = this.convertToCNF(seq);
        return CNFUtil.toString(cnf);
    }
    
    static convertToCNF(seq) {
        const convertToInteger = this.convertToInteger(seq);
        if (convertToInteger != null) {
            const result = [];
            result.push(new CNFNode(null, convertToInteger));
            return result;
        }
        const subSeq = FSeq.getSubSeq(seq);
        const a = subSeq[subSeq.length - 1];
        const b = subSeq.length > 1 ? subSeq[subSeq.length - 2] : null;
        const cnf_a = this.convertToCNF(a);
        if (FSeq.isLimit(b)) {
            const result = [];
            result.push(new CNFNode(cnf_a, 1));
            return result;
        }
        const pre_b = FSeq.expand(b);
        const cnf_pre_b = this.convertToCNF(pre_b);
        const cnf2 = CNFUtil.minus(cnf_a, cnf_pre_b);
        const cnf1 = this.convertToCNF(FSeq.getSupSeq1(subSeq, subSeq.length - 2, pre_b));
        return CNFUtil.add1(cnf1, cnf2);
    }
    
    static convertToInteger(seq) {
        if (FSeq.isEmpty(seq)) {
            return 0;
        }
        if (FSeq.isOne(seq)) {
            return 1;
        }
        const oumiga = FSeq.getOumiga();
        if (FSeq.compare(seq, oumiga) >= 0) {
            return null;
        }
        let result = 0;
        let tmpSeq = seq;
        while (true) {
            if (FSeq.isLimit(tmpSeq)) {
                return FSeq.isEmpty(tmpSeq) ? result : null;
            }
            tmpSeq = FSeq.expand(tmpSeq);
            result++;
        }
    }
    

}