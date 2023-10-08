import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Editor from "../dist/TLEditor"
import "../dist/style.css"
const app=createApp(App)
app.use(Editor)
app.mount('#app')
