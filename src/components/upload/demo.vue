<template>
  <div class="use-upload">
    <g-upload action="http://localhost:7777/upload"
      name="uploads"
      :parse-response="parseResponse"
      :file-list.sync="fileList"
      @on-success="onSuccess">
      <g-button icon="upload">上传</g-button>
    </g-upload>
  </div>
</template>
<script>
export default {
  name: 'UploadDemo',
  data() {
    return {
      imgSrc: '',
      fileList: [],
    }
  },
  methods: {
    onSuccess(res) {
      console.log(res);
      this.imgSrc = res.data.url;
    },
    parseResponse(text) {
      console.log(text)
      return JSON.parse(text); 
    },
  }
}
</script>
<style lang="scss" scoped>
.use-upload{
  width: 360px;border: 1px solid red;
  padding: 10px;
}
.preview-img{
  max-width: 500px;
}
.icon{
  fill: pink;
}
.g-button:hover{
  ::v-deep .icon{
    fill: pink;
  }
}
</style>