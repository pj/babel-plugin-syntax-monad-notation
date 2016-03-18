import { types as tt } from "../tokenizer/types";
import Parser from "../parser";

let pp = Parser.prototype;

pp.parseMonadBody = function () {
    this.expect(tt.braceL);
    let exprList = [];
    while (!this.eat(tt.braceR)) {
        let node = this.startNode();
        node.id = null;
        let lookahead = this.lookahead();
        if (lookahead.value == "<=") {
            node.id = this.parseIdentifier();
            this.next();
        }

        // TODO: Only certain things are valid as expressions, basically things
        // that can return object types.
        node.expr = this.parseExprSubscripts();

        if (!(this.eat(tt.semi) || this.canInsertSemicolon())) {
            this.unexpected();
        }

        this.finishNode(node, "MonadExpression");
        exprList.push(node);
    }
    if (!(this.eat(tt.semi) || this.canInsertSemicolon())) {
        this.unexpected();
    }

    return exprList;
}

export default function (instance) {
  instance.extend("parseExprAtom", function (inner) {
    return function (refShorthandDefaultPos) {
      if (this.state.type === tt._for) {
        let node = this.startNode();
        this.next();
        node.body = this.parseMonadBody();
        return this.finishNode(node, "MonadNotation");
      } else {
        return inner.call(this, refShorthandDefaultPos);
      }
    };
  });

  instance.extend("parseStatement", function (inner) {
    return function (declaration, topLevel) {
      if (this.state.type === tt._for && this.lookahead().type == tt.braceL) {
        let node = this.startNode();
        let expr = this.parseExpression();
        return this.parseExpressionStatement(node, expr);
      } else {
        return inner.call(this, declaration, topLevel);
      }
    };
  });
}
