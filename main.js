import { ToyReact } from './ToyReact'

const a = (
  <MyComponent name="a" id="ida">
    <span>Hello</span>
    <span> World</span>
    <span> Nolan</span>
  </MyComponent>
)

window.onload = () => {
  ToyReact.render(
    a,
    document.getElementById('root')
  )
}