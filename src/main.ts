import { mount } from 'svelte'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
