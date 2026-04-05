<template>
  <section class="user-menu">
    <div class="user-menu__user">
      <div
        class="user-menu__user-avatar"
        :class="user.avatar ? '' : 'user-menu__user-avatar--no-avatar'"
      >
        <img
          v-if="user.avatar"
          class="user-menu__user-avatar-image"
          :src="user.avatar"
          :alt="user.name"
        />
        <img
          v-else
          class="user-menu__user-avatar-image user-menu__user-avatar-image--no-avatar"
          src="/nimages/empty-avatar.svg"
          :alt="user.name"
        />
      </div>
      <div class="user-menu__user-info">
        <h3 class="user-menu__username">{{ user.name }}</h3>
        <p class="user-menu__user-email">{{ user.email }}</p>
      </div>
    </div>
    <ul class="user-menu__nav">
      <li class="user-menu__nav-item">
        <old-link
          class="user-menu__link"
          to="/account/data"
        >{{ $t('header.user.bio') }}
        </old-link
        >
      </li>
      <li class="user-menu__nav-item">
        <old-link
          class="user-menu__link"
          to="/account/orders"
        >
          <span class="user-menu__link-text">
            {{ $t('header.user.orders') }}
            <span v-if="user.hasOrders" class="user-menu__link-indicator"></span>
          </span>
        </old-link>
      </li>
      <!-- <li class="user-menu__nav-item">
        <old-link
          class="user-menu__link"
          to="/personalaccount/b/chats/"
        >
          <span class="user-menu__link-text">
            {{ $t('header.user.messages') }} -->
      <!-- <span v-if="user.hasRefunds" class="user-menu__link-indicator"></span> -->
      <!-- </span>
    </old-link>
  </li> -->
      <!--
      <li v-if="user.companies.length > 0" class="user-menu__nav-item">
        <h4 class="user-menu__link-text user-menu__link-text--header">
          {{ $t('header.user.companies') }}
        </h4>
      </li>
      <li
        v-for="company in user.companies"
        :key="company.id"
        class="user-menu__nav-item user-menu__nav-item--left-padding"
      >
        <old-link
          class="user-menu__link"
          :to="`/personalaccount/s/panel/${company.id}`"
        >{{ company.name_local }}
        </old-link
        >
      </li>
      -->
      <!-- <li class="user-menu__nav-item">
        <old-link class="user-menu__link" to="">
          <span class="user-menu__link-text">
            {{$t('header.user.refunds')}}
            <span v-if="user.hasRefunds" class="user-menu__link-indicator"></span>
          </span>
        </old-link>
      </li>
      <li class="user-menu__nav-item">
        <old-link class="user-menu__link" to="">{{$t('header.user.feedback')}}</old-link>
      </li>
      <li class="user-menu__nav-item">
        <old-link class="user-menu__link" to="">{{$t('header.user.loyalty')}}</old-link>
      </li>-->
      <li class="user-menu__nav-item">
        <button class="user-menu__link" type="button" @click="logout">
          {{ $t('header.user.logout') }}
          <svg
            class="user-menu__link-icon"
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)" fill="#282828">
              <path
                d="M7.973 14.645h-5.98a.665.665 0 01-.664-.664V2.02c0-.367.298-.665.664-.665h5.98a.664.664 0 100-1.329h-5.98A1.996 1.996 0 000 2.021v11.96c0 1.099.894 1.993 1.993 1.993h5.98a.664.664 0 100-1.329z"
              />
              <path
                d="M15.802 7.527l-4.04-3.987a.664.664 0 10-.933.946l2.887 2.85H5.98a.664.664 0 100 1.328h7.736l-2.887 2.85a.664.664 0 10.933.946l4.04-3.987a.666.666 0 000-.946z"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <path fill="#fff" d="M0 0h16v16H0z"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </li>
    </ul>
  </section>
</template>

// TODO:Всё, что закоммнетировано в этом файле, закомментировано на время
первого релиза, т.к. пока успеваем только то, что есть.

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapGetters({
      user: 'userData/user'
    }),
  },

  methods: {
    ...mapMutations({
      removeUser: 'userData/removeUser',
    }),
    logout() {
      this.$axios
        .post('napi/auth/logout')
        .then(() => {
          this.removeUser();
          this.$cookies.remove('PHPSESSID');
          this.$parent.$emit('onModalClose');
          if (window.location.pathname.includes('/account/')) this.$router.push('/')
        });
    }
  },
};
</script>

<style lang="scss">
.user-menu {
  @media (min-width: 768px) {
    width: 100%;
  }

  @media (min-width: $desktop-mid) {
    width: 220px;
  }
}

.user-menu__user {
  display: flex;

  @media (min-width: $desktop-mid) {
    align-items: center;
  }
}

.user-menu__user-avatar {
  position: relative;
  z-index: 2;

  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  margin-right: 12px;

  border-radius: 50%;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    width: 56px;
    height: 56px;

    background-image: url("data:image/svg+xml,%3Csvg width='56' height='56' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M56 28a28 28 0 01-41.49 24.537l1.06-1.928A25.8 25.8 0 0053.8 28H56z' fill='%23FC3F71'/%3E%3Cpath d='M56 28A28 28 0 0014.51 3.463l1.06 1.929A25.8 25.8 0 0153.8 28H56z' fill='%23007AFF'/%3E%3Cpath d='M14.507 3.466a28 28 0 00-.002 49.067l1.06-1.927a25.8 25.8 0 01.002-45.213l-1.06-1.927z' fill='%231AD6BA'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 100%;
  }
}

.user-menu__user-avatar--no-avatar::before {
  content: none;
}

.user-menu__user-avatar-image {
  position: relative;
  z-index: 1;

  box-sizing: border-box;
  display: block;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-menu__user-avatar-image--no-avatar {
  border: none;
}

.user-menu__username {
  margin-bottom: 3px;

  font-size: 16px;
  line-height: 1.4;
  font-weight: 600;
  color: #282828;

  @media (min-width: $desktop-mid) {
    font-size: 13px;
  }
}

.user-menu__user-email {
  font-size: 13px;
  line-height: 1.4;
  color: #7e7e7e;

  word-break: break-all;

  @media (min-width: $desktop-mid) {
    display: none;
  }
}

.user-menu__nav {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
}

.user-menu__link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  box-sizing: border-box;

  font-size: 13px;
  line-height: 1.4;
  color: #282828;
  text-decoration: none;

  border-bottom: 1px solid #f4f4f4;
  background-color: transparent;
  appearance: none;
  cursor: pointer;

  &:hover {
    color: #007aff;

    .user-menu__link-icon g {
      fill: #007aff;
    }
  }

  @media (min-width: $desktop-mid) {
    padding: 8px 0;

    border: none;
  }
}

.user-menu__link-text {
  position: relative;
}

.user-menu__link-indicator {
  content: "";
  position: absolute;
  top: 0;
  right: -8px;

  width: 6px;
  height: 6px;

  border-radius: 3px;
  background-color: #fc3f71;
}

.user-menu__link-icon {
  margin-left: 8px;
}

.user-menu__nav-item:last-child .user-menu__link {
  border-bottom: none;
}

.user-menu__link-text--header {
  margin: 0;
  padding: 8px 0 0;

  color: $text-black;
  font-size: 13px;
  font-weight: 600;
}

.user-menu__nav-item--left-padding .user-menu__link {
  padding-left: 16px;
}
</style>
