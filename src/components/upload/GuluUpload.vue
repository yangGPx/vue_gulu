<template>
<div>
  <div class="upload-content" @click="uploadFile">
    <slot></slot>
  </div>
    <ul class="upload-list">
      <li v-for="item in fileList" :key="item.name">
        <template v-if="item.status === 'uploading'">
          <p>进度条</p>    
        </template>
        <span class="image-wrap">
          <img :src="item.url">
        </span>
        <p class="name">{{ item.name }}</p>
        <span @click="onRemoveFile(item)" class="icon-wrapper">
          <g-icon icon="delete"></g-icon>
        </span>
      </li>
    </ul>
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
    },
    name: {
      type: String,
    },
    method: {
      type: String,
      default: 'POST',
    },
    parseResponse: {
      type: Function,
      default(){
        return null;
      }
    },
    fileList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    uploadFile() {
      const input = document.createElement('input');
      input.type = 'file',
      input.addEventListener('change', (e) => {
        let rawFile = e.target.files[0]
        this.updateFile(rawFile);
        input.remove();
      });
      // file.multiple = true
      input.click();
    },
    beforeUploadFile(rawFile, newName){
      // 这里开启上传进度
      let { size, type } = rawFile;
      this.$emit('update:fileList', [...this.fileList, {name: newName, size, type, status: 'uploading'}])
    },
    updateFile(rawFile) {
      const newName = this.generateName(rawFile.name); // 在一开始就验证名字，保证名字在整个过程中保持一致
      this.beforeUploadFile(rawFile, newName);
      const form = new FormData();
      form.append(this.name, rawFile);
      this.doUploadFile(form, (response) =>{
        let { name, size, type } = rawFile;
        let data = this.parseResponse(response);
        this.afterUploadFile(newName, data.data.url)
      });
    },
    afterUploadFile(newName, url) {
      // 这里得找到之前一开始上传的那个文件对象，将他的status状态改为success
      const item = this.fileList.filter((e) => e.name === newName)[0];
      const index = this.fileList.indexOf(item);
      // 单向数据流，不能直接更改父组件的数据
      const arrCopy = JSON.parse(JSON.stringify(this.fileList));
      arrCopy.splice(index, 1 , {...item, url, status: 'success'});
      this.$emit('update:fileList', arrCopy);
    },
    generateName(name) {
      while (this.fileList.filter((i) => i.name === name).length > 0) {
        let dotIndex = name.lastIndexOf('.');
        name = name.substr(0, dotIndex) + '(1)' + name.substr(dotIndex);
      }
      return name;
    },
    doUploadFile(formData, success) {
      const xhr = new XMLHttpRequest();
      xhr.open(this.method, this.action);
      xhr.onload = () => {
        success(xhr.response);
      }
      xhr.send(formData);
    },
    onRemoveFile(item) {
      let arr = this.fileList;
      arr.splice(arr.indexOf(item), 1);
      this.$emit('update:fileList', arr);
    },
  }
}
</script>
<style lang="scss" scoped>
  .upload-content{
    display: inline-block;
  }
  .upload-list{
    &>li{
      display: flex;justify-content: flex-start;align-items: center;position: relative;
      border: 1px solid orange;padding: 10px;border-radius: 15px;font-size: 14px;
      margin: 10px 0;
        img{
          width: 80px;height: 80px; margin-right: 10px;
        }
        p.name{
          flex-grow: 1;word-break: break-all;
        }
        .icon-wrapper{
          position: absolute;
          top: 0;
          right: 5px;
        }
        .icon{
          font-size: 25px;
          fill: #999;
          &:hover{
            fill: orange;cursor: pointer;
            transform: rotate(360deg);
            transition: transform 1s;
          }
        }
    }
  }
</style>