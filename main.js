import { ToyReact, Component } from './ToyReact'

class MyComponent extends Component {
  render() {
    return (
      <div>
        <span>Hello</span>
        <span>World!</span>
        <div>
          {this.children}
        </div>
      </div>
    );
  }
}

const a = (
  <MyComponent name="a" id="ida">
    {true}
    <div>123</div>
  </MyComponent>
)

window.onload = () => {
  ToyReact.render(
    a,
    document.getElementById('root')
  )
}