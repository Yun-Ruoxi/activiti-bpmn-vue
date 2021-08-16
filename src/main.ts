import { createApp } from 'vue';
import App from './App';
import './index.css';
import ElementPlus from 'element-plus';
import 'element-plus/packages/theme-chalk/src/index.scss';
import 'default-passive-events';

const app = createApp(App);
app.use(ElementPlus);
app.mount('#app');
