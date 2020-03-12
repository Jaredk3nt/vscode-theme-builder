const SCOPES = {
  SPACE: 'space',
  // Editor
  EDT_FG: 'editor.foreground',
  EDT_BG: 'editor.background',
  // Sources
  SOURCE_JS: 'source.js',
  // Keywords
  KEY_CTRL_MOD_JS: 'keyword.control.module.js',
  KEY_CTRL_FLOW_JS: 'keyword.control.flow.js',
  KEY_OP_ACCESS_JS: 'keyword.operator.accessor.js',
  KEY_OP_LOGIC_JS: 'keyword.operator.logical.js',
  KEY_OP_ASSIGN_JS: 'keyword.operator.assignment.js',
  // Variables
  VAR_OTHER_RW_JS: 'variable.other.readwrite.js',
  VAR_OTHER_PROP_JS: 'variable.other.property.js',
  VAR_LANG_THIS_JS: 'variable.language.this.js',
  // Constants
  CONST_OTHER_OBJ_KEY_JS: 'constant.other.object.key.js',
  CONST_NUM_JS: 'constant.numeric.js',
  CONST_LANG_UNDEF_JS: 'constant.language.undefined.js',
  // Strings
  STR_QUO_MOD_JS: 'string.quoted.module.js',
  STR_QUO_SINGLE_JS: 'string.quoted.single.js',
  STR_QUO_DOUBLE_JS: 'string.quoted.double.js',
  STR_UNQUO_JS: 'string.unquoted.js',
  // Punctuation
  PUNC_DEF_STR_BEGIN_JS: 'punctuations.definition.string.begin.js',
  PUNC_TERM_STMT_JS: 'punctuation.terminator.statement.js',
  PUNC_SEC_CLS_BEGIN_JS: 'punctuation.section.class.begin.js',
  PUNC_DEF_TAG_JSX: 'puncutation.definition.tag.jsx',
  PUNC_DEF_PARAM_END_JS: 'puncutation.definition.parameters.end.js',
  PUNC_DEF_STR_BEGIN_JS: 'punctuation.definition.string.begin.js',
  PUNC_DEF_STR_END_JS: 'punctuation.definition.string.end.js',
  PUNC_SEP_KV_JS: 'punctuation.separator.key-value.js',
  PUNC_DEF_PARAM_BEGIN_JS: 'punctuation.definition.parameters.begin.js',
  PUNC_DEF_TAG_JS: 'punctuation.definition.tag.js',
  PUNC_SEC_CLS_END_JS: 'punctuation.section.class.end.js',
  PUNC_DEF_TAG_JSX: 'punctuation.definition.tag.jsx',
  PUNC_DEF_STR_BEGIN_JS: 'punctuation.definition.string.begin.jsx',
  PUNC_SEC_EMB_BEGIN_JSX: 'punctuation.section.embedded.begin.jsx',
  PUNC_SEC_EMB_END_JSX: 'punctuation.section.embedded.end.jsx',
  // Meta
  META_CLS_BODY_JS: 'meta.class.body.js',
  META_DEL_COMMA_JS: 'meta.delimiter.comma.js',
  META_FUNC_METH_JS: 'meta.function.method.js',
  META_CLS_JS: 'meta.class.js',
  META_BRACE_CURLY_JS: 'meta.brace.curly.js',
  META_FUNCCALL_WARG_JS: 'meta.function-call.with-arguments.js',
  META_METHCALL_WARG_JS: 'meta.method-call.with-arguments.js',
  META_FUNC_ARROW_JS: 'meta.function.arrow.js',
  META_FUNC_PARAM_JS: 'meta.function.parameters.js',
  META_PROP_OBJ_JS: 'meta.property.object.js',
  META_CLS_EXTD_JS: 'meta.class.extends.js',
  META_BRACE_ROUND_JS: 'meta.brace.round.js',
  META_BRACE_CURLY_LITOBJ_JS: 'meta.brace.curly.litobj.js',
  META_TAG_JS: 'meta.tag.js',
  META_TAG_JSX: 'meta.tag.jsx',
  META_EMB_EXPR_JS: 'meta.embedded.expression.js',
  // Storage
  STRG_TYPE_CLS_JS: 'storage.type.class.js',
  STRG_TYPE_EXTD_JS: 'storage.type.extends.js',
  STRG_TYPE_FUNC_ARROW_JS: 'storage.type.function.arrow.js',
  // Entity
  ENT_NAME_CLS_JS: 'entity.name.class.js',
  ENT_NAME_FUNC_METH_JS: 'entity.name.function.method.js',
  ENT_NAME_FUNC_JS: 'entity.name.function.js',
  ENT_NAME_TAG_OPEN_JSX: 'entity.name.tag.open.jsx',
  ENT_NAME_TAG_CLOSE_JSX: 'entity.name.tag.close.jsx',
  ENT_OTHER_ATTRNAME_JSX: 'entity.other.attribute-name.jsx',
  // Support
  SUPP_CLS_COMP_OPEN_JSX: 'support.class.component.open.jsx',
  // JSX
  JSXATTR: 'JSXAttrs',
  JSXNESTED: 'JSXNested',
  JSXSTARTTAGEND: 'JSXStartTagEnd',
  JSXENDTAGSTART: 'JSXEndTagStart',
};

export { SCOPES };