<template>
  <div :class="wrapperClass" class="polet">
    <section class="polet-video">
      <div class="container">
        <div class="polet-video_wrapper">
          <div class="polet-video_title">
            {{ $t('palekh.video.title') }}
          </div>
          <video
            autoplay
            class="slide-video slide-media desktop-media"
            loop
            muted
            poster="/nimages/landings/polet/video.png"
            preload="metadata"
            width="100%"
          >
            <source src="/nimages/landings/polet/video.mp4" type="video/mp4"/>
          </video>
          <video
            autoplay
            class="slide-video slide-media mobile-media"
            loop
            muted
            playsinline
            poster="/nimages/landings/polet/video-mobile.jpg"
            preload="metadata"
            width="100%"
          >
            <source
              src="/nimages/landings/polet/video-mobile.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>

    <poletBenefits/>
    <polet-showcase
      v-if="womanCollection.length"
      :link="{
            url: localePath('/promo/clock-with-author-s-hand-painted/'),
            title: $t('palekh.showcase.link')
          }"
      :max-visible-limit="12"
      :original-products="womanCollection"
      :show-more-text="$t('palekh.showmore')"
      :title="$t('palekh.showcase.womanCollection')"
    />


    <polet-showcase
      v-if="manCollection.length"
      :link="{
            url: localePath('/promo/clock-with-author-s-hand-painted/'),
            title: $t('palekh.showcase.link')
          }"
      :max-visible-limit="12"
      :original-products="manCollection"
      :show-more-text="$t('palekh.showmore')"
      :title="$t('palekh.showcase.manCollection')"
    />

    <polet-showcase
      v-if="worthyWatchesAll.length"
      :link="{
        url: localePath('/promo/clock-with-author-s-hand-painted/'),
        title: $t('palekh.showcase.link')
      }"
      :max-visible-limit="12"
      :original-products="worthyWatchesAll"
      :show-more-text="$t('palekh.showmore')"
      :title="$t('palekh.showcase.other_collections')"
    />

    <section class="features">
      <div class="container">
        <div
          v-view="phoenixHandler"
          class="features-main"
          @click="aboutPic = !aboutPic"
        >
          <div class="features-title">
            {{ $t('palekh.features.picture.title') }}
          </div>
          <div class="features-text">
            <p>
              {{ $t('palekh.features.picture.intro') }}
            </p>
          </div>
          <div class="features-readmore">
            {{ $t('palekh.features.readmore') }}
          </div>
        </div>
        <VueSlickCarousel
          v-view="viewHandler"
          v-bind="config"
          @afterChange="handleAfterChange"
          @beforeChange="handleBeforeChange"
        >
          <div
            v-for="slide in sliderBottom"
            :key="slide.id"
            class="polet-slide_features"
            @click.capture="showModal(slide.trigger, $event)"
          >
            <div
              :style="{ backgroundImage: 'url(' + slide.bg + ')' }"
              class="polet-slide_features-item"
            >
              <div class="polet-slide_features-title">
                {{ $t('palekh.features.' + slide.title + '.title') }}
              </div>
              <div class="polet-slide_features-trigger">
                {{ $t('palekh.features.readmore') }}
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>

      <transition name="fade">
        <div v-if="aboutPic" class="polet-modal">
          <div class="polet-modal_container">
            <div class="modal-text">
              <h2>{{ $t('palekh.features.picture.title') }}</h2>
              <p
                v-for="paragraph in $t('palekh.features.picture.article')"
                :key="paragraph.key"
              >
                {{ paragraph }}
              </p>
            </div>
            <div class="modal-pic">
              <figure>
                <img
                  :alt="$t('palekh.features.picture.title')"
                  src="/nimages/landings/polet/about/pic.png"
                />
              </figure>
            </div>
          </div>
          <div class="polet-modal_controls">
            <div class="close" @click="aboutPic = !aboutPic"></div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="aboutBox" class="polet-modal">
          <div class="polet-modal_container">
            <div class="modal-text">
              <h2>{{ $t('palekh.features.box.title') }}</h2>
              <p
                v-for="paragraph in $t('palekh.features.box.article')"
                :key="paragraph.key"
              >
                {{ paragraph }}
              </p>
            </div>
            <div class="modal-pic">
              <figure>
                <img
                  :alt="$t('palekh.features.box.title')"
                  src="/nimages/landings/polet/about/box.png"
                />
              </figure>
            </div>
          </div>
          <div class="polet-modal_controls">
            <div class="close" @click="aboutBox = !aboutBox"></div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="aboutGears" class="polet-modal">
          <div class="polet-modal_container">
            <div class="modal-text">
              <h2>{{ $t('palekh.features.gears.title') }}</h2>
              <p
                v-for="paragraph in $t('palekh.features.gears.article')"
                :key="paragraph.key"
              >
                {{ paragraph }}
              </p>
            </div>
            <div class="modal-pic">
              <figure>
                <img
                  :alt="$t('palekh.features.gears.title')"
                  src="/nimages/landings/polet/about/gears.png"
                />
              </figure>
            </div>
          </div>
          <div class="polet-modal_controls">
            <div class="close" @click="aboutGears = !aboutGears"></div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="aboutBelt" class="polet-modal">
          <div class="polet-modal_container">
            <div class="modal-text">
              <h2>{{ $t('palekh.features.belt.title') }}</h2>
              <p
                v-for="paragraph in $t('palekh.features.belt.article')"
                :key="paragraph.key"
              >
                {{ paragraph }}
              </p>
            </div>
            <div class="modal-pic">
              <figure>
                <img
                  :alt="$t('palekh.features.belt.title')"
                  src="/nimages/landings/polet/about/belt.png"
                />
              </figure>
            </div>
          </div>
          <div class="polet-modal_controls">
            <div class="close" @click="aboutBelt = !aboutBelt"></div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="aboutCase" class="polet-modal">
          <div class="polet-modal_container">
            <div class="modal-text">
              <h2>{{ $t('palekh.features.case.title') }}</h2>
              <p
                v-for="paragraph in $t('palekh.features.case.article')"
                :key="paragraph.key"
              >
                {{ paragraph }}
              </p>
            </div>
            <div class="modal-pic">
              <figure>
                <img
                  :alt="$t('palekh.features.case.title')"
                  src="/nimages/landings/polet/about/case.png"
                />
              </figure>
            </div>
          </div>
          <div class="polet-modal_controls">
            <div class="close" @click="aboutCase = !aboutCase"></div>
          </div>
        </div>
      </transition>
    </section>

    <polet-showcase
      v-if="otherWatchesAll.length"
      :class="{ dark: seen }"
      :link="{
        url: localePath('/promo/clock-with-author-s-hand-painted/'),
        title: $t('palekh.showcase.link')
      }"
      :max-visible-limit="12"
      :original-products="otherWatchesAll"
      :show-more-text="$t('palekh.showmore')"
      :title="$t('palekh.showcase.dark_title')"
    />

    <section class="polet-about">
      <div class="container">
        <div class="polet-about_row">
          <div class="polet-about_text">
            <div class="polet-about_title">
              <h2>{{ $t('palekh.about.title') }}</h2>
            </div>
            <div class="polet-about_article">
              <p
                v-for="paragraph in $t('palekh.about.article')"
                :key="paragraph.key"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>
          <div class="polet-about_images">
            <polet-slider/>
            <!-- <img src="/nimages/landings/polet/polet-about.png" :alt="$t('palekh.about.title')" /> -->
          </div>
        </div>
      </div>
    </section>

    <section class="polet-faq">
      <div class="container">
        <div class="polet-faq_row">
          <div class="polet-faq_questions">
            <div class="polet-faq_questions-title">
              {{ $t('palekh.faq.title') }}
            </div>
            <div
              v-for="(item, index) in $t('palekh.faq.questions')"
              :key="index"
              class="polet-faq_question"
            >
              <div class="polet-faq_trigger" @click="getAnswer">
                {{ item.question }}
              </div>
              <div
                v-for="(paragraph, idx) in item.answer"
                :key="idx"
                class="polet-faq_answer"
              >
                <i18n
                  :path="`palekh.faq.questions[${index}].answer[${idx}]`"
                  tag="p"
                >
                  <template #email>
                    <a href="mailto:info@globalrustrade.com">{{
                        $t('palekh.faq.email')
                      }}</a>
                  </template>
                  <template #alt_email>
                    <a href="mailto:sales@simvolika.ru">{{
                        $t('palekh.faq.alt_email')
                      }}</a>
                  </template>
                  <template #primary_phone>
                    <a href="tel: +79096465665">{{
                        $t('palekh.faq.primary_phone')
                      }}</a>
                  </template>
                  <template #secondary_phone>
                    <a href="tel: +74952562625">{{
                        $t('palekh.faq.secondary_phone')
                      }}</a>
                  </template>
                  <template #alt_phone>
                    <a href="tel: +74959214560">{{
                        $t('palekh.faq.alt_phone')
                      }}</a>
                  </template>
                </i18n>
              </div>
            </div>
          </div>
          <div class="polet-faq_form">
            <div
              v-if="!isSuccessSend"
              :class="{ 'entry-point--blocked': isSending }"
              class="polet-faq_unsend"
            >
              <div class="polet-faq_form-title">
                {{ $t('palekh.form.title') }}
              </div>
              <form novalidate @submit.prevent="submit">
                <div class="entry-point__input-wrapper">
                  <InputText
                    v-model.lazy="form.name"
                    :error_message="$t('enter_name')"
                    :pseudo_placeholder="$t('name')"
                    :required="true"
                    :v="$v.form.name"
                  />
                </div>

                <GrtTelInput
                  v-model.lazy="form.phone"
                  :class="{'val-vti': valueOfPhoneNumber}"
                  :country-code="countryCode"
                  :is-watch="true"
                  :v="$v.form.phone"
                  @on-input-phone="inputPhone"
                />

                <div class="entry-point__input-wrapper">
                  <InputEmail
                    v-model.lazy="form.email"
                    :required="false"
                    :v="$v.form.email"
                  />
                </div>
                <div class="entry-point__input-wrapper">
                  <InputComment
                    v-model.lazy="form.qst"
                    :placeholder="$t('palekh.form.comment.message')"
                    :required="false"
                    :v="$v.form.qst"
                  />
                </div>

                <div class="quick-order__agreement">
                  <label
                    :class="{
                      'grt-checkbox--error': $v.form.agreesWithTerms.$error
                    }"
                    class="grt-checkbox"
                  >
                    <input
                      v-model.lazy="form.agreesWithTerms"
                      class="grt-checkbox__input"
                      type="checkbox"
                      @change="$v.form.agreesWithTerms.$touch()"
                    />
                    <svg
                      class="grt-checkbox__icon"
                      fill="none"
                      height="16"
                      viewBox="0 0 16 16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        class="grt-checkbox__bg"
                        d="M12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2Z"
                        fill="none"
                        stroke="#bebebe"
                      />
                      <path
                        class="grt-checkbox__checkmark"
                        d="M7.13965 10.8596C6.87965 11.1196 6.45965 11.1196 6.19965 10.8596L3.80632 8.46622C3.68148 8.34166 3.61133 8.17256 3.61133 7.99622C3.61133 7.81987 3.68148 7.65077 3.80632 7.52622C4.06632 7.26622 4.48632 7.26622 4.74632 7.52622L6.66632 9.44622L11.253 4.85955C11.513 4.59955 11.933 4.59955 12.193 4.85955C12.453 5.11955 12.453 5.53955 12.193 5.79955L7.13965 10.8596Z"
                        fill="none"
                      />
                      <rect
                        class="grt-checkbox__outline"
                        height="15"
                        rx="0.5"
                        stroke="none"
                        width="15"
                        x="0.5"
                        y="0.5"
                      />
                    </svg>
                    <span class="grt-checkbox__label">
                      <i18n path="footer.subscribe.agreement">
                        <template #user_agreement>
                          <nuxt-link :to="localePath(`/docs/terms-of-use/`)">{{
                              $t('footer.subscribe.user_agreement')
                            }}</nuxt-link>
                        </template>
                        <template #policy>
                          <nuxt-link :to="localePath(`/docs/privacy-policy/`)">{{
                              $t('footer.subscribe.policy')
                            }}</nuxt-link>
                        </template>
                      </i18n>
                    </span>
                  </label>
                </div>

                <div class="entry-point__submit-wrapper">
                  <button class="grt-btn grt-btn--filled" type="submit">
                    {{ $t('login.send') }}
                  </button>
                </div>
              </form>
            </div>
            <div
              v-show="isSending"
              class="loader-wrapper"
              style="position: absolute;"
            >
              <div class="loader">
                <div class="inner one"></div>
                <div class="inner two"></div>
                <div class="inner three"></div>
              </div>
            </div>

            <div v-if="isSuccessSend">
              <div class="polet-faq_form-success">
                <div class="icon">
                  <svg
                    fill="none"
                    height="74"
                    viewBox="0 0 74 74"
                    width="74"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M50.5137 25.5098H47.1244C46.3873 25.5098 45.6863 25.8639 45.2528 26.4709L33.8926 42.2248L28.7472 35.085C28.3136 34.4852 27.6199 34.1238 26.8755 34.1238H23.4863C23.0165 34.1238 22.7419 34.6586 23.0165 35.0416L32.0209 47.5291C32.2336 47.826 32.514 48.0679 32.8389 48.2348C33.1637 48.4017 33.5237 48.4887 33.8889 48.4887C34.2542 48.4887 34.6141 48.4017 34.939 48.2348C35.2639 48.0679 35.5443 47.826 35.757 47.5291L50.9762 26.4275C51.258 26.0445 50.9834 25.5098 50.5137 25.5098V25.5098Z"
                      fill="#27AE60"
                    />
                    <path
                      d="M37 4.625C19.1215 4.625 4.625 19.1215 4.625 37C4.625 54.8785 19.1215 69.375 37 69.375C54.8785 69.375 69.375 54.8785 69.375 37C69.375 19.1215 54.8785 4.625 37 4.625ZM37 63.8828C22.1566 63.8828 10.1172 51.8434 10.1172 37C10.1172 22.1566 22.1566 10.1172 37 10.1172C51.8434 10.1172 63.8828 22.1566 63.8828 37C63.8828 51.8434 51.8434 63.8828 37 63.8828Z"
                      fill="#27AE60"
                    />
                  </svg>
                </div>
                <div class="thanx">
                  {{ $t('palekh.form.thanks') }}
                  <br/>
                  {{ $t('palekh.form.message') }}
                </div>
                <div class="callus">
                  <i18n path="palekh.form.contacts">
                    <template #primary_phone>
                      <br/><a href="tel: +79096465665">{{
                        $t('palekh.faq.primary_phone')
                      }}</a>
                    </template>
                    <template #secondary_phone>
                      <a href="tel: +74952562625">{{
                          $t('palekh.faq.secondary_phone')
                        }}</a>
                    </template>
                  </i18n>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {email, helpers, minLength, required} from 'vuelidate/lib/validators';
