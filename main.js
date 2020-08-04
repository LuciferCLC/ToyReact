import { ToyReact, Component } from './ToyReact'

class MyComponent extends Component {
  render() {
    return (
      <div>
        <span>Hello</span>
        <span> World!</span>
      </div>
    );
  }
}

const a = <MyComponent name="a" id="ida"></MyComponent>

window.onload = () => {
  ToyReact.render(
    a,
    document.getElementById('root')
  )
}