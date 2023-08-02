import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n/translation-service';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
});

const app = createApp(App);

app.use(i18n);
app.use(vuetify);

app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'));
