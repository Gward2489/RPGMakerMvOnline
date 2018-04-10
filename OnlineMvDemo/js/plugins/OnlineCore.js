let csrftoken = Cookies.get('csrftoken')

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    headers: {
        "X-CSRFToken": "csrftoken",
    },
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

StorageManager.save = function (savefileId, json) {
    if (savefileId > 0) {
        $.ajax({
            url: "http://127.0.0.1:8000/datamanager/save/",
            type: "POST",
            data: { "saveFileId": savefileId, "dataString": json },
            dataType: "application/json"
        })
    }
};

DataManager.loadGameWithoutRescue = function(savefileId) {
    if (savefileId > 0){
      var globalInfo = this.loadGlobalInfo();
      var json = StorageManager.load(savefileId);
      return true;
    }
};


StorageManager.load = function(savefileId) {
    if (savefileId > 0){
        $.get("http://127.0.0.1:8000/datamanager/load/", function(data){
            if (data === null) return; //Loads new game if no data
            console.log(JsonEx.parse(data))
            DataManager.createGameObjects();
            DataManager.extractSaveContents(JsonEx.parse(data));
            SceneManager.goto(Scene_Map)
        }).fail(function(){
            window.alert("Cloudsave Failed!");
        });
    }
};


DataManager.loadDatabase = function() {
    var test = this.isBattleTest() || this.isEventTest();
    var prefix = test ? 'Test_' : '';
    for (var i = 0; i < this._databaseFiles.length; i++) {
        var name = this._databaseFiles[i].name;
        var src = this._databaseFiles[i].src;
        this.loadDataFile(name, prefix + src);
    }
    if (this.isEventTest()) {
        this.loadDataFile('$testEvent', prefix + 'Event.json');
    }
    DataManager.loadGameWithoutRescue(2)
};



