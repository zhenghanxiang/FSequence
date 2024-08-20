export default class CNFNode {
    constructor(expList = [], param = null) {
        this.expList = expList;
        this.param = param;
    }

    getExpList() {
        return this.expList;
    }

    setExpList(expList) {
        this.expList = expList;
    }

    getParam() {
        return this.param;
    }

    setParam(param) {
        this.param = param;
    }

    toString() {
        if (this.param === null || this.param === 0) {
            return "0";
        }
        if (this.expList === null || this.expList.length === 0) {
            return this.param.toString();
        }
        let stringBuilder = [];
        if (this.expList.length === 1) {
            let expStr = this.expList[0].toString();
            if (expStr === "1") {
                stringBuilder.push("ω");
                if (this.param > 1) {
                    stringBuilder.push(this.param);
                }
                return stringBuilder.join('');
            }
        }
        if (this.param > 1) {
            stringBuilder.push("(");
        }

        stringBuilder.push("ω^");
        if (this.expList.length > 1) {
            stringBuilder.push("(");
        }else if(this.expList.length === 1){
            if (this.expList[0].getExpList() !== null 
                && this.expList[0].getExpList().length > 0 
                && this.expList[0].getParam() > 1) {
                    stringBuilder.push("(");
            }    
        }
        for (let node of this.expList) {
            stringBuilder.push(node.toString());
            stringBuilder.push("+");
        }
        stringBuilder.pop(); // Remove the last "+"
        if (this.expList.length > 1) {
            stringBuilder.push(")");
        }else if(this.expList.length === 1){
            if (this.expList[0].getExpList() !== null 
                && this.expList[0].getExpList().length > 0 
                && this.expList[0].getParam() > 1) {
                    stringBuilder.push(")");
            }    
        }
        if (this.param > 1) {
            stringBuilder.push(")*");
            stringBuilder.push(this.param);
        }
        return stringBuilder.join('');
    }
}