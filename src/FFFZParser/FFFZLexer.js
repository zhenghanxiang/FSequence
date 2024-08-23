// Generated from ./FFFZ.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from 'antlr4';


const serializedATN = [4,0,14,63,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,
4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,
12,2,13,7,13,1,0,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,
1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,4,11,54,8,11,11,11,12,11,55,1,12,
1,12,1,13,1,13,1,13,1,13,0,0,14,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,
19,10,21,11,23,12,25,13,27,14,1,0,3,2,0,119,119,969,969,2,0,42,42,215,215,
3,0,9,10,12,13,32,32,63,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,
0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,
0,0,0,21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,1,29,1,0,0,0,3,32,
1,0,0,0,5,34,1,0,0,0,7,36,1,0,0,0,9,38,1,0,0,0,11,40,1,0,0,0,13,42,1,0,0,
0,15,44,1,0,0,0,17,46,1,0,0,0,19,48,1,0,0,0,21,50,1,0,0,0,23,53,1,0,0,0,
25,57,1,0,0,0,27,59,1,0,0,0,29,30,5,968,0,0,30,31,5,90,0,0,31,2,1,0,0,0,
32,33,5,949,0,0,33,4,1,0,0,0,34,35,7,0,0,0,35,6,1,0,0,0,36,37,5,44,0,0,37,
8,1,0,0,0,38,39,5,43,0,0,39,10,1,0,0,0,40,41,7,1,0,0,41,12,1,0,0,0,42,43,
5,94,0,0,43,14,1,0,0,0,44,45,5,40,0,0,45,16,1,0,0,0,46,47,5,41,0,0,47,18,
1,0,0,0,48,49,5,91,0,0,49,20,1,0,0,0,50,51,5,93,0,0,51,22,1,0,0,0,52,54,
3,25,12,0,53,52,1,0,0,0,54,55,1,0,0,0,55,53,1,0,0,0,55,56,1,0,0,0,56,24,
1,0,0,0,57,58,2,48,57,0,58,26,1,0,0,0,59,60,7,2,0,0,60,61,1,0,0,0,61,62,
6,13,0,0,62,28,1,0,0,0,2,0,55,1,6,0,0];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class FFFZLexer extends antlr4.Lexer {

    static grammarFileName = "FFFZ.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'\\u03C8Z'", "'\\u03B5'", null, "','", "'+'", 
                         null, "'^'", "'('", "')'", "'['", "']'" ];
	static symbolicNames = [ null, "PSIZ", "EPSILON0", "OMEGA", "COMMA", "PLUS", 
                          "MUL", "POWER", "LPAREN", "RPAREN", "LBRACKET", 
                          "RBRACKET", "INTEGER_LITERAL", "Digit", "WS" ];
	static ruleNames = [ "PSIZ", "EPSILON0", "OMEGA", "COMMA", "PLUS", "MUL", 
                      "POWER", "LPAREN", "RPAREN", "LBRACKET", "RBRACKET", 
                      "INTEGER_LITERAL", "Digit", "WS" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.atn.PredictionContextCache());
    }
}

FFFZLexer.EOF = antlr4.Token.EOF;
FFFZLexer.PSIZ = 1;
FFFZLexer.EPSILON0 = 2;
FFFZLexer.OMEGA = 3;
FFFZLexer.COMMA = 4;
FFFZLexer.PLUS = 5;
FFFZLexer.MUL = 6;
FFFZLexer.POWER = 7;
FFFZLexer.LPAREN = 8;
FFFZLexer.RPAREN = 9;
FFFZLexer.LBRACKET = 10;
FFFZLexer.RBRACKET = 11;
FFFZLexer.INTEGER_LITERAL = 12;
FFFZLexer.Digit = 13;
FFFZLexer.WS = 14;



