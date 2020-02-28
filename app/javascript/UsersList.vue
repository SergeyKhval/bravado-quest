<template>
  <div id="app">
    <ul class="users-list">
      <div class="search-wrapper">
        <input class="search" type="text" :value="search" @input="onInput" autofocus>
      </div>
      <recycle-scroller class="scroller" :items="filteredUsers" :item-size="156" key-field="email" v-slot="{item}">
        <user-card :user="item" :search="search"/>
      </recycle-scroller>
    </ul>
  </div>
</template>

<script>
  import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
  import {RecycleScroller} from 'vue-virtual-scroller'
  import debounce from 'lodash/debounce'
  import get from 'lodash/get'
  import UserCard from './UserCard'

  function predicate(user) {
    return user.email.toLowerCase().includes(this.search) ||
      user.name.toLowerCase().includes(this.search) ||
      user.title.toLowerCase().includes(this.search) ||
      user.address.toLowerCase().includes(this.search) ||
      user.city.toLowerCase().includes(this.search)
  }

  export default {
    components: {RecycleScroller, UserCard},
    async mounted() {
      try {
        const res = await fetch('/users')
        this.users = await res.json()
      } catch (e) {
        console.error(e)
      }
    },
    data() {
      return {
        users: []
      }
    },
    computed: {
      search: {
        get() {
          return get(this.$route, 'query.search', '')
        },
        set(val) {
          const query = val ? {search: val} : {}

          this.$router.push({query})
        }
      },
      filteredUsers() {
        return this.users.filter(predicate.bind(this))
      }
    },
    methods: {
      onInput: debounce(function (event) {
        this.search = event.target.value
      }, 250)
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  * {
    box-sizing: border-box;
  }

  body {
    font-family: Roboto;
    background: #eee
  }

  .users-list {
    width: 581px;
    height: 643px;
    overflow: hidden;
    margin: 0 auto;
    background: white;
    padding: 12px 20px;
  }

  .scroller {
    height: 100%;
  }

  .search-wrapper {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      background: url("Shape.svg");
      height: 18px;
      width: 18px;
      left: 19px;
      top: 50%;
      transform: translateY(-100%);
    }
  }

  .search {
    background: #FAFAFA;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    height: 48px;
    width: 100%;
    margin-bottom: 20px;
    border: none;
    font-size: 24px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.75);
    padding-left: 50px;
  }
</style>
