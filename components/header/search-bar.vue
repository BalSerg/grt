<template>
  <client-only>
    <div class="search-bar header__search">
      <form @submit.prevent="submitHandle">
        <vue-autosuggest
          ref="autocomplete"
          v-model="query"
          :suggestions="suggestions"
          :input-props="{
            id: 'autosuggest__input',
            placeholder: $tc('header.search', goodsTotalCount),
            class: 'search-bar__input',
            name: 'search-query'
          }"
          :placeholder="$tc('header.search')"
          :get-suggestion-value="getSuggestionValue"
          @selected="onSelected"
          @opened="isExpanded = true"
          @closed="isExpanded = false"
          @input="fetchResults"
        >
          <template slot-scope="{suggestion}">
            <div class="search-bar__suggest-txt-wrapper">
              <p class="search-bar__suggest-text">{{suggestion.item}}</p>
            </div>
          </template>
        </vue-autosuggest>
        <button type="submit" class="search-bar__btn">
          <span class="visually-hidden">{{$t('send_search_request')}}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill="#007AFF"
              fill-rule="evenodd"
              d="M16.255 15.295h1.054l5.656 5.68c.547.547.547 1.44 0 1.987a1.41 1.41 0 01-1.988 0l-5.669-5.667v-1.053l-.36-.373a8.673 8.673 0 01-7.123 1.973c-3.708-.627-6.67-3.72-7.123-7.453C.01 4.749 4.757.002 10.4.695c3.735.454 6.83 3.414 7.457 7.12a8.665 8.665 0 01-1.974 7.12l.373.36zm-12.953-6c0 3.32 2.68 6 6 6s6-2.68 6-6-2.68-6-6-6-6 2.68-6 6z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  </client-only>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';
import debounce from 'debounce';
import { SEARCH_PAGE_NAME } from '@/assets/js/const';

/**
 * Searchbar использует плагин vue-autosuggest.
 * Подробная докуменатция живёт тут:
 * https://www.npmjs.com/package/vue-autosuggest
 *
 * Если объявляется sectionConfigs для вывода нескольких
 * сецкий с результами поиска, то обязательно должна быть
 * секция "default", иначе могут посыпаться ошибки вроде:
 * "Cannot read property 'onSelected' of undefined"
 */

const DEBOUNCE_TIME_IN_MS = 500;
const MIN_QUERY_LENGTH = 4;

export default {
  components: {
    VueAutosuggest
  },
  props: {
    goodsTotalNumber: Number
  },
  data() {
    return {
      query: '',
      timeout: null,
      selected: null,
      suggestions: [],
      isExpanded: false
    };
  },
  computed: {
    goodsTotalCount() {
      return this.goodsTotalNumber;
    },
  },
  watch: {
    isExpanded(isVisible) {
      return isVisible ? this.$disableBodyScroll() : this.$enableBodyScroll();
    },
  },
  methods: {
    submitHandle() {
      if (this.query.length === 0) {
        return;
      }

      this.selected = this.query;
      this.goToSearch();
    },

    onSelected(suggestion) {
      this.selected = suggestion
        ? suggestion.item
        : this.$refs.autocomplete.internalValue;

      this.goToSearch();
    },

    composeSuggestUrl(query) {
      return `napi/catalog-search/search/${query}/suggest`;
    },

    goToSearch() {
      this.query = "";
      const normalizedSelected = this.selected.replace(/\//g, '').replace(/%/g, '');
      const encodedSuggestion = encodeURI(normalizedSelected).toLowerCase();

      const url = this.localePath(`/${SEARCH_PAGE_NAME}/${encodedSuggestion}`);
      return this.$router.push(url);
    },

    fetchResults() {
      if (this.query.length < MIN_QUERY_LENGTH) {
        return;
      }

      this.debouncedGetSuggestions();
    },

    getSuggestionValue(suggestion) {
      return suggestion.item;
    },

    async getSuggestions() {
      if (this.query.length === 0) {
        return;
      }

      try {
        const encodedQuery = encodeURIComponent(this.query).toLowerCase();

        const url = this.composeSuggestUrl(encodedQuery);
        const { data } = await this.$axios.get(url);

        const  goods = data.result;

        this.suggestions = [{
          name: 'goods',
          data: goods
        }];

        this.selected = this.query;

      } catch (err) {
        console.log(err); // TODO log me
      }
    },

    debouncedGetSuggestions: debounce(function () {
      this.getSuggestions();
    }, DEBOUNCE_TIME_IN_MS)
  }
};
</script>

<style lang="scss">
.search-bar {
  position: relative;

  width: 100%;
  height: 32px;
  margin-top: 7px;
  margin-bottom: 7px;

  @media (min-width: $desktop-mid) {
    height: 48px;
  }
}

.autosuggest__results {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  display: block;
  flex-shrink: 0;
  width: 100%;
  margin: 0;
  padding: 0;

  overflow-y: scroll;
  border-radius: 0 0 24px 24px;
  background-color: #ffffff;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none; /* stylelint-disable-line */
    width: 0;
    height: 0;
  }

  @media (min-width: 768px) {
    top: 76px;
  }

  @media (min-width: $desktop-mid) {
    position: absolute;
    top: 48px;
    left: unset;
    right: unset;
    bottom: unset;

    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
  }
}

.search-bar ul {
  list-style: none;
  padding-left: 0;
  margin: 0;

  max-height: 400px;
}

.search-bar li {
  display: flex;
  align-items: center;
  padding: 0 22px;

  outline: none;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active,
  &.autosuggest__results-item--highlighted {
    background-color: #f3f3f3;
  }
}

.search-bar__suggest-txt-wrapper {
  display: flex;
  flex-direction: column;
  margin-right: auto;
  padding: 10px 0;
}

.search-bar__suggest-text {
  margin: 0;

  font-size: 13px;
  line-height: 1.4;
  color: #131313;
  text-decoration: none;

  @media (min-width: $desktop-mid) {
    font-size: 14px;
  }
}

.search-bar__input {
  box-sizing: border-box;
  display: block;
  flex-shrink: 0;
  width: 100%;
  height: 32px;
  padding: 0 11px;
  padding-right: 32px;

  font-size: 13px;
  line-height: 1.4;
  color: $text-grey;

  border-radius: 24px;

  background-color: #fafafa;
  border: 1px solid #e9e9e9;
  box-shadow: none;

  outline: none;

  @media (min-width: $desktop-mid) {
    height: 48px;
    padding: 0 22px;
    padding-right: 54px;

    font-size: 15px;

    &:focus {
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
      background-color: #ffffff;
      border: 1px solid transparent;
    }
  }
}

.search-bar__input:focus::-webkit-input-placeholder {
  color: transparent;

  @media (min-width: $desktop-mid) {
    color: inherit;
  }
}

div[aria-expanded="true"] .search-bar__input {
  @media (min-width: $desktop-mid) {
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
    border-radius: 24px 24px 0 0;
    background-color: #ffffff;
    background-image: linear-gradient(to bottom, transparent 47px, #e7e7e7 1px);
    background-size: calc(100% - 44px) 48px;
    background-position-x: 22px;
    background-repeat: no-repeat;
  }
}

.search-bar__btn {
  position: absolute;
  top: 0;
  right: 2px;
  z-index: 101;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 0;

  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  svg {
    width: 18px;
    height: 18px;
  }

  @media (min-width: $desktop-mid) {
    right: 7px;

    width: 48px;
    height: 48px;
    margin-top: 0;
    margin-bottom: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
