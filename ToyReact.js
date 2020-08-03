export const ToyReact = {
  createElement(type, attributes, ...children) {
    const element = document.createElement(type)
    for (const name in attributes) {
      element.setAttribute(name, attributes[name])
    }
    for (const child of children) {
      if (typeof child === 'string') {
        child = document.createTextNode(child)
      }
      element.appendChild(child)
    }
    return element
  },

  render(vdom, element) {
    element.appendChild(vdom)
  }
}