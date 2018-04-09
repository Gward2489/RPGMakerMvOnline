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

DataManager.loadGameWithoutRescue(1);

StorageManager.load = function(savefileId) {
    if (savefileId > 0){
    $.get("http://127.0.0.1:8000/datamanager/load/", function(data){
        let parsedJson = JSON.parse(data)
        console.log(parsedJson)
      if (data === null) return; //Loads new game if no data
       DataManager.createGameObjects();
       DataManager.extractSaveContents(JsonEx.parse(parsedJson));
    }).fail(function(){
      window.alert("Cloudsave Failed!");
    });
    }
  };
