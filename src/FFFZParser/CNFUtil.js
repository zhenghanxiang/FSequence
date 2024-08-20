import CNFNode from "./CNFNode.js";

export default class CNFUtil {
    
    static minus(cnf1, cnf2) {
        const result = [];
        let startIndex = 0;
        for (let i = 0; i < cnf2.length && i < cnf1.length; i++) {
            const node1 = cnf1[i];
            const node2 = cnf2[i];
            const compareExp = this.compare1(node1.getExpList(), node2.getExpList());
            const compareParam = node1.getParam() - node2.getParam();
            if (compareExp === 0 && compareParam === 0) {
                startIndex = i + 1;
                continue;
            }
            if (compareExp === 0 && compareParam > 0) {
                startIndex = i + 1;
                result.push(new CNFNode(node1.getExpList(), node1.getParam() - node2.getParam()));
                break;
            }
            if (compareExp > 0) {
                startIndex = i + 1;
                result.push(node1);
                break;
            }
            throw new Error("不合法：不支持小序数减大序数");
        }
        for (let i = startIndex; i < cnf1.length; i++) {
            result.push(cnf1[i]);
        }
        return result;
    }
    
    static add0(cnf1, node) {
        let result = [];
        for (const cnfNode of cnf1) {
            result = this.addIn(result, cnfNode);
        }
        result = this.addIn(result, node);
        return result;
    }
    
    static add1(cnf1, cnf2) {
        let result = [];
        for (const cnfNode of cnf1) {
            result = this.addIn(result, cnfNode);
        }
        for (const cnfNode of cnf2) {
            result = this.addIn(result, cnfNode);
        }
        return result;
    }
    
    static addIn(cnf1, node) {
        const result = [];
        if (cnf1.length === 0) {
            if (node != null) {
                result.push(node);
            }
            return result;
        }
        for (const cnfNode1 of cnf1) {
            const compareExp = this.compare1(cnfNode1.getExpList(), node.getExpList());
            if (compareExp === 0) {
                result.push(new CNFNode(cnfNode1.getExpList(), cnfNode1.getParam() + node.getParam()));
                return result;
            }
            if (compareExp < 0) {
                result.push(node);
                return result;
            }
            if (compareExp > 0) {
                result.push(cnfNode1);
            }
        }
        result.push(node);
        return result;
    }
    
    static compare0(node1, node2) {
        const param1 = node1.getParam();
        const param2 = node2.getParam();
        if (param1 === 0 || param2 === 0) {
            return param1 !== 0 ? 1 : param2 !== 0 ? -1 : 0;
        }
        const expList1 = node1.getExpList();
        const expList2 = node2.getExpList();
        const compare = this.compare1(expList1, expList2);
        if (compare === 0) {
            return param1 - param2;
        }
        return compare;
    }
    
    static compare1(cnf1, cnf2) {
        if (cnf1 == null) {
            cnf1 = [];
        }
        if (cnf2 == null) {
            cnf2 = [];
        }
        for (let i = 0; i < cnf1.length && i < cnf2.length; i++) {
            const compare = this.compare0(cnf1[i], cnf2[i]);
            if (compare === 0) {
                continue;
            }
            return compare;
        }
        return cnf1.length > cnf2.length ? 1 : cnf1.length < cnf2.length ? -1 : 0;
    }
    
    static toString(cnf) {
        let stringBuilder = '';
        for (const node of cnf) {
            stringBuilder += node.toString() + '+';
        }
        return stringBuilder.slice(0, -1);
    }
}