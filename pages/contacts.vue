<template>
  <div class="contact">
    <div class="contact-body">
      <FakeBreadcrumbs :fake-path="$t('footer.navigation.contacts')" />
      <h1 class="contact-title">{{ $t('footer.navigation.contacts') }}</h1>
      <div class="contact-base">
        <div class="contact-base-left">
          <div class="contact-item">
            <h1 class="contact-item__title">{{$t('contacts.legal_address')}}</h1>
            <div class="contact-item__text">{{$t('contacts.for_registration_documents')}}</div>
            <div class="contact-item__info">{{$t('contacts.address')}}</div>
          </div>
          <div class="contact-item">
            <h1 class="contact-item__title">{{$t('contacts.phone')}}</h1>
            <div class="contact-item__text">{{$t('contacts.questions')}}</div>
            <a href="tel:+495 256-26-25" class="contact-item__info">+7 495 256-26-25</a>
          </div>
        </div>
        <div class="contact-base-right">
          <div class="contact-geo">
            <google-map-simple
              :centerLat="55.74005"
              :centerLng = "37.60993"
            ></google-map-simple>
          </div>
        </div>
      </div>
      <div class="contact-addon">
        <div class="contact-item">
          <h1 class="contact-item__title">{{$t('contacts.mail')}}</h1>
          <div class="contact-item__text">{{$t('contacts.media_inquiries')}}</div>
          <a class="contact-item__info" href="mailto:info@globalrustrade.com">info@globalrustrade.com</a>
        </div>
        <div class="contact-item requisites">
          <h1 class="contact-item__title">{{$t('contacts.requisites')}}</h1>
          <div class="contact-item__text">{{$t('contacts.inn')}} 7733237194</div>
          <div class="contact-item__text">{{$t('contacts.kpp')}} 770401001</div>
          <div class="contact-item__text">{{$t('contacts.ogrn')}} 1157746506170</div>
        </div>
        <!-- Раскомментить когда появится страница партнерам
        <div class="contact-item">
          <h1 class="contact-item__title">{{$t('contacts.partners')}}</h1>
          <div class="contact-item__text">{{$t('contacts.detailed_conditions')}}</div>
          <a class="contact-item__info" href="mailto:info@globalrustrade.com">{{$t('contacts.go')}}</a>
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script>
import FakeBreadcrumbs from "~/components/common/fake-breadcrumbs";
import GoogleMapSimple from "~/components/google-map-simple";

export default {
name: "ContactUs",
components: {
  GoogleMapSimple,
  FakeBreadcrumbs,
}
}
</script>

<style lang="scss">
$height_contact_item: 206px;
$marginTopFromItem: 24px;

.contact {
  background: #f9f9f9;

  .catalog-breadcrumbs {
    padding: 0 0 10px;

    .catalog-crumb {
      padding: 0 10px 15px 0;
    }
  }

  &-body {
    margin: 0 auto;
    max-width: 1440px;
    padding: 24px 30px;
  }

  &-title,
  &-item__title {
    color: $text-black;
    font-size: 28px;
    line-height: 40px;
    font-weight: 700;
  }

  &-title {
    margin: 0 0 16px;
  }

  &-base,
  &-addon {
    display: flex;
    flex-direction: row;

    .contact-item {
      margin: $marginTopFromItem 0 0;
    }
  }

  &-base {
    align-items: stretch;

    &-left {
      margin: 0 24px 0 0;
    }

    &-right {
      width: 100%;
    }

    .contact-item:first-of-type {
      margin: 0;
    }
  }

  &-addon {
    .contact-item {
      &:last-of-type {
        width: calc(100% - 24px - 560px);
      }

      &:first-of-type {
        width: calc(100% - (100% - 24px - 560px) - 24px);
        margin-right: 24px;
      }
    }
  }

  &-item {
    position: relative;

    height: $height_contact_item;
    width: 560px;
    padding: 24px;
    box-sizing: border-box;

    background: $white;
    border-radius: 12px;

    &__title {
      margin: 0 0 8px;
    }

    &__text,
    &__info {
      font-size: 16px;
      line-height: 22px;
    }

    &__text {
      font-size: 16px;
      line-height: 22px;
      color: $text-grey-2;
    }

    &__info {
      position: absolute;
      bottom: 24px;
      left: 24px;

      padding: 0 24px 0 0;

      color: $text-black;
    }

    &.requisites {
      .contact-item__text {
        margin: 0 0 16px;
      }
    }
  }

  &-geo,
  .vue-map-container {
    height: calc(#{$height_contact_item} * 2 + #{$marginTopFromItem}) !important;
  }
}

@media screen and (min-width: $desktop-mid) and (max-width: $desktop-large) {
  .contact {
    &-item {
      width: 386px;
    }

    &-addon {
      .contact-item {
        &:last-of-type {
          width: calc(100% - 24px - 386px);
        }

        &:first-of-type {
          width: calc(100% - (100% - 24px - 386px) - 24px);
        }
      }
    }
  }
}

@media screen and (max-width: $desktop-mid - 1) {
  .contact {
    &-base {
      display: block;

      &-left {
        display: flex;
        justify-content: space-between;
        margin: 0 0 24px;

        .contact-item:first-of-type {
          margin-right: 24px;
        }
      }

      .contact-item {
        margin-top: 0;
      }
    }

    &-geo {
      height: 386px;
    }

    &-item,
    &-addon {
      .contact-item:last-of-type,
      .contact-item:first-of-type {
        width: calc(50% - 12px);
      }
    }

    &-item__title {
      font-size: 22px;
      line-height: 31px;
    }
  }
}

@media screen and (max-width: $mobile *2) {
  .contact {
    &-body {
      padding: 24px 16px 30px;
    }

    &-base-left {
      .contact-item {
        width: 100%;

        &:first-of-type {
          margin-right: 0;
        }
      }
    }

    &-base-left,
    &-addon {
      display: block;
    }

    &-base,
    &-addon {
      .contact-item {
        margin: 16px 0 0;
      }
    }

    &-geo {
      height: 268px;
    }

    &-item,
    &-addon {
      .contact-item:last-of-type,
      .contact-item:first-of-type {
        width: 100%;
      }
    }
  }
}

</style>
