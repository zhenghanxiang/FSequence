import antlr4 from 'antlr4';


export default class FFFZErrorStrategy extends antlr4.error.DefaultErrorStrategy {
    
    reportError(recognizer, e) {
        // if we've already reported an error and have not matched a token
        // yet successfully, don't report any errors.
        if (this.inErrorRecoveryMode(recognizer)) {
            return; // don't report spurious errors
        }
        this.beginErrorCondition(recognizer);
        if (e instanceof antlr4.error.NoViableAltException) {
            this.reportNoViableAlternative(recognizer, e);
        } else if (e instanceof antlr4.error.InputMismatchException) {
            this.reportInputMismatch(recognizer, e);
        } else if (e instanceof antlr4.error.FailedPredicateException) {
            this.reportFailedPredicate(recognizer, e);
        } else {
            console.error("unknown recognition error type: " + e.constructor.name);
        }
    }

    reportNoViableAlternative(recognizer, e) {
        const tokens = recognizer.getInputStream();
        let input = "<未知输入>";
        if (e.getStartToken().getType() === Token.EOF) {
            input = "<文件尾>";
        } else {
            input = tokens.getText(e.getStartToken(), e.getOffendingToken());
        }
        console.error("不允许" + e.getOffendingToken().getText() + "关键词出现在这里" + ":" + this.escapeWSAndQuote(input));
    }

    reportInputMismatch(recognizer, e) {
        const t1 = recognizer.getInputStream().LT(-1);
        const expectedStr = e.getExpectedTokens().toString(recognizer.getVocabulary());
        const tokenErrorDisplay = this.getTokenErrorDisplay(t1);
        let msg;
        if ("<EOF>" === expectedStr) {
            const t2 = recognizer.getInputStream().LT(1);
            msg = "不合法的输入" + this.getTokenErrorDisplay(t2) + "在" + tokenErrorDisplay + "之后";
        } else {
            msg = "缺少输入在 " + tokenErrorDisplay + " 后面， 期望 " + expectedStr;
        }
        console.error(this.escapeWSAndQuote(msg));
    }

    reportFailedPredicate(recognizer, e) {
        const ruleName = recognizer.getRuleNames()[recognizer.getContext().getRuleIndex()];
        console.error(ruleName);
    }

    /** Make sure we don't attempt to recover from problems in subrules. */
    sync(recognizer) {
    }

    /** Make sure we don't attempt to recover inline; if the parser
    * successfully recovers, it won't throw an exception.
    */
    recoverInline(recognizer) {
        // SINGLE TOKEN DELETION
        const matchedSymbol = this.singleTokenDeletion(recognizer);
        if (matchedSymbol != null) {
            // we have deleted the extra token.
            // now, move past ttype token as if all were ok
            recognizer.consume();
            return matchedSymbol;
        }

        // SINGLE TOKEN INSERTION
        if (this.singleTokenInsertion(recognizer)) {
            return this.getMissingSymbol(recognizer);
        }
        
        throw new antlr4.error.InputMismatchException(recognizer);
    }


    reportMissingToken(recognizer) {
        if (this.inErrorRecoveryMode(recognizer)) {
            return;
        }

        this.beginErrorCondition(recognizer);

        const t = recognizer.getTokenStream().LT(-1);
        const expecting = this.getExpectedTokens(recognizer);
        let expect = expecting.toString(recognizer.getVocabulary());
        if (expect === "'>>'") {
            expect = "'模板的占位结束符号'";
        }

        const tokenStr = this.getTokenErrorDisplay(t);
        let msg = null;
        if (expect === "'}'" && tokenStr === "'>>'") {
            msg = "试图在第" + t.getLine() + "行未找到 '{' 匹配的结束符号 '}'";
        } else {
            msg = "缺少输入 " + expect + " 在 " + tokenStr + " 后面";
        }
        console.error(msg);
    }

    reportUnwantedToken(recognizer) {
        if (this.inErrorRecoveryMode(recognizer)) {
            return;
        }

        this.beginErrorCondition(recognizer);

        const t = recognizer.getCurrentToken();
        const tokenName = this.getTokenErrorDisplay(t);
        const expecting = this.getExpectedTokens(recognizer);
        const key = this.getErrorKey(expecting.toString(recognizer.getVocabulary()));
        const msg = "多余输入 " + tokenName + " 期望 " + key;
        console.error(msg);
    }

    getErrorKey(key) {
        if (key === "'>>'") {
            return "占位结束符号";
        }
        return key;
    }
}

