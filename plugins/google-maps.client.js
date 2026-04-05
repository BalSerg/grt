import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBjX4gvtNCinLdWXHGdtlQ5h2A_WpcDfX0",
    libraries: "places, geolocation, geocoding",
  }
});
