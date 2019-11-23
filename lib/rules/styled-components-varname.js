function checkValuableName(context, node, name, styleOption) {
  const { pattern, startsWith, endsWith } = styleOption
  if (pattern) {
    if (name.match(new RegExp(pattern))) return
    context.report({ node, message: `'${name}' must match '${pattern}'` })
    return
  }
  if (startsWith && !name.startsWith(startsWith)) {
    context.report({ node, message: `'${name}' must starts with '${startsWith}'` })
    return
  }
  if (endsWith && !name.endsWith(endsWith)) {
    context.report({ node, message: `'${name}' must ends with '${endsWith}'` })
    return
  }
}

function handleTagStyle(context, node, tag) {
  const objectIdentifier = tag.object
  if (objectIdentifier.type !== 'Identifier') return
  if (objectIdentifier.name !== 'styled') return
  const idIdentifier = node.id
  if (idIdentifier.type !== 'Identifier') return
  const option = context.options[0]
  checkValuableName(context, node, idIdentifier.name, option.tagStyle)
}

function handleExtendedStyle(context, node, tag) {
  const identifier = tag.callee
  if (identifier.type !== 'Identifier') return
  if (identifier.name !== 'styled') return
  const idIdentifier = node.id
  if (idIdentifier.type !== 'Identifier') return
  const option = context.options[0]
  checkValuableName(context, node, idIdentifier.name, option.extendedStyle)
}

const rule = context => {
  return {
    VariableDeclarator: node => {
      if (!node.init) return
      const taggedTemplateExpression = node.init
      if (taggedTemplateExpression.type !== 'TaggedTemplateExpression') return
      const tag = taggedTemplateExpression.tag
      if (tag.type === 'MemberExpression') {
        handleTagStyle(context, node, tag)
        return
      }
      if (tag.type === 'CallExpression') {
        handleExtendedStyle(context, node, tag)
      }
    },
  }
}

const styleSchema = {
  type: 'object',
  properties: {
    startsWith: { type: 'string' },
    endsWith: { type: 'string' },
    pattern: { type: 'string' },
  },
  additionalProperties: false,
}

rule.schema = [
  {
    type: 'object',
    properties: {
      tagStyle: styleSchema,
      extendedStyle: styleSchema,
    },
    additionalProperties: false,
  },
]

module.exports = rule
