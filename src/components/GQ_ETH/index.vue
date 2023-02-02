<template>
  <div>
    <i class="el-icon-menu" @click="handleDownload"></i>
  </div>
</template>

<script>
export default {
  name: 'GQ_ETH',
  data() {
    return {
      url: 'https://github.com/Bmaili/ETH'
    }
  },
  methods: {
    handleDownload() {
      window.open(this.url)
    }
  }
}
</script>
