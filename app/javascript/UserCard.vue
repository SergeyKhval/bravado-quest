<template>
  <li :class="rootClass">
    <div class="user-card__avatar">
      <img :src="user.avatar" :key="user.email"/>
    </div>
    <div class="user-card__user-info user-info">
      <div class="user-info__main user">
        <div class="user__name" v-html="wrapSearch(user.name)"/>
        <div class="user__email" v-html="wrapSearch(user.email)"/>
        <div class="user__title" v-html="wrapSearch(user.title)"/>
        <div class="user__address" v-html="wrapSearch(userAddress)"/>
      </div>
      <div class="user-info__action">
        <button class="user-action" @click="$emit('select', index)">{{buttonText}}</button>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'UserCard',
    props: {
      user: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      search: {
        type: String,
        default: ''
      }
    },
    computed: {
      rootClass() {
        return {
          'user-card': true,
          'user-card--selected': this.user.isSelected
        }
      },
      regex() {
        return new RegExp(`(${this.search})`, 'gi')
      },
      userAddress() {
        return `${this.user.address}, ${this.user.city}`
      },
      buttonText() {
        return this.user.isSelected ? 'Skip selection' : 'Mark as suitable'
      }
    },
    methods: {
      wrapSearch(str) {
        return this.search ? str.replace(this.regex, (match, group) => `<span class="match">${group}<span/>`) : str
      }
    }
  }
</script>

<style lang="scss">
  .user-card {
    background: #FAFAFA;
    border: 1px solid transparent;
    box-sizing: border-box;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    width: 524px;
    height: 136px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    overflow: hidden;

    &--selected {
      border: 1px solid #4765FF;
    }

    &__avatar {
      width: 134px;
      height: 136px;
      background: #bbb;

      img {
        height: 100%;
        width: auto;
      }
    }

    &__user-info {
      position: relative;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
  }

  .user {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);

    &__name {
      font-size: 24px;
      line-height: 32px;
      color: rgba(0, 0, 0, 0.87);
    }

    &__email {
      font-size: 14px;
      line-height: 16px;
      color: rgba(0, 0, 0, .54);
      position: absolute;
      top: 3px;
      right: 10px;
    }

    &__title,
    &__address {
      font-size: 14px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.543846);
    }

    &__title {
      font-weight: bold;
    }
  }

  .user-info {
    &__main {
      padding: 15px 10px 5px 27px;
    }

    &__action {
      padding-left: 27px;
      flex-grow: 1;
      display: flex;
      align-items: center;
    }
  }

  .match {
    background: #fff73b;

    span {
      background: white;
    }
  }

  .user-action {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #009688;
    background: none;
    border: none;
    text-transform: uppercase;
    min-width: 146px;
    height: 19px;
    cursor: pointer;

    &:hover {
      background: lightgray;
    }
  }
</style>