<script src="collapse-transition-mixins.js"></script>
<template>
	<div class="collapse-item"  :class="{'is-active': isActive}">
    <div class="collapse-title-wrapper" @click="handleHeaderClick">
      <slot  name="title"></slot>
      <i class="el-collapse-item__header__arrow el-icon-arrow-right"></i>
    </div>

    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"

      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
    >
      <div class="collapse-item-inner"  v-show="isActive">
        <div class="collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </transition>
	</div>
</template>

<script>
	export default {
    props: {
      title: String,
      name: {
        type: [String, Number],
        default() {
          return (new Date()).getTime().toString();
        }
      }
    },
		data() {
			return {
        contentWrapStyle: {
          height: 'auto',
          display: 'block'
        },
        contentHeight: 0
      }
		},
    computed: {
      isActive() {
        return this.$parent.activeNames.indexOf(this.name) > -1;
      }
    },
    watch: {
      'isActive'(value) {
      }
    },

    methods: {
      handleHeaderClick() {
        this.$parent.handleItemClick(this);
      },

//      动画
      beforeEnter(el) {
        addClass(el, 'collapse-transition');
        if (!el.dataset) el.dataset = {};

        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;

        el.style.height = '0';
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },

      enter(el) {
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
          el.style.height = el.scrollHeight + 'px';
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
          el.style.height = '';
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }

        el.style.overflow = 'hidden';
      },

      afterEnter(el) {
        // for safari: remove class then reset height is necessary
        removeClass(el, 'collapse-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
      },

      beforeLeave(el) {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;

        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
      },

      leave(el) {
        if (el.scrollHeight !== 0) {
          // for safari: add class after set height, or it will jump to zero height suddenly, weired
          addClass(el, 'collapse-transition');
          el.style.height = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },

      afterLeave(el) {
        removeClass(el, 'collapse-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }
    },
	}

  function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.add(clsName);
      } else {
        if (!hasClass(el, clsName)) {
          curClass += ' ' + clsName;
        }
      }
    }
    if (!el.classList) {
      el.className = curClass;
    }
  };


  function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.remove(clsName);
      } else {
        if (hasClass(el, clsName)) {
          curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
      }
    }
    if (!el.classList) {
      el.className = curClass.trim();
    }
  };
</script>

<style scoped>
.collapse-title-wrapper{
  height: 43px;
  line-height: 43px;
  padding-left: 15px;
  background-color: #fff;
  color: #48576a;
  cursor: pointer;
  border-bottom: 1px solid #dfe6ec;
  font-size: 13px;
}
  .collapse-item-inner{
    will-change: height;
    background-color: #fbfdff;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid #dfe6ec;
  }
  .collapse-item__content{
    padding: 10px 15px;
    font-size: 13px;
    color: #1f2d3d;
    line-height: 1.769230769230769;
  }

</style>
