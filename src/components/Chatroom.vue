<template>
  <div class="chat_container">
    <div class="chat_content rounded-t-lg">
      <ul class="chat_item">

        <li class="chat_list" v-for="(item, key) in this.chatroom" :key="'chat_' + key">
          <div class="user_head content_list_left" v-if="item.username != username">
            <p :title="item.username" @mouseover="nameNum = 10" @mouseleave="nameNum = 1">{{ item.username.substring(0, nameNum) }}</p>
            <span>{{ item.message }}</span>
          </div>


          <div class="user_head user_head_me text-right border-current border content_list_right" v-if="item.username === username">
            <span>{{ item.message }}</span>
            <p class="ml-4" :title="item.username">我</p>
          </div>
        </li>


      </ul>
    </div>

    <div class="chat_content flex flex-col sm:flex-row rounded-b-lg" v-if="chating">
      <div>
        <p class="my-1">我 ({{ username }}) : </p>
        <input class="my-1" type="text" placeholder="輸入訊息" v-model.trim="message" @keyup.enter="addMsg()" key="msg">
        <button class="btn my-1" @click="addMsg()">送出</button>
      </div>
      <div>
        <font-awesome-icon class="icon fa-lg" :icon="['fas', 'arrow-circle-up']" @click="chatScrollToTop()"/>
        <font-awesome-icon class="icon fa-lg" :icon="['fas', 'arrow-circle-down']" @click="chatScrollToBottom()"/>
      </div>
    </div>

    <div class="chat_content" v-else>
      <div>
        <input type="text" placeholder="你的名字(最多10字)" v-model.trim="username" @keyup.enter="naming()" key="name">
        <button class="btn" @click="naming()">確認</button>
      </div>
    </div>


  </div>
</template>

<script>
import firebase from "firebase/app"
import Cookies  from 'js-cookie';

export default {
  data() {
    return {
      nameNum: 1,
      chating: false,
      chatroom: [],
      message: '',
      username: '',
    }
  },
  methods: {
    naming() {
      if(this.username !== '') {
        Cookies.set('justChat_3333', this.username, { expires: 1 } )
        this.chating = true 
      }
    },
    addMsg() {
      if(this.message !== '') {
        const db = firebase.database()
        const chatroomRef = db.ref('message')
        const key = chatroomRef.push().key

        chatroomRef.child(key).set({
          message: this.message,
          username: this.username,
        })
        this.chatScrollToBottom()
        this.message = ''
      }
    },
    chatScrollToBottom () {
      this.$nextTick(() => {
        document.querySelector('.chat_item').scrollTop = document.querySelector('.chat_item').scrollHeight
      })
    },
    chatScrollToTop () {
      this.$nextTick(() => {
        document.querySelector('.chat_item').scrollTop = 0
      })
    },
    getChatroom() {
      const db = firebase.database()
      const chatroomRef = db.ref('message')

      chatroomRef.on("value", (snapshot) => {
        const data = snapshot.val()
        this.chatroom = data;
        console.log(this.chatroom)
        this.chatScrollToBottom()
      })
    }
  },
  watch: {
    chatroom: {
      handler() {
        this.chatScrollToBottom()
      },
      deep: true,
    },
    username: {
      handler() {
        this.username = this.username.substring(0, 10)
      },
      deep: true,
    }
  },
  mounted() {
    this.getChatroom()
    if(Cookies.get('justChat_3333')) {
      this.username = Cookies.get('justChat_3333')
      this.chating = true
    }
  },
  
}
</script>

<style lang="scss" scoped>

  .chat_container {
    @apply w-screen pt-24 ;

    .chat_content {
      @apply  w-full lg:w-30rem max-w-lg  m-auto bg-gray-200 border bg-white border-current;
      &>div {
        width: fit-content;
        @apply m-auto py-4;
      }

      .chat_item {
        @apply h-96 overflow-auto;

        .chat_list {
          @apply p-4;
        }
      }
    }
  }

  .user_head {
    @apply leading-4 text-base bg-white p-1 rounded-sm;
    p {
      // @apply h-6 w-6;
      @apply min-w-1.5rem text-center inline-block bg-gray-600 text-white p-1 rounded-full; 
    }
    img {
      @apply inline rounded-full;
    }

    span {
      @apply ml-4;
    }
  }
  .user_head_me {
    p {
      @apply bg-white text-gray-600 border border-current;
    }
  }
  

  .btn {
    padding: 1px 6px;
    @apply ml-4 border-current border rounded-lg;
  }

  .icon {
    @apply mx-1 cursor-pointer;
  }

  input[type=text] {
    @apply w-2/3;
  }

  .content_list_right {
    @apply flex justify-end items-center;
  }
  .content_list_left {
    @apply flex justify-start items-center;
  }

  span {
    @apply leading-5;
  }

</style>