import {COUNTRY_CODE} from 'assets/js/const.LocalStorage'

import VueSlickCarousel from 'vue-slick-carousel';
import {MULTIPART_FORM_DATA_HEADER, PhoneCountryCode, RFQ_type,} from '@/assets/js/const';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';

import InputEmail from '@/components/common/input-email';
import InputText from '@/components/common/input-text';
import InputComment from '@/components/common/input-comment';
import GrtTelInput from '@/components/grt-tel-input/';
import poletAssets from '@/assets/js/polet';
import poletShowcase from '@/components/polet/polet-showcase';
import poletBenefits from '@/components/polet/polet-benefits';
import poletSlider from '@/components/polet/polet-slider';
import {handleFetchError} from "@/assets/js/util";
import {validateOnLetters} from "~/assets/js/customValidation";

const localStoreKeys = {
  NAME: 'quick_order_name',
  EMAIL: 'quick_order_email',
  PHONE: 'quick_order_phone'
};

const getLocalStoreValue = key => {
  if (!localStorage[key]) {
    return '';
  }

  if (localStorage[key] === 'undefined') {
    return '';
  }

  return localStorage[key];
};

export default {
  components: {
    VueSlickCarousel,
    InputEmail,
    InputComment,
    InputText,
    GrtTelInput,
    poletShowcase,
    poletBenefits,
    poletSlider
  },
  middleware: ['getMetaInfo'],
  computed: {
    ...mapGetters({
      user: 'userData/user',
      metaData: 'meta/metaData',
      layoutMetaTags: 'meta/layoutMetaTags',
      isDevEnv: 'tech/isDevEnv'
    }),
    watchesCollections() {
      return {
        worthyWatchesAll: {name: 'worthyWatchesAll', filterId: this.isDevEnv ? 1031589 : 1518654},
        otherWatchesAll: {name: 'otherWatchesAll', filterId: this.isDevEnv ? 1031592 : 1518655},
        womanCollection: {name: 'womanCollection', filterId: this.isDevEnv ? 1031590 : 1518652},
        manCollection: {name: 'manCollection', filterId: this.isDevEnv ? 1031591 : 1518653},
      }
    }
  },
  data() {
    return {
      uniqueIDPrefix: '',
      form: {
        email: '',
        name: '',
        phone: '',
        qst: '',
        goodsCount: 1,
        agreesWithTerms: true
      },
      message: '',
      wrapperClass: 'default',
      seen: false,
      isSending: false,
      isSuccessSend: false,
      aboutPic: false,
      aboutCase: false,
      aboutBelt: false,
      aboutBox: false,
      aboutGears: false,
      sliderTop: poletAssets.sliderTop,
      sliderBottom: poletAssets.sliderBottom,
      worthyWatchesAll: [],
      otherWatchesAll: [],
      womanCollection: [],
      manCollection: [],
      config: {
        centerMode: false,
        arrows: false,
        dots: true,
        swipeToSlide: true,
        focusOnSelect: false,
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        responsive: [
          {
            breakpoint: 1366,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 460,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      },
      backedData: [],
      phoneInputFocused: false,
      phoneObj: null,
      countryCode: null,
      valueOfPhoneNumber: false
    };
  },

  head() {
    const meta = this.metaData.get(encodeURIComponent(this.$route.fullPath));

    if (!meta) {
      return;
    }

    return {...this.layoutMetaTags, ...meta};
  },

  validations: {
    form: {
      email: {email},
      name: {required},
      phone: {
        required,
        minLength: minLength(6),
        noWorlds: val => {
          return !helpers.req(val) || !validateOnLetters(val)
        }
      },
      qst: {},
      agreesWithTerms: {
        checked: value => value === true
      }
    }
  },

  async created() {
    if (process.client) {
      if (localStorage[COUNTRY_CODE]) {
        this.countryCode = localStorage[COUNTRY_CODE];
      }
    }
    this.loadUserInfoFromLocalStore();

    if (!this.form.name) {
      this.loadUserInfoFromAppStorage();
    }
    await Promise.all(Object.values(this.watchesCollections).map(async collectionItem => {
      await this.getCollectionsData(collectionItem);
    }))
  },

  mounted() {
    this.$nextTick(() => {
      this.getPhoneNumberFromValueInput();
    })
  },

  methods: {
    async getCollectionsData(collectionItem) {
      await this.$axios.get(`/napi/catalog-search/categories/products/products?filters=${collectionItem?.filterId}&page-size=100`).then(({data}) => {
        this[collectionItem?.name] = [...data.result]
      }).catch(e => handleFetchError(e))
    },
    getPhoneNumberFromValueInput() {
      const phoneNumber = document.querySelector('.vti__input.grt-text-input__input').value;
      if (phoneNumber) {
        this.valueOfPhoneNumber = true;
      }
      return this.valueOfPhoneNumber;
    },

    inputPhone(newPhoneObj) {
      this.phoneObj = newPhoneObj;
    },
    handleBeforeChange() {
      this.isDragging = true;
    },
    handleAfterChange() {
      this.isDragging = false;
    },
    showModal(el, event) {
      if (this.isDragging) {
        event.preventDefault();
        return;
      }
      this[el] = !this[el];
    },
    submit() {
      this.$v.form.$touch();

      if (this.$v.form.$pending || this.$v.form.$error) {
        return;
      }

      this.sendLegacyContactMeForm(); // TODO выпилить когда-то
      this.sendContactMeForm();
    },

    sendLegacyContactMeForm() {
      // TODO выпилить когда-то
      this.isSending = true;
      const formData = this.packLegacyFormData();

      this.$axios
        .post('/cmprfq?=json', formData, {
          headers: MULTIPART_FORM_DATA_HEADER
        })
        .then(response => {
          this.isSending = false;
          this.isSuccessSend = true;
        })
        .catch(err => {
          this.isSending = false;
          this.$toast.error(err.toString());
        });
    },

    sendContactMeForm() {
      this.isSending = true;
      const formData = this.packFormData();

      this.$axios
        .post('/napi/crm-forms/forms/contact-me', formData, {
          headers: MULTIPART_FORM_DATA_HEADER
        })
        .then(response => {
          this.isSending = false;
          this.isSuccessSend = true;
        })
        .catch(err => {
          this.isSending = false;
          this.$toast.error(err.toString());
        });
    },

    packLegacyFormData() {
      // TODO выпилить когда-то
      const data = {
        agree: this.form.agreesWithTerms,
        feedback_type: RFQ_type.POLET,
        phone: this.form.phone.replace(/[^0-9]/g, ''),
        country_id: PhoneCountryCode[this.phoneObj.country.dialCode],
        email: this.form.email,
        name: this.form.name,
        qst: this.form.qst
      };
      const formData = new FormData();

      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      return formData;
    },

    packFormData() {
      const data = {
        agree: this.form.agreesWithTerms,
        feedback_type: RFQ_type.POLET,
        phone: this.form.phone.replace(/[^0-9]/g, ''),
        country_id: this.phoneObj?.country?.iso2?.toLowerCase(),
        email: this.form.email,
        name: this.form.name,
        comment: this.form.qst
      };
      const formData = new FormData();

      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });

      return formData;
    },

    getAnswer(evt) {
      evt.target.closest('.polet-faq_question').classList.toggle('active');
    },
    viewHandler(e) {
      this.wrapperClass = 'style_' + e.type;
      if (e.percentInView > 0) {
        this.seen = true;
      }
    },
    phoenixHandler(e) {
      if (e.percentInView >= 1) {
        document.querySelector('.features-main').classList.add('animated');
      }
    },
    loadUserInfoFromLocalStore() {
      if (!process.client) {
        return;
      }

      this.form.name = getLocalStoreValue(localStoreKeys.NAME);
      this.form.email = getLocalStoreValue(localStoreKeys.EMAIL);
      this.form.phone = getLocalStoreValue(localStoreKeys.PHONE);
    },
    saveUserInfoToLocalStore() {
      if (process.client) {
        localStorage[localStoreKeys.NAME] = this.form.name;
        localStorage[localStoreKeys.EMAIL] = this.form.email;
        localStorage[localStoreKeys.PHONE] = this.phoneObj.nationalNumber;
      }
    },
    loadUserInfoFromAppStorage() {
      if (this.user) {
        this.form.email = this.user.email;
        this.form.phone = this.user.phone;
        this.form.name = this.user.name;
      }
    }
  }
};

