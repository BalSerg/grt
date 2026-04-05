<template>
  <img
    ref="avatarImg"
    :src="GET_AVATAR_SRC"
    width="100%"
    height="100%"
    alt=""
    @error="getDefaultImage"
  >
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import Avatar from "@/static/nimages/account/accountAvatarLogin.svg"


export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      GET_AVATAR_SRC: 'userData/GET_AVATAR_SRC'
    })
  },
  methods: {
    ...mapMutations({
      SET_AVATAR_SRC: 'userData/SET_AVATAR_SRC'
    }),
    getDefaultImage() {
      this.SET_AVATAR_SRC(Avatar)
    }
  }
}
</script>
