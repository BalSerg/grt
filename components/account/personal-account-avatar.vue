<template>
  <div class="personal-account__avatar">
    <div class="account-avatar__wrapper">
      <div class="account-avatar__placeholder">
        <user-avatar-with-login/>
      </div>
      <div class="account-avatar__action">
        <label for="avatar">
          <input id="avatar" type="file" @change="handleAvatarInput($event)">
          <svg width="12" height="10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.469 2.343h1.01V6.97c0 .06.05.109.11.109h.82c.06 0 .11-.05.11-.11V2.344H7.53a.11.11 0 0 0 .086-.176L6.087.228a.11.11 0 0 0-.173 0L4.383 2.166a.11.11 0 0 0 .086.177Zm6.535 4.216h-.82a.11.11 0 0 0-.11.109v2.105H1.926V6.668a.11.11 0 0 0-.11-.11h-.82a.11.11 0 0 0-.11.11v2.707c0 .242.196.437.438.437h9.352a.437.437 0 0 0 .437-.437V6.668a.11.11 0 0 0-.11-.11Z" fill="#595959"/></svg>
          {{$t('account.data.upload')}}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import {MULTIPART_FORM_DATA_HEADER} from "../../assets/js/const";
import UserAvatarWithLogin from "@/components/common/user-avatar-with-login";

const loadAvatarStatusFail = {
  'invalidFormat': 'account.avatar.invalid_format',
  'invalidSize': 'account.avatar.invalid_size'
}

export default {
  components: {
    UserAvatarWithLogin
  },
  data() {
    return {
      avatarUrl: '/napi/user-info/avatar'
    }
  },
  methods: {
    ...mapMutations({
      SET_AVATAR_SRC: 'userData/SET_AVATAR_SRC',
    }),
    async handleAvatarInput(event) {
      const avatarFile = event.target.files[0]

      const formData = new FormData()
      formData.append('file', avatarFile)

      try {
        await this.$axios.$post(this.avatarUrl, formData, {headers: MULTIPART_FORM_DATA_HEADER})
        this.SET_AVATAR_SRC(this.avatarUrl)
      } catch (err) {
        if (err?.response?.data?.error) {
          const statusKey = loadAvatarStatusFail[err.response.data.error]
          if (statusKey) {
            this.$toast.error(this.$t(statusKey).toString())
            return
          }
        }
        this.$toast.error(this.$t('errors.something_wrong').toString())
      }
    },
  }
}
</script>

<style lang="scss">
.personal-account {
  &__avatar {
    background-color: white;
    border-radius: 12px;
    border: 1px solid $mid-grey-ui;
    padding: 60px 16px;
    box-sizing: border-box;
    max-width: 327px;

    @media screen and (max-width: $desktop-mid - 1) {
      max-width: none;
    }

    & .account-avatar {
      &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        @media screen and (max-width: $desktop-mid - 1) {
          flex-direction: row;
          justify-content: center;

          .account-avatar__placeholder {
            margin: 0 25px 0 0;
          }
        }
      }

      &__action {
        padding: 24px 0 10px;

        label {
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          padding: 8px 16px;
          cursor: pointer;
        }

        input {
          display: none;
        }
      }

      &__placeholder {
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        user-select: none;

        &::after {
          position: absolute;
          z-index: 1;
          content: "";
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          box-shadow: inset 0 0 11px rgba(0, 0, 0, 0.2);
        }

        img {
          display: block;
          width: 80px;
          height: 80px;
          object-fit: contain;
          object-position: center;
          transition: all linear 200ms;
        }
      }
    }
  }
}
</style>