</script>

<style lang="scss">
@font-face {
  font-family: "Futura PT";
  src: local("Futura PT Light"),
    local("Futura-PT-Light"),
    url("/nfonts/futura/FuturaPT-Light.woff2") format("woff2"),
    url("/nfonts/futura/FuturaPT-Light.woff") format("woff"),
    url("/nfonts/futura/FuturaPT-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: "Futura PT";
  src: local("Futura PT Medium"),
    local("Futura-PT-Medium"),
    url("/nfonts/futura/FuturaPT-Medium.woff2") format("woff2"),
    url("/nfonts/futura/FuturaPT-Medium.woff") format("woff"),
    url("/nfonts/futura/FuturaPT-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s;
}

.fade-enter,
.fade-leave-to {
  transform: translateY(100%);
}

.showAll {
  display: block;
  padding: 30px 0;
  font-size: 28px;
  margin: 0 auto;
  width: auto;
  color: #ad9c89;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: #7b6a58;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }

  &-mobile {
    display: none;
    padding: 30px 0;
    font-size: 28px;
    margin: 0 auto;
    width: auto;
    color: #ad9c89;
    text-align: center;
    cursor: pointer;

    a {
      color: #ad9c89;
    }

    @media screen and (max-width: 1024px) {
      display: block;
    }
  }
}

.dark .showAll,
.style_progress .showAll,
.dark .showAll-mobile a,
.style_progress .showAll-mobile a {
  color: #ffffff;
  opacity: 0.5;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: #ffffff;
  }
}

.desktop-media {
  border-radius: 5px;

  @media screen and (max-width: 480px) {
    display: none;
  }
}

.mobile-media {
  display: none;

  @media screen and (max-width: 480px) {
    display: block;
    border-radius: 5px;
  }
}

.polet {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f9f8f4;
  color: #3c3c3c;
  font-family: "Futura PT", sans-serif;
  font-weight: 300;
  transition: background-color linear 0.4s;

  @media screen and (max-width: 767px) {
    padding-top: 60px;
  }

  & .favorites-button {
    svg {
      path.favorites-button__ring {
        fill: #ad9c89;
      }

      path.favorites-button__body {
        fill: #ad9c8900;
      }


      path.favorites-button__body.favorites-button_active {
        fill: #ad9c89 !important;
      }
    }
  }

  &-video {
    &_wrapper {
      position: relative;
    }

    &_title {
      font-size: 48px;
      color: #ffffff;
      font-weight: 500;
      position: absolute;
      bottom: 4px;
      border-radius: 5px;
      left: 0;
      padding: 64px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
      right: 0;

      @media screen and (max-width: 1024px) {
        font-size: 32px;
        padding: 32px;
      }

      @media screen and (max-width: 768px) {
        font-size: 28px;
        padding: 24px;
      }

      @media screen and (max-width: 640px) {
        font-size: 18px;
        padding: 16px;
        bottom: 4px;
      }

      @media screen and (max-width: 480px) {
        font-size: 28px;
        padding: 16px;
        bottom: 0;
      }
    }
  }

  &-modal {
    position: fixed;
    background-color: #fdfbfb;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    z-index: 6666;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 0 10vw;
    box-sizing: border-box;

    p {
      margin-bottom: 1em;
    }

    @media screen and (max-width: 768px) {
      padding: 20px;
    }

    &_container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-flow: row wrap;
      padding: 5vw;
      font-size: 18px;
      box-sizing: border-box;
      max-height: 100%;
      overflow-y: auto;

      .modal-text {
        width: 50%;

        @media screen and (max-width: 768px) {
          width: 100%;
        }
      }

      .modal-pic {
        width: 50%;
        padding: 5% 10%;
        box-sizing: border-box;

        img {
          display: block;
          max-width: 100%;
        }

        @media screen and (max-width: 768px) {
          width: 100%;
        }
      }

      h2 {
        font-size: 48px;
        margin-bottom: 30px;
      }
    }

    &_controls {
      position: absolute;
      right: 60px;
      top: 60px;

      @media screen and (max-width: 767px) {
        right: 30px;
        top: 30px;
      }

      .close {
        width: 55px;
        height: 55px;
        cursor: pointer;
        position: relative;

        &::before,
        &::after {
          width: 60px;
          height: 2px;
          background-color: #979797;
          content: "";
          position: absolute;
          top: calc(50% - 1px);
          left: calc(50% - 30px);
          transition: all linear 200ms;
        }

        &::before {
          transform: rotate(-45deg);
        }

        &::after {
          transform: rotate(45deg);
        }

        &:hover {
          &::before {
            transform: rotate(45deg);
            background-color: #000000;
          }

          &::after {
            transform: rotate(-45deg);
            background-color: #000000;
          }
        }
      }
    }
  }

  .slick-dots {
    position: static;

    li {
      width: 10%;
      max-width: 90px;
      position: relative;
      height: 36px;
      border-radius: none;
      background-color: transparent;
      cursor: pointer;
      border: none;

      &::after {
        position: absolute;
        top: calc(50% - 2px);
        left: 0;
        right: 0;
        content: "";
        border-radius: 5px;
        height: 4px;
        opacity: 0.5;
        background-color: #ffffff;
      }

      @media screen and (max-width: 1024px) {
        background-color: transparent;
      }

      &.slick-active {
        background-color: transparent;
        overflow: hidden;
        opacity: 1;

        &::after {
          background-color: #ffffff;
          opacity: 1;
        }

        &::before {
          display: none;
        }
      }
    }
  }

  h2 {
    font-size: 48px;
    color: #04011e;
    font-weight: 300;

    @media screen and (max-width: 1024px) {
      font-size: 34px;
    }

    @media screen and (max-width: 768px) {
      font-size: 28px;
    }
  }

  &-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
  }

  .section-link {
    padding-left: 20px;

    @media screen and (max-width: 1024px) {
      display: none;
    }

    a {
      font-size: 16px;
      color: #ad9c89;
      cursor: pointer;
      font-weight: 500;
      white-space: nowrap;
    }
  }

  &.style_progress {
    background-color: #000000;
  }

  section {
    padding: 30px 0;

    &.polet-about {
      background-color: #f9f8f4;
      padding: 60px 20px;
    }

    &.polet-faq {
      background-color: #ffffff;
    }

    &.features {
      max-width: 100vw;
      overflow: hidden;

      .features-main {
        background-color: #fffcf4;
        background-image: url("/nimages/landings/polet/face.png");
        background-repeat: no-repeat;
        background-position: 50% 100%;
        background-size: 100%;
        color: #000000;
        box-sizing: border-box;
        padding: 32px;
        border-radius: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
        min-height: 460px;
        position: relative;

        @media screen and (max-width: 768px) {
          min-height: 350px;
        }

        &.animated {
          &::before {
            display: block;
            animation: float linear 3s;
          }
        }

        @media screen and (min-width: 1366px) {
          &::before {
            display: none;
            width: 341px;
            height: 341px;
            content: "";
            position: absolute;
            background-image: url("/nimages/landings/polet/phoenix.png");
            background-size: cover;
            background-position: 50% 50%;
            right: 170px;
            transform: rotate(20deg) translateX(265px) translateY(-75px);
            top: calc(40% - 170px);

            @keyframes float {
              0% {
                transform: translateX(25px) translateY(5px) rotate(20deg) scale(0.2);
              }

              50% {
                transform: translateX(125px) translateY(5px) rotate(20deg) scale(0.7);
              }
            }
          }
        }
      }

      .features-title {
        font-size: 48px;
      }

      .features-text {
        padding-right: 60%;
        font-size: 18px;

        @media screen and (max-width: 768px) {
          padding: 0;
        }
      }

      .features-readmore {
        font-size: 18px;
        position: relative;
        cursor: pointer;
        padding: 20px 0 4px;
        font-weight: 300;
        display: inline-block;

        &::before {
          content: "";
          width: 60%;
          height: 1px;
          background: #ad9c89;
          position: absolute;
          left: 0;
          bottom: 2px;
        }
      }
    }

    &.dark {
      background-color: #000000;
      transition: background-color linear 100ms;
      padding-top: 80px;

      h2 {
        color: #ffffff;
      }

      .section-link {
        a {
          color: #ffffff;
          opacity: 0.5;
          transition: opacity linear 200ms;

          &:hover {
            opacity: 1;
          }
        }
      }

      .polet-catalog {
        &_inner {
          background-color: #141414;
          color: #ffffff;

          &:hover {
            .polet-product-info {
              transform: translateY(-50%);

              .product-price {
                display: block;
              }

              .product-actions {
                display: flex;
              }
            }
          }

          .polet-product-info {
            transition: transform linear 200ms;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(20, 20, 20, 1) 5%);

            @media screen and (max-width: 1024px) {
              transform: translateY(-45%);
            }

            .product-price {
              display: none;
              font-weight: 500;
              font-size: 16px;
              padding: 10px 0;

              a {
                color: #ffffff;
                text-decoration: none;
              }

              @media screen and (max-width: 1024px) {
                display: block;
              }
            }

            .product-actions {
              display: none;
              flex-flow: row nowrap;
              justify-content: space-between;
              align-items: center;

              .product-add_to_cart {
                color: #ad9c89;
                position: relative;
                cursor: pointer;
                padding: 5px 0;
                font-weight: 500;
                font-size: 16px;
                background-color: transparent;
                font-family: "Futura PT", sans-serif;

                &::before {
                  content: "";
                  width: 0%;
                  height: 1px;
                  background: #ad9c89;
                  position: absolute;
                  left: 0;
                  bottom: 2px;
                  transition: width linear 200ms;

                  @media screen and (max-width: 1024px) {
                    width: 60%;
                  }
                }

                &:hover {
                  &::before {
                    width: 60%;
                  }
                }
              }
            }
          }

          .product-title {
            font-size: 16px;
            font-weight: 300;
            line-height: 150%;
            color: #ffffff;

            a {
              color: #ffffff;
              text-decoration: none;
            }

            // text-transform: uppercase;
          }
        }
      }
    }
  }

  &-slide {
    min-height: 460px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;

    &_item {
      display: block;
      position: relative;
      z-index: 1;
      width: 100%;
      height: 460px;
      object-fit: cover;
      background-size: cover;
      background-position: 50% 50%;
      user-select: none;
    }

    &_title {
      color: #ffffff;
      font-size: 56px;
      line-height: 1.2;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 100px 60px 60px;
      padding-right: 300px;
      z-index: 2;
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%);
    }

    &_features {
      padding: 0 5px;
      box-sizing: border-box;

      &-item {
        height: 270px;
        background-color: #fffcf4;
        border-radius: 10px;
        position: relative;
        background-repeat: no-repeat;
        background-position: 100% 100%;
        background-size: contain;
        overflow: hidden;

        @media screen and (max-width: 768px) {
          height: 190px;
        }

        @media screen and (min-width: 1024px) {
          &:hover {
            .polet-slide_features-trigger {
              bottom: 25px;
            }
          }
        }
      }

      &-title {
        position: absolute;
        bottom: 10px;
        right: 0;
        left: 0;
        padding: 50px 32px;
        font-size: 28px;
        color: #04011e;
      }

      &-trigger {
        position: absolute;
        bottom: 25px;
        left: 30px;
        padding: 5px 0;
        cursor: pointer;
        font-size: 18px;
        color: #04011e;

        &::before {
          content: "";
          width: 60%;
          height: 1px;
          background: #ad9c89;
          position: absolute;
          left: 0;
          bottom: 2px;
        }

        @media screen and (min-width: 1024px) {
          bottom: -25px;
          transition: all linear 150ms;
        }
      }
    }
  }

  &-catalog {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 -16px;

    @media screen and (max-width: 1024px) {
      flex-flow: row nowrap;
      overflow-x: auto;
      margin: 0;
    }

    &_item {
      width: 16.66666%;
      padding: 16px;
      flex-shrink: 0;
      box-sizing: border-box;

      @media screen and (max-width: 1920px) {
        width: 25%;
      }

      @media screen and (max-width: 1440px) {
        width: 25%;
      }

      @media screen and (max-width: 1024px) {
        width: 260px;
      }

      @media screen and (max-width: 768px) {
        width: 260px;
      }

      @media screen and (max-width: 640px) {
        width: 260px;
      }
    }

    &_inner {
      height: 345px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 10px;
      overflow: hidden;
      padding: 32px;
      box-sizing: border-box;
      transition: box-shadow linear 200ms;

      &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);

        .polet-product-info {
          transform: translateY(-50%);
          padding-bottom: 40px;

          .product-price {
            display: block;
          }

          .product-actions {
            display: flex;
          }
        }
      }

      img {
        display: block;
        width: 100%;
        height: 240px;
        object-fit: scale-down;
        margin-bottom: 10px;
      }

      .polet-product-info {
        transition: transform linear 200ms;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 5%);

        @media screen and (max-width: 1024px) {
          transform: translateY(-45%);
        }

        .product-price {
          display: none;
          font-weight: 500;
          font-size: 16px;
          padding: 10px 0;

          a {
            color: #3c3c3c;
            text-decoration: none;
          }

          @media screen and (max-width: 1024px) {
            display: block;
          }
        }

        .product-actions {
          display: none;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;

          .product-add_to_cart {
            color: #ad9c89;
            position: relative;
            cursor: pointer;
            padding: 5px 0;
            font-weight: 500;
            font-size: 16px;
            background-color: transparent;
            font-family: "Futura PT", sans-serif;

            &::before {
              content: "";
              width: 0%;
              height: 1px;
              background: #ad9c89;
              position: absolute;
              left: 0;
              bottom: 2px;
              transition: width linear 200ms;

              @media screen and (max-width: 1024px) {
                width: 60%;
              }
            }

            &:hover {
              &::before {
                width: 60%;
              }
            }
          }
        }
      }

      .product-title {
        font-size: 16px;
        font-weight: 300;
        line-height: 150%;
        color: #3c3c3c;
        overflow: hidden;
        text-overflow: ellipsis;
        /* stylelint-disable */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        /* stylelint-enable */
        a {
          color: #3c3c3c;
          text-decoration: none;
        }
      }
    }
  }

  &-about {
    position: relative;

    &_row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      padding: 0 100px;

      @media screen and (max-width: 1024px) {
        padding: 0;
      }

      @media screen and (max-width: 768px) {
        flex-flow: row wrap;
        padding: 0;

        .polet-about_text {
          width: 100%;
        }
      }
    }

    &_text {
      width: 50%;
      flex-shrink: 0;
      flex-grow: 1;
      line-height: 150%;
      font-size: 16px;
    }

    &_title {
      font-size: 48px;
    }

    &_article {
      padding: 24px 128px 48px 0;
      font-size: 16px;
      color: #000000;

      @media screen and (max-width: 1024px) {
        padding: 0 30px 0 0;
      }

      @media screen and (max-width: 768px) {
        padding: 0;
      }

      p {
        margin: 1em 0;
        line-height: 150%;
      }
    }

    &_link {
      font-size: 16px;
      color: #000000;
      cursor: pointer;
      position: relative;
      padding: 5px 0;
      display: inline-block;
      user-select: none;

      &::before {
        width: 42px;
        height: 1px;
        background: #ad9c89;
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    &_images {
      width: 50%;
      flex-shrink: 0;
      box-sizing: border-box;

      @media screen and (max-width: 1024px) {
        padding: 0;
        width: 50%;
        justify-content: center;
        align-items: center;
      }

      @media screen and (max-width: 768px) {
        padding: 0;
        width: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }

  &-faq {
    font-size: 18px;

    a {
      color: #7b6a58;
      text-decoration: underline;

      &:hover {
        color: #ad9c89;
      }
    }

    &_row {
      padding: 30px 40px 30px 100px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: flex-start;

      @media screen and (max-width: 1024px) {
        padding: 30px 20px;
      }

      @media screen and (max-width: 767px) {
        flex-flow: row wrap;
        padding: 0;
      }
    }

    &_questions {
      width: 50%;
      box-sizing: border-box;
      flex-shrink: 0;

      @media screen and (max-width: 1024px) {
        padding: 0 20px 0 0;
      }

      @media screen and (max-width: 767px) {
        width: 100%;
      }

      &-title {
        font-size: 32px;
        padding: 20px 0;
      }
    }

    &_form {
      padding: 0 80px 0 100px;
      position: relative;
      width: 50%;
      flex-shrink: 0;
      box-sizing: border-box;

      @media screen and (max-width: 1024px) {
        padding: 0 20px;
        box-sizing: border-box;
      }

      @media screen and (max-width: 767px) {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
      }

      @media screen and (max-width: 480px) {
        width: 100%;
        padding: 40px 0 0;
        box-sizing: border-box;
      }

      &-title {
        font-size: 32px;
        padding: 20px 0;
      }

      &-success {
        text-align: center;
        padding: 20px;

        .icon {
          padding-bottom: 20px;
        }

        .thanx {
          font-weight: bold;
          padding-bottom: 20px;
          font-size: 18px;
        }

        .callus {
          font-size: 16px;
        }
      }

      .grt-text-input__input {
        border-color: #ad9c89;
        border-radius: 0;
        outline: none;
        box-shadow: none;

        &.val-form ~ .grt-text-input__label {
          color: $grey-default;
          transform: translateY(-10px) scale(0.85);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) 0s;
        }
      }

      .vue-tel-input {
        border: 1px solid #ad9c89;
      }

      .grt-tel-input--error .grt-text-input__message {
        display: block;
      }

      .grt-tel-input--error .vue-tel-input {
        border-color: $coral;
      }

      .grt-tel-input--error .grt-text-input__label {
        color: $coral;
      }

      .vue-tel-input:focus-within {
        box-shadow: none;
        border-color: #ad9c89;
      }

      .grt-tel-input.val-vti {
        .grt-text-input__label {
          color: $grey-default;
          transform: translateY(-10px) scale(0.85);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) 0s;
        }
      }

      .grt-tel-input,
      .grt-text-input {
        @media screen and (max-width: 767px) {
          margin-bottom: 0;
        }
      }

      .grt-checkbox .grt-checkbox__label {
        font-size: 14px;
        color: #000000;

        a {
          color: #000000;
          text-decoration: underline;
        }
      }

      .grt-text-input__textarea {
        border: 1px solid #ad9c89;
        border-radius: 0;
        width: 100%;
        min-height: 5em;
        padding: 10px;
        outline: none;
        box-sizing: border-box;
        color: #3a3a3a;
        font-family: "Futura PT", sans-serif;
        font-weight: 300;
        margin: 0;
        box-shadow: none;
      }

      .grt-tel-input .vti__dropdown {
        border: none;

        .vti__selection {
          width: auto;
        }
      }

      .grt-tel-input .vue-tel-input {
        border-color: #ad9c89;
        border: 1px solid #ad9c89;
        border-radius: 0;
        outline: none;
        box-shadow: none;

        .grt-text-input__input {
          margin-left: 0;
          border: none;
        }
      }

      .grt-checkbox .grt-checkbox__input:checked + .grt-checkbox__icon .grt-checkbox__bg {
        fill: #ad9c89;
      }

      .grt-tel-input {
        position: relative;

        .grt-text-input__label {
          left: 70px;
        }
      }

      .grt-btn,
      .grt-btn:hover {
        display: block;
        width: auto;
        margin: 20px auto;
        background-color: #ad9c89;
        color: #ffffff;
        height: 48px;
        border: none;
        border-radius: 0;
        padding: 0.75rem 5rem;
        font-weight: 300;
        font-size: 16px;
      }
    }

    &_question {
      border-bottom: 1px solid #ad9c89;
      padding-right: 30px;

      &.active {
        .polet-faq_answer {
          max-height: 800px;
        }

        .polet-faq_trigger {
          &::before {
            transform: rotate(135deg);
            top: 50%;
          }
        }
      }
    }

    &_trigger {
      cursor: pointer;
      color: #000000;
      padding: 24px 0 10px;
      position: relative;
      font-weight: 300;

      &::before {
        position: absolute;
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        border: 1px solid #ad9c89;
        content: "";
        top: calc(50% - 8px);
        right: -20px;
        transform: rotate(-45deg);
        border-top-color: transparent;
        border-right-color: transparent;
        transition: all linear 200ms;
      }
    }

    &_answer {
      max-height: 0;
      overflow: hidden;
      color: #888888;
      padding-right: 10px;
      // padding-bottom: 5px;
      transition: max-height linear 0.5s;

      p {
        line-height: 150%;
        margin: 0.5rem 0;
      }
    }
  }

  &-benefits {
    background-color: #f9f8f4;
    color: #131313;

    &_row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: stretch;

      @media screen and(max-width: 1024px) {
        overflow-x: auto;
      }
    }

    &_item {
      width: 33%;
      box-sizing: border-box;
      padding: 30px 0;
      min-width: 320px;
    }

    &_icon {
      width: 100px;
      height: 100px;
      background-color: transparent;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;
      user-select: none;
      display: none;

      svg {
        height: 100%;
      }
    }

    &_title {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 12px;
      line-height: 150%;
    }

    &_text {
      font-size: 16px;
      font-weight: 300;
      line-height: 150%;
      padding-right: 46px;
    }
  }
}

.polet .vti__country-code {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.polet section.dark .entry-point__header {
  color: #04011e;
}

.polet .modal__body {
  @media (max-width: 767px) {
    top: 46px;
    bottom: 52px;
  }
}

.polet .grt-tel-input .vti__selection {
  width: auto;
}

.polet .grt-tel-input .grt-text-input__label {
  left: 82px;
}

.polet .vti__dropdown-item strong {
  font-weight: 400;
}
</style>
