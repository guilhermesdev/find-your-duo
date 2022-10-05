import { createApp } from 'vue';

import 'keen-slider/keen-slider.min.css';
import '@/style.css';
import App from '@/App.vue';
import { router } from '@/router';

createApp(App).use(router).mount('#app');
