<template>
  <div class="google-map">
    <div id="map" class="map"></div>
  </div>
</template>

<script>

const infoWindowTemplate = '<div style="margin: 0 0 8px;">'+
      '<img src="/favicon.ico" alt="logo"/>'+
    '</div>'+
    '<div style="font-size: 12px; line-height: 16px">'+
    '<div style="margin: 0 0 12px;">{{Address}}</div>'+
    '<div style="font-weight: 600">{{Date}}</div>'+
  '</div>'

export default {
  name: "GoogleMap",
  props: {
    componentData: Object
  },
  data() {
    return {
      addressPosition: this.componentData.addressPosition,
      pickPoints: this.componentData.pickPoints,
    }
  },
  mounted() {
    this.generateMap()
  },
  methods: {
    generateMap() {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: this.addressPosition,
      })
      const infoWindow = new google.maps.InfoWindow({
        maxWidth: 500
      })

      this.pickPoints.forEach((pickPoint) => {
        const marker = this.createMarker(map, pickPoint)

        marker.addListener('click', () => {
          // let contentString = `<p>${pickPoint['address']}</p>`
          const contentString = infoWindowTemplate

          infoWindow.setContent(contentString)
          infoWindow.open({
            anchor: marker,
            map,
            shouldFocus: true
          })
        })
      })
    },
    createMarker(map, pickPoint) {
      return new google.maps.Marker({
        position: {
          lat: pickPoint.latitude, lng: pickPoint.longitude
        },
        map,
      });
    }
  },
}
</script>

<style scoped lang="scss">
.google-map {
  margin: 10px;
  display: flex;
  flex-direction: column;
  max-width: 732px;
  height: 100%;

  @media (min-width: $pad) {
    width: 70vw;
  }
}

.google-map-infoPopup {
  padding: 8px;
  border-radius: 8px;
  background: $white;

  &_img {
    margin: 0 0 8px;
  }

  &_address {
    margin: 0 0 12px;
  }

  &_date {
    font-weight: 600;
  }

  &_address,
  &_date {
    font-size: 12px;
    line-height: 16px;
    color: $text-black;
  }
}

.map {
  width: 100%;
  max-width: 732px;
  height: 400px;
}
</style>
