// Generated by CoffeeScript 1.6.3
$(function() {
  var btnReg, loginBtn, loginModal_reg, loginOut, loginregModal, mainLoginOut, myAliLogin, myQqLogin, myReg, myWeiboLogin, mylogin, userBtn;
  mylogin = $('#mylogin');
  mylogin.on('click', loginFunc.myLoginClick);
  loginBtn = $('#btn-login');
  loginBtn.on('click', loginFunc.loginBtnClick);
  userBtn = $('#loginOutBtn');
  userBtn.on('click', loginFunc.userinfoClick);
  loginOut = $('#userinfo');
  loginOut.on('click', loginFunc.userBtnClick);
  btnReg = $('#btn-reg');
  btnReg.on('click', loginFunc.regBtnClick);
  myReg = $('#myreg');
  myReg.on('click', loginFunc.myRegClick);
  myAliLogin = $('#btn-aliyunlogin');
  myAliLogin.on('click', loginFunc.myAliLoginClick);
  myWeiboLogin = $('#btn-weibologin');
  myWeiboLogin.on('click', loginFunc.myWeiboLoginClick);
  myQqLogin = $('#btn-qqlogin');
  myQqLogin.on('click', loginFunc.myQqLoginClick);
  loginModal_reg = $('#loginModal_reg');
  loginModal_reg.on('click', loginFunc.loginModalRegClick);
  mainLoginOut = $('#mainLoginOut');
  mainLoginOut.on('click', loginFunc.loginOutClick);
  $('#login-mail, #login-pwd').on('keydown', loginFunc.loginInputKeydown);
  $('#reg-mail, #reg-pwd, #reg-repwd, #reg-digits').on('keydown', loginFunc.regInputKeydown);
  loginregModal = $('#loginModal,#regModal');
  loginregModal.on('hide.bs.modal', loginFunc.onLoginRegModalHide);
});
