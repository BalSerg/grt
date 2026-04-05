export default {
  methods: {
    async requestUserVerification(data) {
      const { result } = await this.$axios.$post('/napi/auth2/verification/sms', data)
      return { guid: result.verificationGuid, isVerified: result.alreadyVerified, timeLimitSec: result.timeLimitSec }
    }
  }
};
