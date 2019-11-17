<template>
  <div :class="colClass" 
       :style="offsetToPadding">
    <div style="border: 1px solid red">
    <slot></slot>
    </div>
  </div>
</template>
<script>
const validator = (value) => {
  return Object.keys(value).some(item => {
    return ['span', 'offset'].includes(item);
  })
}
export default{
  name: 'gridRow',
  data(){
    return{
      gutter:0
    }
  },
  props:{
    span:{
      type: [String, Number]
    },
    offset: {
      type: [String, Number]
    },
    phone: {
      type: Object,
      validator
    },
    ipad: {
      type: Object,
      validator
    },
    pc: {
      type: Object,
      validator
    }
  },
  computed:{
    offsetToPadding(){
      const {gutter} = this;
      return gutter && {paddingLeft: `${gutter/2}px`,paddingRight:`${gutter/2}px` }
    },
    colClass() {
      let {span, offset, phone, ipad, pc} = this;
      return [
        'grid-col', 
        span && `col-${span}`, 
        offset && `offset-${offset}`,
        ...[phone && `phone-col-${phone.span}`],
        ...[ipad && `ipad-col-${ipad.span}`],
        ...[pc && `pc-col-${pc.span}`]
      ]
    }
  }
}
</script>
<style lang="scss">
  .grid-col{
    min-height: 32px;
    line-height: 32px;  
    width: 50%;
    $class-prefix: col-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: $n / 24 * 100%;
      }
    }
    $offset-prefix: offset-;
    @for $n from 1 through 24 {
      &.#{$offset-prefix}#{$n} {
        margin-left: $n / 24 * 100%;
      }
    }

    @media (min-width:567px){
      $phone-class: ipad-col-;
      @for $n from 1 through 24{
        &.#{$phone-class}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      $phone-offset: ipad-offset-;
      @for $n from 1 through 24 {
        &.#{$phone-offset}#{$n}{
          margin-left: $n / 24 * 100%;
        }
      }
    }
    @media (min-width:768px){
      $phone-class: narrow-pc-col-;
      @for $n from 1 through 24{
        &.#{$phone-class}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      $phone-offset: narrow-pc-offset-;
      @for $n from 1 through 24 {
        &.#{$phone-offset}#{$n}{
          margin-left: $n / 24 * 100%;
        }
      }
    }
    @media (min-width:992px){
      $phone-class: pc-col-;
      @for $n from 1 through 24{
        &.#{$phone-class}#{$n} {
          width: $n / 24 * 100%;
        }
      }
      $phone-offset: pc-offset-;
      @for $n from 1 through 24 {
        &.#{$phone-offset}#{$n}{
          margin-left: $n / 24 * 100%;
        }
      }
    }
  }
</style>