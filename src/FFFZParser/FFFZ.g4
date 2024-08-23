grammar FFFZ;

// Top Level Description

root
    : fffz EOF
    ;

fffz
    : polynomial
    | PSIZ (LBRACKET fffz (COMMA fffz)* RBRACKET)? LPAREN fffz RPAREN
    ;
    
polynomial
    :   item (PLUS item)*
    ;
    
exponent
    :   factor
    |   OMEGA
    |   OMEGA POWER exponent
    |   LPAREN polynomial RPAREN 
    ;

item   
    :   factor
    |   OMEGA MUL? factor?
    |   OMEGA POWER exponent (MUL? factor)?
    |   LPAREN OMEGA POWER exponent RPAREN (MUL? factor)?
    ;
    
factor
    :   INTEGER_LITERAL 
    ; 
    
PSIZ
    :   '\u03C8Z' 
    ;  
    
EPSILON0
    :   '\u03B5' 
    ;         

OMEGA
    :   '\u03c9' 
    |   'w'
    ;
 
COMMA   
    :   ',' 
    ;
 
PLUS    
    :   '+' 
    ;
     
MUL 
    :   '*' 
    |   '×'
    ;
     
POWER   
    :   '^'
    ;

 
LPAREN
    :   '('
    ;
     
RPAREN  :   ')'
    ;
 
LBRACKET
    :   '['
    ;
 
RBRACKET
    :   ']'
    ;
 
INTEGER_LITERAL 
    :   Digit+ 
    ;   
 
Digit   
    :   '0'..'9'
    ;

/* Ignore white spaces */  
WS  
    :  (' '|'\r'|'\t'|'\u000C'|'\n') -> skip ;



