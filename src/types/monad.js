import defineType, {
  assertNodeType,
  assertValueType,
  assertEach,
  chain
} from "./index";

defineType("MonadNotation", {
  visitor: ["body"],
  aliases: ["Expression"],
  fields: {
      body: {
          validate: chain(assertValueType("array"), assertEach(assertNodeType("MonadExpression"))),
      }
  }
});

defineType("MonadExpression", {
  visitor: ["id", "expr"],
  fields: {
      id: {
          validate: assertNodeType("Identifier"),
          optional: true
      },
      expr: {
          validate: assertNodeType("Expression")
      }
  }
});
