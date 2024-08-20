import antlr4 from 'antlr4';

export default class FFFZErrorListener extends antlr4.error.ErrorListener {
    
    errors = [];

    syntaxError(recognizer, offendingSymbol, line, column, msg, e){
        this.errors.push("line " + line + ":" + column + " " + msg);
    }

}