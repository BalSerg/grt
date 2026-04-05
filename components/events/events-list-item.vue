<template>
  <div class="event-item">
    <div class="event-item__album">
      <nuxt-link :to="localePath(`/events/${eventData.semanticId}`)">
        <lazy-img :src="getProperImage(eventData.media[0])" :alt="eventData.title"></lazy-img>
      </nuxt-link>
      <div v-if="eventData.eventTypes.length >= 1" class="event-item__labels">
        <div v-for="label in eventData.eventTypes" :key="label.id" class="event-item__label">
          {{label.title}}
        </div>
      </div>
    </div>
    <div class="event-item__calendar">
      {{getLocalizedDate(eventData.startDate, eventData.endDate)}}
    </div>
    <div class="event-item__title">
      <nuxt-link :to="localePath(`/events/${eventData.semanticId}`)">
        <h2>{{eventData.title}}</h2>
      </nuxt-link>
    </div>
    <div class="event-item__intro">
      {{eventData.introText}}
    </div>
  </div>
</template>

<script>
import GetProperImageMX from '@/mixins/get-proper-image-mx';
import LazyImg from '@/components/lazy-img';
export default {
  components: {LazyImg},
  mixins: [GetProperImageMX],
  props: {
    eventData: Object
  },
  methods: {
    getProperImage(img) {
      if(img && !img.match(/[^/]+(jpg|png|jpeg)$/)) 
        // TODO: что это?
        return 'https://img.globalrustrade.com/i/e/eSJXMt5sEF/original.jpg';
      
      return this.$mx_getProperImage(img, "events-item");
    },
    getLocalizedDate(start, end) {
      // TODO нужна плюрализация с предлогами на русском языке как минимум
      if(!end) return Date(start).toLocaleString(this.$i18n.locale, {month: 'long', day: 'numeric'});
      const StartDate = new Date(start).toLocaleString(this.$i18n.locale, {month: 'long', day: 'numeric'});
      const EndDate = new Date(end).toLocaleString(this.$i18n.locale, {month: 'long', day: 'numeric', year: 'numeric'});
      return `${this.$t('universal.date.range.from')} ${StartDate} ${this.$t('universal.date.range.to')} ${EndDate}`;
    },
  },
}
</script>

<style lang="scss">
.event-item {
  &__album {
    position: relative;

    &::before {
      position: relative;
      content: "";
      padding-top: calc(100% / (327 / 200));
      display: block;
    }

    a {
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      top: 0;
      right: 0;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
        box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.15);
        user-select: none;
        border-radius: 8px;
        overflow: hidden;
      }
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  &__labels {
    position: absolute;
    z-index: 2;
    top: 12px;
    left: 12px;
  }

  &__label {
    background-color: #219653;
    line-height: 11px;
    font-size: 11px;
    color: $white;
    padding: 3.5px 7px 5.5px;
    font-weight: 600;
    text-transform: capitalize;
    user-select: none;
  }

  &__calendar {
    margin: 16px 0 12px;
    font-size: 14px;
    color: $text-grey-2;
    padding: 4px 0;
  }

  &__title {
    a {
      h2 {
        color: #000000;
        font-size: 18px;
        line-height: 27px;
      }
    }
  }
}
</style>
