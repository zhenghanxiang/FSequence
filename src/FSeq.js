export default class FSeq {
    
    static N = 3;
    static M = 1;

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
            return this.getSupSeq0(a);
        }
        /*
         * If [#,b,a] is compatible, expand to [#,b,a]([#,b,a](...[#,b,a](a)...))
         * If [#,b,a] is not compatible
         *     If a == b, expand to[#](expand(a))
         *     If a != b, expand to [#,b](expand(a))
         */
        if ((this.isEmpty(a) && this.isEmpty(b)) || this.compareL(a, b) < 0) {
            let result = this.getSupSeq1(subSeqs, subSeqs.length, a);
            for (let i = 0; i < this.N; i++) {
                result = this.getSupSeq1(subSeqs, subSeqs.length, result);
            }
            return result;
        } else {
            let retainLength = subSeqs.length - 1;
            if (this.compare(a, b) === 0) {
                retainLength = subSeqs.length - 2;
            }
            const newA = this.expand(a);
            return this.getSupSeq1(subSeqs, retainLength, newA);
        }
    }

    static compareL(seq1, seq2) {
        return this.compareL1(seq1, seq2, true, true);
    }

    static compareL1(seq1, seq2, extendcheck1, extendcheck2) {
        if (this.isEmpty(seq1) || this.isEmpty(seq2)) {
            return !this.isEmpty(seq1) ? -1 : !this.isEmpty(seq2) ? 1 : 0;
        }

        if (!this.isLimit(seq1) && !this.isLimit(seq2)) {
            return 0;
        }
        if (!this.isLimit(seq1) && this.isLimit(seq2)) {
            return -1;
        }
        if (this.isLimit(seq1) && !this.isLimit(seq2)) {
            return 1;
        }

        const subSeqs1 = this.getSubSeq(seq1);
        const subSeqs2 = this.getSubSeq(seq2);

        //如果fffz表示为ψZ[#,b](a)，假设它的等级，完全由b和a决定;

        const a1 = subSeqs1[subSeqs1.length - 1];
        const b1 = subSeqs1.length > 1 ? subSeqs1[subSeqs1.length - 2] : null;

        const a2 = subSeqs2[subSeqs2.length - 1];
        const b2 = subSeqs2.length > 1 ? subSeqs2[subSeqs2.length - 2] : null;

       /*  
        *   如果level(a)<level(b) ;level(ψZ[#,b](a)) = level(ψZ(a))
        *   如果level(a)>=level(b) ;
        *       如果 level(a) >= level(ψZ(b)) 则 level(ψZ[#,b](a)) = level(a)
        *       如果 b是后继
        *               如果 level(ψZ(b)) > level(a)>=level(ψZ(b的前继))  则 level(ψZ[#,b](a)) = level(ψZ(b的前继))
        *       否则  level(ψZ[#,b](a)) < level(ψZ(b))  且 level(ψZ[#,b](a)) 大于任何level(ψZ(b的前继))
        */

        const compareL_a1_b1 = this.compareL(a1, b1);
        const compareL_a2_b2 = this.compareL(a2, b2);
        const compareL_b1_b2 = this.compareL(b1, b2);

        if ((compareL_a1_b1 < 0 && compareL_a2_b2 < 0) || compareL_b1_b2 === 0) {
            return this.compareL2(a1, a2);
        } else if (compareL_a1_b1 < 0 && compareL_a2_b2 >= 0) {
            if(this.isLimit(a1) && extendcheck1) {
                /*
                 *  按a1为“真”，a2为“伪” 的情况时 走特殊规则； fffz 参数的真伪可以作为一个判定条件，来源@Arcahv 2024-8-16 11:59
                 *  compareL(ψZ(a1),ψZ[b2](a2)) = compareL(ψZ(a1),a2))
                 *  例如 ε0 = ψZ(ω)  ε(ω) = ψZ[ω^2](W^2)  compareL(ε0 ,ε(ω)) = compareL(ε0 ,ω^2) 
                 * 
                 */
                extendcheck1 = false;
                let tempSeq2 = seq2;
                while(true) {
                    const tempSubSeqs2 = this.getSubSeq(tempSeq2);
                    const tempA2 = tempSubSeqs2[tempSubSeqs2.length-1];
                    const tempA2SubSeqs = this.getSubSeq(tempA2);
                    if(tempA2SubSeqs.length==1) {
                        return this.compareL1(seq1, tempA2, false, true);
                    }else {
                        tempSeq2 = tempA2;
                    }
                }
            }
            //如果level(a2)>=level(b2) ;
            if (this.compareL(a2, this.getSupSeq0(b2)) >= 0) { 
                //[ε0*(ω+1),ε0*ω*2],[ε0*(ω+1),ψ(Ω_ω*ω^ω)],[ε0*(ω^ω+1),ψ((Ω_ω)^ω)] 这几种情况会用到此规则
                /*
                 * 如果 level(a2) >= level(ψZ(b2)) 则 level(ψZ[#,b2](a2)) = level(a2)
                 * 在这里compareL1(ψZ[#,b1](a1),ψZ[#,b2](a2)) = ompareL1(seq1, a2）
                 */
                return this.compareL1(seq1, a2, extendcheck1, true);
            } else {
                //如果 level(a2) < level(ψZ(b2))               
                if(!this.isLimit(b2)) {
                    //如果 b是后继
					const b2_pre = this.expand(b2);
					if(this.compareL(a2, this.getSupSeq0(b2_pre))>=0) {
                        /*
                         * 如果 level(ψZ(b)) > level(a)>=level(ψZ(b的前继))  则 level(ψZ[#,b](a)) = level(ψZ(b的前继))
                         * 在这里level(ψZ[#,b1](a1)) = level(ψZ(a1)) 以及 level(ψZ[#,b2](a2)) = level(ψZ(b2_pre)) 
                         * cmpareL1(ψZ[#,b1](a1), ψZ[#,b2](a2) = ompareL1(ψZ(a1), ψZ(b2_pre)) = ompareL1(a1, b2_pre);
						 */
                         return this.compareL2(a1, b2_pre);
					} else {
                        // 类似于 加法平移规则，来源@一只绵羊2333 2024-8-16 11:59 但乘法，指数情况还没考虑？，更高阶欲运算和高阶函数该怎么办？怎么推广到一般情况？
                        // 其实我理解的fffz除了fake之外，只加入apply（作用）的概念，在这个基础上定义后继，加法等运算，类似于λ演算。
						return this.compareL1(seq1, a2, extendcheck1, true);
					}
				}
                /*
                 *如果 level(a2) < level(ψZ(b2)) , b不是后继
                 *否则  level(ψZ[#,b2](a2)) < level(ψZ(b2))  且 level(ψZ[#,b2](a2)) 大于level(ψZ[b2](b2))
                 */
                if (this.compareL(a1, b2) === 0) {
                    /*
                     * 如果level(a1)==level(b2) 则 level(ψZ(a1）)==level(ψZ(b2)) 
                     * 因level(a1)<level(b1),则level(ψZ[#,b1](a1)) = level(ψZ(a1))
                     * compareL1(ψZ[#,b1](a1), ψZ[#,b2](a2))  = compareL1(ψZ(a1), ψZ[#,b2](a2))  = compareL1(ψZ(b2), ψZ[#,b2](a2))>0
                     */
                    return 1;
                } else {
                    /*
                     *  如果level(a1)>level(b2)则level(ψZ[#,b1](a1))>level(ψZ(b2))>level(ψZ[#,b2](a2))
                     *  如果level(a1)<level(b2)则level(ψZ[#,b1](a1))< level(ψZ[b2](b2))<ψZ[#,b2](a2))
                     *  因此 compareL1(ψZ[#,b1](a1), ψZ[#,b2](a2)) = ompareL(a1, b2)
                     */
                    return this.compareL(a1, b2);
                }
            }
        } else if (compareL_a1_b1 >= 0 && compareL_a2_b2 < 0) {
            //为上面的镜像情况
            if(this.isLimit(a2) && extendcheck2) {
                extendcheck2 = false;
                let tempSeq1 = seq1;
                while(true) {
                    const tempSubSeqs1 = this.getSubSeq(tempSeq1);
                    const tempA1 = tempSubSeqs1[tempSubSeqs1.length-1];
                    const tempA1SubSeqs = this.getSubSeq(tempA1);
                    if(tempA1SubSeqs.length==1) {
                        return this.compareL1(tempA1, seq2, true, false);
                    }else {
                        tempSeq1 = tempA1;
                    }
                }
            }
            if (this.compareL(a1, this.getSupSeq0(b1)) >= 0) {
                return this.compareL1(a1, seq2, true, extendcheck2);
            } else {
                if(!this.isLimit(b1)) {
					const b1_pre = this.expand(b1);
					if(this.compareL(a1, this.getSupSeq0(b1_pre))>=0) {
						return this.compareL2(b1_pre, a2);
					}else {
						return this.compareL1(a1, seq2, true, extendcheck2);
					}
				}
                if (this.compareL(b1, a2) === 0) {
                    return -1;
                } else {
                    return this.compareL(b1, a2);
                }
            }
        } else if (compareL_a1_b1 >= 0 && compareL_a2_b2 >= 0) {
            if (this.compareL(a1, this.getSupSeq0(b1)) >= 0 && this.compareL(a2, this.getSupSeq0(b2)) >= 0) {
                /*
                 * 如果 level(a1) >= level(ψZ(b1)) 则 level(ψZ[#,b1](a1)) = level(a1)
                 * 如果 level(a2) >= level(ψZ(b2)) 则 level(ψZ[#,b2](a2)) = level(a2)
                 * 在这里compareL1(ψZ[#,b1](a1),ψZ[#,b2](a2)) = ompareL1(a1, a2）
                 */
                return this.compareL(a1, a2);
            } else if (this.compareL(a1, this.getSupSeq0(b1)) >= 0) {
                /*
                 * 如果 level(a1) >= level(ψZ(b1)) 则 level(ψZ[#,b1](a1)) = level(a1)
                 * 在这里compareL1(ψZ[#,b1](a1),ψZ[#,b2](a2)) = ompareL1(a1, ψZ[#,b2](a2)）
                 */
                return this.compareL1(a1, seq2, true, extendcheck2);
            } else if (this.compareL(a2, this.getSupSeq0(b2)) >= 0) {
                //为上面的镜像情况
                return this.compareL1(seq1, a2, extendcheck1, true);
            } else {
                /*
                    *  如果b1是后继  那么 level(b2)>level(b1) ==> level(ψZ[b2](b2))>level(ψZ(b1)) 
                    *                    level(ψZ[b2](a2)) >= level(ψZ[b2](b2))> level(ψZ(b1)) > level(ψZ[b1](a1)) 
                    *  如果b1是后继  为上面的镜像情况
                    *  如果b1,b2都不是后继
                    *          如果 level(b1)>level(b2) ==> level(ψZ[b1](a1)) >= level(ψZ[b1](b1)) > level(ψZ(b2)) > level(ψZ[b2](b2))
                    *          如果 level(b1)>level(b2)  为上面镜像情况；
                    */  
                return compareL_b1_b2;
            }
        }
        return 0;
    }

    static compareL2(seq1, seq2) {
		if(!this.isLimit(seq1)&&!this.isLimit(seq2)) {
			const successorPart1 = this.getSuccessorPartIntValue(seq1);
			const successorPart2 = this.getSuccessorPartIntValue(seq2);
			return successorPart1 - successorPart2;
		}else {
			return this.compareL(seq1, seq2);
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
    
    static getSuccessorPartIntValue(seq) {
        let result = 0;
        let tmpSeq = seq;
        while (true) {
            if (this.isLimit(tmpSeq)) {
                return result;
            }
            tmpSeq = this.expand(tmpSeq);
            result++;
        }
    }
    
    static getLimitPart(seq) {
        let result = seq;
        while (true) {
            if (this.isLimit(result)) {
                return result;
            }
            result = this.expand(result);
        }
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
        if (seq == null || seq.length < this.M) {
            return false;
        }
        for (let i = 0; i < this.M + 1 && i < seq.length; i++) {
            if (seq[i] !== 1) {
                return false;
            }
        }
        return true;
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
        const one = new Array(this.M);
        for (let i = 0; i < this.M; i++) {
            one[i] = 1;
        }
        return one;
    }
    
    static getOumiga() {
        const m = FSeq.M;
        const result = new Array(2 * m);
        for (let i = 0; i < m; i++) {
            result[i] = 1;
            result[i + m] = 2;
        }
        return result;
    }
    
    static getEpsilon0() {
        const m = FSeq.M;
        const result = new Array(3 * m);
        for (let i = 0; i < m; i++) {
            result[i] = 1;
            result[i + m] = 2;
            result[i + m * 2] = 3;
        }
        return result;
    }

    static getSuccessor(seq) {
		if (this.isEmpty(seq)) {
			return this.getOne();
		}
		if (this.isOne(seq)) {
			return this.getSupSeq0(seq, seq);
		}
		const subSeq = this.getSubSeq(seq);
		const successor = this.getSuccessor(subSeq[subSeq.length - 1]);
		if (this.isLimit(seq)) {
			return this.getSupSeq1(subSeq, subSeq.length - 1, successor, successor);
		} else {
			return this.getSupSeq1(subSeq, subSeq.length - 1, successor);
		}
	}

	static getLiftCount(seq) {
		let count = seq.length;
		for (let i = 0; i < seq.length; i++) {
			if (seq[i] === i + 1) {
				continue;
			}
			if (seq[i] - 1 < count) {
				count = seq[i] - 1;
			}
		}
		return count;
	}
}