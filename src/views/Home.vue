<template>
  <div class="home">
    <Chatroom />
  </div>
</template>

<script>
import Chatroom from '@/components/Chatroom.vue'; 

export default {
  name: 'Home',
  components: {
    Chatroom,
  },
}
</script>
