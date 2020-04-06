<template>
<div @click="upload">
  <slot ></slot>
  <img src="" id="images">
</div>
</template>
<script>
export default {
  name: 'ImageUpload',
  data() {
    return {
      file: ''
    }
  },
  props: {
    action: {
      type: String,
      required: true,
    }
  },
  methods: {
    upload() {
      const file = document.createElement('input');
      file.type = 'file',
      file.addEventListener('change', (e) => {
        const form = new FormData();
        form.append('uploads', e.target.files[0]);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.action);
        xhr.onload = function() {
          document.querySelector('#images').setAttribute('src', xhr.response);
        }
        xhr.send(form);
      })
      file.click();
    },
  }
}
</script>
<style lang="scss">
  .gulu-image-upload{
    display: inline-block;
  }
</style>