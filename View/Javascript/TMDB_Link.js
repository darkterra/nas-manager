/**
 * 
 * TMDB_Link.js : 
**/

'use strict';
let NNM = NNM || {};

// ,
//   renameTMDB: 'Rename with TMDB',


// , {
//           id: 'editTMDB',
//           batch: 'item',
//           method: 'editFileTMDB',
//           icon: 'edit',
//           value: webix.i18n.filemanager.renameTMDB
//         },


// editFileTMDB: function(t) {
//     // webix.isArray(t) && (t = t[0]), this.getActiveView() && this.getActiveView().edit && this.getActiveView().edit(t);
//     // webix.message(webix.isArray(t));
//     $$("s1").setValue("");$$("resultSearch").clearAll();$$("resultBig").clearAll();$$("my_win").show();
//   },



NNM.FileManager = (function(self, extentionName) {
  let baseIMG = 'http://image.tmdb.org/t/p/';
  let tailleIMG = 'w92';
  let noIMG = 'https://assets.tmdb.org/assets/7f29bd8b3370c71dd379b0e8b570887c/images/no-poster-' + tailleIMG + '-v2.png';
  noIMG = 'https://assets.tmdb.org/assets/7f29bd8b3370c71dd379b0e8b570887c/images/no-poster-w185-v2.png';
  
  let baseQuery = 'http://api.themoviedb.org/3/search/multi?query=';
  let apiKey = '&api_key=030aa3a0192fff64bad4b5465fabcb11';
  let nbPage = '&page=1';
  let language = '&language=fr&include_image_language=fr';
  let query = baseQuery + 'star+wars' + apiKey + nbPage + language;
  
  
  
  let header = {
    container:"dataA",
    rows:[
      {view:"template", template:"", type:"header", height:5 },
      {cols:[
        { id:"s1", view:"search", placeholder:"Enter name of a movie or a serie...",
          /*css:"demo_search", click: majInfo, hotkey: "enter"*/ }
      ]}
    ]
  };
  
  
  let resultSearch = {
    view:"dataview",
    id: 'resultSearch',
    select: true,
    type: {
      width: 250,
      height: 150
    },
    template: "html->item_tpl",
    scheme:{
  		$init:function(obj) {
  	    if (obj.poster_path == null) {
  		    webix.message('no IMG Path for this : ' + obj.title);
  		    obj.poster_path = noIMG;
  		  }
  		  else {
  			  if (obj.media_type == 'movie') {
  					obj.poster_path = baseIMG + tailleIMG + obj.poster_path;
  			  }
  			  else if (obj.media_type == 'tv') {
  			    obj.title = obj.name;
  			    obj.release_date = obj.first_air_date;
  			    obj.poster_path = baseIMG + tailleIMG + obj.poster_path;
  			  }
  		  }
  		}
  	},
    xCount: 3, //the number of items in a row
    yCount: 3 //the number of items in a column
  };
  
  
  let resultBig = {
    id: "resultBig",
    view:"dataview",
    scroll:false,
    template: "html->item_big",
    width: 500,
    // position: 'center',
    type: {
      width: 500,
      height: 450
    }
  };
    
  let mainWindow = webix.ui({
    view: "window",
    id: "my_win",
    minHeight: 100,
    autoheight: true,
    minWidth: 400,
    autowidth: true,
    move: true,
    resize: true,
    modal:true,
    animate:{type:"flip", subtype:"vertical"},
    head: {
      cols: [
        {
          view: 'template',
          template: 'Recherche Film(s) / Serie(s) (TheMovieDB)'
        },
        // { gravity: 1 },
        // {
          
        // },
        { 
          view:"button",
          type: "htmlbutton",
          css: 'webix_icon_button',
          label: '<span class="fa fa-close"></span>',
          autowidth:true,
          click:('$$("s1").setValue("");$$("resultSearch").clearAll();$$("resultBig").clearAll();$$("my_win").hide();')
        }
      ]
      // view:"button", type: "htmlbutton", label: '<span class="webix_icon fa-close"></span>', inputWidth:40, click:("$$('my_win').close();")
      // css: "icon_back_btn",
    },
    body: {
      rows: [
        header,
        {cols: [
          resultSearch,
          resultBig
        ]}
      ]
    }
  });
  
  // mainWindow.show();
  
  // $$('resultBig').bind($$('resultSearch'));
  
  
  function majInfo() {
    $$("resultSearch").clearAll();
    $$('resultBig').clearAll();
    
    var searchQuery = $$("s1").getValue().replace(' ', '+');
    if (searchQuery != "") {
      // query = baseQuery + searchQuery + apiKey + nbPage + language;
      query = baseQuery + searchQuery + apiKey + language;
      
      webix.ajax(query, function(data) {
        var jsonData = JSON.parse(data);
        
        $$("resultSearch").parse(jsonData.results);
      });
    }
  };
  
  function majInfoBig(item) {
    $$('resultBig').clearAll();
    
    var taille_Max = 500;
    var temp;
    
    if (item.poster_path.includes(tailleIMG)) {
      temp = item.poster_path.split(tailleIMG);
      temp = temp[0] + 'w185' + temp[1];
      item.poster_path_Big = temp;
    }
    else {
      item.poster_path_Big = noIMG;
    }
    
    
    if (item.overview !== null) {
      if (item.overview.length > taille_Max) {
        item.overview = item.overview.substring(0, taille_Max) + '...';
      }
    }
    else {
      item.overview = 'Not Found...';
    }
    
    $$('resultBig').parse(item);
  };
  
  $$('s1').attachEvent("onKeyPress", function(code, e) {
    if (code === 13 && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      majInfo();
      return false;
    }
  });
  
  $$('resultSearch').attachEvent("onItemClick", function(id, e, node){
    majInfoBig(this.getItem(id));
  });
  
  // console.log(extentionName);
})(NNM.FileManager || {}, 'SelectMovieExtention');


export default NNM;