<template>
  <div class="build-info">
    <h2>Build info</h2>
    <pre>{{ buildInfo }}</pre>
  </div>
</template>
<script>
export default {
  layout: "clean",
  async asyncData(context) {
    let buildInfo = {};
    if (process.server) {
      const { res } = context;
      buildInfo = JSON.stringify(res.buildInfo, null, 2);
    }
    return { buildInfo };
  },
};
</script>
<style scoped>
.build-info {
  margin: 30px;
}

pre {
  font-size: 15px;
}
</style>
