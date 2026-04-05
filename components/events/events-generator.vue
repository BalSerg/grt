<template>
  <div v-if="eventsList.length > 0" class="events-list">
    <eventsListItem
      v-for="event in eventsList"
      :event-data="event"
      :key="event.id"
    />
  </div>
</template>

<script>
import {handleFetchError} from '@/assets/js/util';
import EventsListItem from '@/components/events/events-list-item';

export default {
  components: {EventsListItem},
  props: {
    link: {
      type: String,
      required: true,
      default: '/napi/static-pages/events/'
    },
  },
  data() {
    return {
      eventsList: []
    }
  },
  async fetch() {
    try {
      const {data} = await this.$axios.get(this.link);
      this.eventsList = data.result;
    } catch (err) {
      console.error(err);
      return handleFetchError(this.$nuxt, err);
    }
  },
}
</script>

<style lang="scss">
.events-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 32px;

  @media screen and (max-width: 1365px) {
    grid-template-columns: 1fr 1fr;
    padding-right: 24px;
  }

  @media screen and (max-width: $desktop-mid) {
    grid-template-columns: 1fr 1fr;
    padding-right: 0;
  }

  @media screen and (max-width: $pad - 1) {
    grid-template-columns: 1fr;
    padding-right: 0;
  }
}
</style>
