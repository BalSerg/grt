<template>
  <div class="cart-map">
    <label class="cart-map__search">
      <GmapAutocomplete
        :options="{
          fields: ['geometry']
        }"
        :placeholder="placeholder"
        @place_changed="addLocationMarker"
      />
    </label>
    <GmapMap
      :center="center"
      :options="{
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      }"
      :zoom="7"
      map-type-id="roadmap"
      style="width: 100%;
  max-width: 732px;
  height: 400px;"
      @click="pointOnPlace"
    >
      <GmapMarker
        v-if="locationMarker"
        :clickable="true"
        :draggable="true"
        :position="locationMarker.position"
      ></GmapMarker>
    </GmapMap>
    <BaseButton class="cart-map__btn" @click="selectAddress">Выбрать</BaseButton>
  </div>
</template>

<script>
import {GmapBus} from '@/modules/cart/event-bus/gmap-bus';
import BaseButton from '@/common/components/base-button';

export default {
  name: 'CartMap',
  components: {
    BaseButton
  },
  data() {
    return {
      center: {
        lat: 59.9310584, // Piter for example
        lng: 30.3609097,
      },
      placeholder: 'Найти город',
      formattedAddress: null,
      locationMarker: null
    }
  },
  mounted() {
    this.locateGeoLocation();
  },
  methods: {
    setNewPosition(marker) {
      this.locationMarker = {position: marker};
      this.center = marker;
      this.decodeLatLong(marker);
    },
    locateGeoLocation() {
      navigator.geolocation.getCurrentPosition((res) => {
        const marker = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };

        this.setNewPosition(marker);
      });
    },
    decodeLatLong(position) {
      this.$gmapApiPromiseLazy().then(() => {
        const geocoder = new google.maps.Geocoder()

        geocoder.geocode({location: position}, (results, status) => {
          if (status === 'OK') {
            this.placeholder = results[0].formatted_address;
            this.formattedAddress = results[6].formatted_address;
          }
        })
      })
    },
    setNewFormatedAddress(marker) {
      this.decodeLatLong(marker);
    },
    addLocationMarker(newLocation) {
      const marker = {
        lat: newLocation.geometry.location.lat(),
        lng: newLocation.geometry.location.lng(),
      };

      this.setNewPosition(marker);
    },
    pointOnPlace(evt) {
      const marker = {
        lat: evt.latLng.lat(),
        lng: evt.latLng.lng()
      };

      this.setNewPosition(marker);
    },
    selectAddress() {
      if (this.formattedAddress) {
        GmapBus.$emit('select-address', this.formattedAddress);
        this.$emit('on-close');
      }
    },
  },
};
</script>

<style lang="scss">
.cart-map {
  display: flex;
  flex-direction: column;
  max-width: 732px;
  height: 100%;

  @media (min-width: $pad) {
    width: 70vw;
  }
}

.cart-map__search {
  width: 100%;
  margin-bottom: 16px;

  .pac-target-input {
    box-sizing: border-box;
    width: 100%;
    padding: 14px;

    font: inherit;
    font-size: 14px;
    line-height: 1.4;

    border: 1px solid #bebebe;
    border-radius: 4px;
    background-color: $white;

    outline-color: $grt-blue;
  }
}

.cart-map__btn {
  margin-top: 16px;
}
</style>
