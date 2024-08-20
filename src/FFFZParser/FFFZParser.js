// Generated from ./FFFZ.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from 'antlr4';
import FFFZListener from './FFFZListener.js';
const serializedATN = [4,1,14,85,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,
2,5,7,5,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,5,1,22,8,1,10,1,12,1,25,9,1,
1,1,1,1,3,1,29,8,1,1,1,1,1,1,1,1,1,3,1,35,8,1,1,2,1,2,1,2,5,2,40,8,2,10,
2,12,2,43,9,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,54,8,3,1,4,1,4,1,4,
3,4,59,8,4,1,4,1,4,1,4,1,4,3,4,65,8,4,1,4,3,4,68,8,4,1,4,1,4,1,4,1,4,1,4,
1,4,3,4,76,8,4,1,4,3,4,79,8,4,3,4,81,8,4,1,5,1,5,1,5,0,0,6,0,2,4,6,8,10,
0,0,93,0,12,1,0,0,0,2,34,1,0,0,0,4,36,1,0,0,0,6,53,1,0,0,0,8,80,1,0,0,0,
10,82,1,0,0,0,12,13,3,2,1,0,13,14,5,0,0,1,14,1,1,0,0,0,15,35,3,4,2,0,16,
28,5,1,0,0,17,18,5,10,0,0,18,23,3,2,1,0,19,20,5,4,0,0,20,22,3,2,1,0,21,19,
1,0,0,0,22,25,1,0,0,0,23,21,1,0,0,0,23,24,1,0,0,0,24,26,1,0,0,0,25,23,1,
0,0,0,26,27,5,11,0,0,27,29,1,0,0,0,28,17,1,0,0,0,28,29,1,0,0,0,29,30,1,0,
0,0,30,31,5,8,0,0,31,32,3,2,1,0,32,33,5,9,0,0,33,35,1,0,0,0,34,15,1,0,0,
0,34,16,1,0,0,0,35,3,1,0,0,0,36,41,3,8,4,0,37,38,5,5,0,0,38,40,3,8,4,0,39,
37,1,0,0,0,40,43,1,0,0,0,41,39,1,0,0,0,41,42,1,0,0,0,42,5,1,0,0,0,43,41,
1,0,0,0,44,54,3,10,5,0,45,54,5,3,0,0,46,47,5,3,0,0,47,48,5,7,0,0,48,54,3,
6,3,0,49,50,5,8,0,0,50,51,3,4,2,0,51,52,5,9,0,0,52,54,1,0,0,0,53,44,1,0,
0,0,53,45,1,0,0,0,53,46,1,0,0,0,53,49,1,0,0,0,54,7,1,0,0,0,55,81,3,10,5,
0,56,58,5,3,0,0,57,59,3,10,5,0,58,57,1,0,0,0,58,59,1,0,0,0,59,81,1,0,0,0,
60,61,5,3,0,0,61,62,5,7,0,0,62,67,3,6,3,0,63,65,5,6,0,0,64,63,1,0,0,0,64,
65,1,0,0,0,65,66,1,0,0,0,66,68,3,10,5,0,67,64,1,0,0,0,67,68,1,0,0,0,68,81,
1,0,0,0,69,70,5,8,0,0,70,71,5,3,0,0,71,72,5,7,0,0,72,73,3,6,3,0,73,78,5,
9,0,0,74,76,5,6,0,0,75,74,1,0,0,0,75,76,1,0,0,0,76,77,1,0,0,0,77,79,3,10,
5,0,78,75,1,0,0,0,78,79,1,0,0,0,79,81,1,0,0,0,80,55,1,0,0,0,80,56,1,0,0,
0,80,60,1,0,0,0,80,69,1,0,0,0,81,9,1,0,0,0,82,83,5,12,0,0,83,11,1,0,0,0,
11,23,28,34,41,53,58,64,67,75,78,80];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class FFFZParser extends antlr4.Parser {

    static grammarFileName = "FFFZ.g4";
    static literalNames = [ null, "'\\u03C8Z'", "'\\u03B5'", "'\\u03C9'", 
                            "','", "'+'", null, "'^'", "'('", "')'", "'['", 
                            "']'" ];
    static symbolicNames = [ null, "PSIZ", "EPSILON0", "OMEGA", "COMMA", 
                             "PLUS", "MUL", "POWER", "LPAREN", "RPAREN", 
                             "LBRACKET", "RBRACKET", "INTEGER_LITERAL", 
                             "Digit", "WS" ];
    static ruleNames = [ "root", "fffz", "polynomial", "exponent", "item", 
                         "factor" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = FFFZParser.ruleNames;
        this.literalNames = FFFZParser.literalNames;
        this.symbolicNames = FFFZParser.symbolicNames;
    }



	root() {
	    let localctx = new RootContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, FFFZParser.RULE_root);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 12;
	        this.fffz();
	        this.state = 13;
	        this.match(FFFZParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	fffz() {
	    let localctx = new FffzContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, FFFZParser.RULE_fffz);
	    var _la = 0;
	    try {
	        this.state = 34;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 3:
	        case 8:
	        case 12:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 15;
	            this.polynomial();
	            break;
	        case 1:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 16;
	            this.match(FFFZParser.PSIZ);
	            this.state = 28;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===10) {
	                this.state = 17;
	                this.match(FFFZParser.LBRACKET);
	                this.state = 18;
	                this.fffz();
	                this.state = 23;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                while(_la===4) {
	                    this.state = 19;
	                    this.match(FFFZParser.COMMA);
	                    this.state = 20;
	                    this.fffz();
	                    this.state = 25;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                }
	                this.state = 26;
	                this.match(FFFZParser.RBRACKET);
	            }

	            this.state = 30;
	            this.match(FFFZParser.LPAREN);
	            this.state = 31;
	            this.fffz();
	            this.state = 32;
	            this.match(FFFZParser.RPAREN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	polynomial() {
	    let localctx = new PolynomialContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, FFFZParser.RULE_polynomial);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 36;
	        this.item();
	        this.state = 41;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===5) {
	            this.state = 37;
	            this.match(FFFZParser.PLUS);
	            this.state = 38;
	            this.item();
	            this.state = 43;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	exponent() {
	    let localctx = new ExponentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, FFFZParser.RULE_exponent);
	    try {
	        this.state = 53;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 44;
	            this.factor();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 45;
	            this.match(FFFZParser.OMEGA);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 46;
	            this.match(FFFZParser.OMEGA);
	            this.state = 47;
	            this.match(FFFZParser.POWER);
	            this.state = 48;
	            this.exponent();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 49;
	            this.match(FFFZParser.LPAREN);
	            this.state = 50;
	            this.polynomial();
	            this.state = 51;
	            this.match(FFFZParser.RPAREN);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	item() {
	    let localctx = new ItemContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, FFFZParser.RULE_item);
	    var _la = 0;
	    try {
	        this.state = 80;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 55;
	            this.factor();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 56;
	            this.match(FFFZParser.OMEGA);
	            this.state = 58;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===12) {
	                this.state = 57;
	                this.factor();
	            }

	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 60;
	            this.match(FFFZParser.OMEGA);
	            this.state = 61;
	            this.match(FFFZParser.POWER);
	            this.state = 62;
	            this.exponent();
	            this.state = 67;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===6 || _la===12) {
	                this.state = 64;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===6) {
	                    this.state = 63;
	                    this.match(FFFZParser.MUL);
	                }

	                this.state = 66;
	                this.factor();
	            }

	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 69;
	            this.match(FFFZParser.LPAREN);
	            this.state = 70;
	            this.match(FFFZParser.OMEGA);
	            this.state = 71;
	            this.match(FFFZParser.POWER);
	            this.state = 72;
	            this.exponent();
	            this.state = 73;
	            this.match(FFFZParser.RPAREN);
	            this.state = 78;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===6 || _la===12) {
	                this.state = 75;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(_la===6) {
	                    this.state = 74;
	                    this.match(FFFZParser.MUL);
	                }

	                this.state = 77;
	                this.factor();
	            }

	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	factor() {
	    let localctx = new FactorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, FFFZParser.RULE_factor);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 82;
	        this.match(FFFZParser.INTEGER_LITERAL);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

FFFZParser.EOF = antlr4.Token.EOF;
FFFZParser.PSIZ = 1;
FFFZParser.EPSILON0 = 2;
FFFZParser.OMEGA = 3;
FFFZParser.COMMA = 4;
FFFZParser.PLUS = 5;
FFFZParser.MUL = 6;
FFFZParser.POWER = 7;
FFFZParser.LPAREN = 8;
FFFZParser.RPAREN = 9;
FFFZParser.LBRACKET = 10;
FFFZParser.RBRACKET = 11;
FFFZParser.INTEGER_LITERAL = 12;
FFFZParser.Digit = 13;
FFFZParser.WS = 14;

FFFZParser.RULE_root = 0;
FFFZParser.RULE_fffz = 1;
FFFZParser.RULE_polynomial = 2;
FFFZParser.RULE_exponent = 3;
FFFZParser.RULE_item = 4;
FFFZParser.RULE_factor = 5;

class RootContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FFFZParser.RULE_root;
    }

	fffz() {
	    return this.getTypedRuleContext(FffzContext,0);
	};

	EOF() {
	    return this.getToken(FFFZParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.enterRoot(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.exitRoot(this);
		}
	}


}



class FffzContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FFFZParser.RULE_fffz;
    }

	polynomial() {
	    return this.getTypedRuleContext(PolynomialContext,0);
	};

	PSIZ() {
	    return this.getToken(FFFZParser.PSIZ, 0);
	};

	LPAREN() {
	    return this.getToken(FFFZParser.LPAREN, 0);
	};

	fffz = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FffzContext);
	    } else {
	        return this.getTypedRuleContext(FffzContext,i);
	    }
	};

	RPAREN() {
	    return this.getToken(FFFZParser.RPAREN, 0);
	};

	LBRACKET() {
	    return this.getToken(FFFZParser.LBRACKET, 0);
	};

	RBRACKET() {
	    return this.getToken(FFFZParser.RBRACKET, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(FFFZParser.COMMA);
	    } else {
	        return this.getToken(FFFZParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.enterFffz(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.exitFffz(this);
		}
	}


}



class PolynomialContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FFFZParser.RULE_polynomial;
    }

	item = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ItemContext);
	    } else {
	        return this.getTypedRuleContext(ItemContext,i);
	    }
	};

	PLUS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(FFFZParser.PLUS);
	    } else {
	        return this.getToken(FFFZParser.PLUS, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.enterPolynomial(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.exitPolynomial(this);
		}
	}


}



class ExponentContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FFFZParser.RULE_exponent;
    }

	factor() {
	    return this.getTypedRuleContext(FactorContext,0);
	};

	OMEGA() {
	    return this.getToken(FFFZParser.OMEGA, 0);
	};

	POWER() {
	    return this.getToken(FFFZParser.POWER, 0);
	};

	exponent() {
	    return this.getTypedRuleContext(ExponentContext,0);
	};

	LPAREN() {
	    return this.getToken(FFFZParser.LPAREN, 0);
	};

	polynomial() {
	    return this.getTypedRuleContext(PolynomialContext,0);
	};

	RPAREN() {
	    return this.getToken(FFFZParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.enterExponent(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.exitExponent(this);
		}
	}


}



class ItemContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FFFZParser.RULE_item;
    }

	factor() {
	    return this.getTypedRuleContext(FactorContext,0);
	};

	OMEGA() {
	    return this.getToken(FFFZParser.OMEGA, 0);
	};

	POWER() {
	    return this.getToken(FFFZParser.POWER, 0);
	};

	exponent() {
	    return this.getTypedRuleContext(ExponentContext,0);
	};

	MUL() {
	    return this.getToken(FFFZParser.MUL, 0);
	};

	LPAREN() {
	    return this.getToken(FFFZParser.LPAREN, 0);
	};

	RPAREN() {
	    return this.getToken(FFFZParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.enterItem(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.exitItem(this);
		}
	}


}



class FactorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = FFFZParser.RULE_factor;
    }

	INTEGER_LITERAL() {
	    return this.getToken(FFFZParser.INTEGER_LITERAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.enterFactor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof FFFZListener ) {
	        listener.exitFactor(this);
		}
	}


}




FFFZParser.RootContext = RootContext; 
FFFZParser.FffzContext = FffzContext; 
FFFZParser.PolynomialContext = PolynomialContext; 
FFFZParser.ExponentContext = ExponentContext; 
FFFZParser.ItemContext = ItemContext; 
FFFZParser.FactorContext = FactorContext; 
