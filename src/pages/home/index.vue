<template>
  <view> 
       <button id='send'>发送消息到服务器</button>
       <div>
            <h3>服务器响应的消息：</h3>
            <i id='msg'></i>
       </div></view>
</template>

<script>
	import io from '../../js_sdk/huzhen555-uniappsocketio/uniapp.socket.io.js'
export default {
	data(){
		return {
			socket:null
		}
	},
  methods: {
 
  },

  onLoad(){
   
  },
  mounted() {
  	// this.socket = io("http://localhost:3000" || "/");
	const socket = io('http://127.0.0.1:3000');
  }
};
</script>

<style>
</style>