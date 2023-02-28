import { ref } from 'vue'
let flag = ref(true)
const mySwitch = () => {
    const pre_box = document.querySelector('.pre-box')
    const img = document.querySelector("#avatar")
    const text = document.querySelector("#buttonText")
    if (flag.value) {
        pre_box.style.transform = "translateX(100%)"
        pre_box.style.backgroundColor = "#BFE3F1FF"
        img.src = require("@/assets/imgs/loginLogo2.png")
        text.innerHTML="我是流程角色，登录平台！"
    }
    else {
        pre_box.style.transform = "translateX(0%)"
        pre_box.style.backgroundColor = "#c9e8c5"
        img.src = require("@/assets/imgs/loginLogo.png")
        text.innerHTML="我是消费者，免登录溯源！"
    }
    flag.value = !flag.value
}
export default mySwitch
