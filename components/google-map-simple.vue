<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="15"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "GoogleMapSimple",
  props: {
    isPermissionGeoLocate: {
      type: Boolean,
      default: false
    },
    centerLat: {
      type: Number,
      default: 0,
    },
    centerLng: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      center: { lat: this.centerLat, lng: this.centerLng },
      markers: [{
        position: { lat: this.centerLat, lng: this.centerLng }
      }],
    }
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    geolocate() {
      if(this.isPermissionGeoLocate) {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
      }
    }
  },
}
</script>


