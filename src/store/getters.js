const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  role: state => state.user.role,
  sex: state => state.user.sex,
  phone: state => state.user.phone,
}
export default getters
