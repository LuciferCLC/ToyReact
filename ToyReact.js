class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }

  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      const eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase())
      this.root.addEventListener(eventName, value)
    } else if (name === 'className') {
      name = 'class'
    }

    this.root.setAttribute(name, value)
  }

  appendChild(vchild) {
    const range = document.createRange()

    if (this.root.children.length > 0) {
      range.setStartAfter(this.root.lastChild)
      range.setEndAfter(this.root.lastChild)
    } else {
      range.setStart(this.root, 0)
      range.setEnd(this.root, 0)
    }

    vchild.mountTo(range)
  }

  mountTo(range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }

  mountTo(range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}

export class Component {
  constructor() {
    this.children = []
    this.props = Object.create(null)
  }

  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      console.log(RegExp.$1)
    }
    this.props[name] = value
    this[name] = value
  }

  mountTo(range) {
    this.range = range
    this.update()
  }

  update() {
    const placeholder = document.createComment('placeholder')
    const range = document.createRange()
    range.setStart(this.range.endContainer, this.range.endOffset)
    range.setEnd(this.range.endContainer, this.range.endOffset)
    range.insertNode(placeholder)

    this.range.deleteContents()
    let vdom = this.render()
    vdom.mountTo(this.range)
  }

  appendChild(vchild) {
    this.children.push(vchild)
  }

  setState(state) {
    const merge = (oldState, newState) => {
      for (const p in newState) {
        if (typeof newState[p] === 'object') {
          if (typeof oldState[p] !== 'object') {
            oldState[p] = {}
          }

          merge(oldState[p], newState[p])
        } else {
          oldState[p] = newState[p]
        }
      }
    }

    if (!this.state && state) {
      this.state = {}
    }

    merge(this.state, state)
    this.update()
  }
}

export const ToyReact = {
  createElement(type, attributes, ...children) {
    let element;

    if (typeof type === 'string') {
      element = new ElementWrapper(type)
    } else {
      element = new type;
    }

    for (const name in attributes) {
      element.setAttribute(name, attributes[name])
    }

    const insertNode = (children) => {
      for (const child of children) {
        if (typeof child === 'object' && child instanceof Array) {
          insertNode(child)
        } else {
          if (
            !(child instanceof Component)
            && !(child instanceof ElementWrapper)
            && !(child instanceof TextWrapper)
          ) {
            child = String(child)
          }
          if (typeof child === 'string') {
            child = new TextWrapper(child)
          }
          element.appendChild(child)
        }
      }
    }

    insertNode(children)

    return element
  },

  render(vdom, element) {
    const range = document.createRange()

    if (element.children.length > 0) {
      range.setStartAfter(element.lastChild)
      range.setEndAfter(element.lastChild)
    } else {
      range.setStart(element, 0)
      range.setEnd(element, 0)
    }

    vdom.mountTo(range)
  }
}