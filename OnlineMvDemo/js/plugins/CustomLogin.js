// When game starts, render a custom login form 

function MMO_Scene_Title() {
    this.initialize.apply(this, arguments);
}

MMO_Scene_Title.prototype = Object.create(Scene_Base.prototype);
MMO_Scene_Title.prototype.constructor = MMO_Scene_Title;

MMO_Scene_Title.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

MMO_Scene_Title.prototype.reBindInput = function() {
    Input.initialize();
};

MMO_Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
};

MMO_Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
    this.createLoginForm();
};

MMO_Scene_Title.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
};

MMO_Scene_Title.prototype.isBusy = function() {
    return Scene_Base.prototype.isBusy.call(this);
};

MMO_Scene_Title.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
};

MMO_Scene_Title.prototype.renderLogin = function() {
    $("#ErrorPrinter").html(
        '<div id="LoginForm" class="panel panel-primary" style="width:'+(Graphics.boxWidth - (Graphics.boxWidth / 3))+'px">'+
            '<div class="panel-heading">Login</div>'+
            '<div class="panel-body">'+
                '<div id="loginErrBox"></div>'+
                '<div class="input-group">'+
                    '<span class="input-group-addon" id="username-addon"><i class="fa fa-user"></i></span>'+
                    '<input type="text" class="form-control login-input" id="inputUsername" placeholder="Username" aria-describedby="username-addon">'+
                '</div><br>'+
                '<div class="input-group">'+
                    '<span class="input-group-addon" id="password-addon"><i class="fa fa-lock"></i></span>'+
                    '<input type="password" class="form-control login-input" id="inputPassword" placeholder="Password" aria-describedby="password-addon">'+
                '</div><br>'+
                '<button id="btnConnect" class="btn btn-primary">Connect</button>'+
                '<button id="btnRegister" class="btn btn-default">Register</button>'+
      '<button id="btnForgotPassword" class="btn btn-link btn-sm">Forgot Password?</button>'+
            '</div>'+
        '</div>'
    );

    //Bind commands
    let titleObj = this;
    $(".login-input").keypress(function(e){
        if (e.which == 13) { //enter
            titleObj.connectAttempt();
        }
    });

    $("#inputUsername").tap(function(){$("#inputUsername").focus();});
    $("#inputPassword").tap(function(){$("#inputPassword").focus();});
    $("#btnConnect").bind("click touchstart",function(){titleObj.connectAttempt();});
    $("#btnRegister").bind("click touchstart",function(){titleObj.createRegistrationForm();});
    $("#btnForgotPassword").bind("click touchstart",function(){titleObj.createLostPasswordForm();});
    $("#inputUsername").focus();

};

//refactor for py server! ( ͡☉ ͜ʖ ͡☉)
MMO_Scene_Title.prototype.connectAttempt = function(){
    let titleObj = this;
    let username = $("#inputUsername").val();
    let password = $("#inputPassword").val();

    if (username.length === 0)
        return this.displayError("You must provide a username!");
    if (password.length === 0)
        return this.displayError("You must provide a password!");

    this.displayInfo('Connecting <i class="fa fa-spin fa-spinner"></i>');
    $.ajax({
        url: "http://127.0.0.1:8000/datamanager/login/",
        type: "POST",
        data: { "userName": username, "password": password },
        dataType: "application/json"
    }).done(function (data) {
        if (data.err)
            return that.displayError("Error : " + data.err);
        if (data) {
            //need logic to take save data out of jason and pass it into
            //datamanager.loadgamewithoutrescue(savefileId)
            that.fadeOutAll();
            SceneManager.goto(Scene_Map);
            return that.displayInfo("Ok : "+data.msg);
        }
  });
};