const getRecipientEmail=(users,userLogged)=>{
   return users.filter(userToFilter=>userToFilter != userLogged?.email)[0];
}
export default getRecipientEmail;