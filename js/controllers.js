angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('SignInCtrl', function($scope, $state, $ionicPopup, $timeout) {
   

   $scope.signIn = function(user) {
  	var serviceURL = localStorage['serviceURL'];
    console.log('Sign-In', user);
    usuario = user.username;
	clave = user.password;
    
    $.getJSON(serviceURL + 'login.php?codigo='+usuario+'&clave='+clave+'&format=json', function(data) {
    	var datos = 0;
		cursos = data.items;
		$.each(cursos, function(index, curso) {
			localStorage['codUsu'] = usuario;
			$state.go('tab.home');
			datos = 1;
			return true;	
		}); 
		if (datos == 0) {
			var alertPopup = $ionicPopup.alert({
			     title: 'Campos vacios',
			     template: 'Usuario o clave incorrectas'
			});
				//alert("Usuario o clave incorrectas");
				//showAlert();		
				return false;
		} 
	});
    
  };
})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
  	var codusu = localStorage['codUsu'];
	var serviceURL = localStorage['serviceURL'];
	var employees;

	$('#busy').show();
	$.getJSON(serviceURL + 'getnombres.php?codigo='+codusu+'&format=json', function(data) {
		$('#busy').hide();
		
		nombres = data.items;
		$.each(nombres, function(index, nombre) {
			
			localStorage['nombre'] = nombre.post.nombreusu + ' ' + nombre.post.apellidousu;
			$('#employeeList').append(	
					'<p>' + decodeURIComponent(nombre.post.nombreusu) + ' ' + decodeURIComponent(nombre.post.apellidousu)  + '</p>');
					
		
		});
		setTimeout(function(){
			scroll.refresh();
		});
	});

})

.controller('CargarRegiones', function($scope) {
  console.log('CargarRegiones');

	var serviceURL = localStorage['serviceURL'];
	
	$('#cargaRegiones').show();
	$.getJSON(serviceURL + 'getregiones.php?format=json', function(data) {
		$('#cargaRegiones').hide();
		//$('#employeeList li').remove();
		regiones = data.items;
		$.each(regiones, function(index, region) {
			$('#Regiones').append('<button class="button button-block button-positive" onClick="localStorage[\'idregion\'] ='+region.post.idreg+'; location.href=\'#/tab/entidadesf\'">'+region.post.nombrereg+'</button>');
		});
		setTimeout(function() {
			scroll.refresh();
		});
	});

})


.controller('CargarEntidades', function($scope) {
  console.log('CargarEntidades');

	var serviceURL = localStorage['serviceURL'];
	var idregion = localStorage['idregion'];
	$('#cargaEntidades').show();
	$.getJSON(serviceURL + 'getentidades.php?region=' + idregion + '&format=json', function(data) {
		$('#cargaEntidades').hide();
		//$('#employeeList li').remove();
		entidades = data.items;
		$.each(entidades, function(index, entidad) {
			$('#Entidades').append('<button class="button button-block button-positive" onClick="localStorage[\'identi\'] ='+entidad.post.idban+'; location.href=\'#/tab/dentidad\'">'+entidad.post.nombreban+'</button>');
		});
		setTimeout(function() {
			scroll.refresh();
		});
	});

})

.controller('CargarDEntidad', function($scope) {
  console.log('CargarDEntidad');

	var serviceURL = localStorage['serviceURL'];
	var identi = localStorage['identi'];
	$('#cargaDEntidad').show();
	
	var textotas="";
	var textosucu="";
	
	$.getJSON(serviceURL + 'gettasas.php?identi=' + identi + '&format=json', function(data) {
		tasas = data.items;
		$.each(tasas, function(index, tasa) {
			$('#DEntidad').append(' ');
			textotas = '<p>'+tasa.post.descripcioncon+' - '+ tasa.post.tasa +'</p><br>';
		});
		setTimeout(function() {
			scroll.refresh();
		});
	});
	
	$.getJSON(serviceURL + 'getsucursales.php?identi=' + identi + '&format=json', function(data) {
		sucursales = data.items;
		$.each(sucursales, function(index, sucursal) {
			$('#DEntidad').append(' ');
			textosucu = textosucu + '<p>'+sucursal.post.nombreban+' - '+ sucursal.post.nombrereg +'</p><br>';
		});
		setTimeout(function() {
			scroll.refresh();
		});
	});
	
	$.getJSON(serviceURL + 'getsucursales.php?identi=' + identi + '&format=json', function(data) {
		$('#cargaDEntidad').hide();
		//$('#employeeList li').remove();
		entidades = data.items;
		$.each(entidades, function(index, entidad) {
			$('#DEntidad').append(
			'<div class="card">'+
			  '<div class="item item-divider">' +
			    entidad.post.nombreban + " - " + entidad.post.nombrereg +
			  '</div>' +
			  '<div class="item item-text-wrap">' +
			  	"Sucursales:" + textosucu + '<br>'+
			    "Tasas:" + textotas+
			  '</div>' +
			'</div>'
			);
		});
		setTimeout(function() {
			scroll.refresh();
		});
	});
	

})


.controller('CargarTasasPA', function($scope) {
  console.log('CargarTasasPA');
	var serviceURL = localStorage['serviceURL'];
	
	var color = 1;
	
	total = 0;
	$('#busi').show();
	$.getJSON(serviceURL + 'gettodastasas.php?format=json', function(data) {
		$('#busi').hide();
		tasas = data.items;
		$.each(tasas, function(index, tasa) {
			
			if(color%2!=0){
			$('#tasasPA').append('<div class="row"> <div class="col col-50 coloreado">' 		
					 +  tasa.post.nombreban  + '</div><div class="col col-25 coloreado"> '+ tasa.post.tasa +'</div><div class="col col-25 coloreado" onClick="location.href=\'#/tab/evotasaspa\'"> '+ "Ver" +  '</div></div>');
			}else{
			$('#tasasPA').append('<div class="row"> <div class="col col-50">' 		
					 +  tasa.post.nombreban  + '</div><div class="col col-25"> '+ tasa.post.tasa +'</div><div class="col col-25" onClick="location.href=\'#/tab/evotasaspa\'"> '+ "Ver" +  '</div></div>');	
			}
			color++;
		});
		
		
		setTimeout(function(){
			scroll.refresh();
		});
	});

})

.controller('LGraphCtrl', function($scope) { // Add a simple controller
  var serviceURL = localStorage['serviceURL'];
  var textotasa = [];
  var textofecha = [];
  
  var datos = [1,2,3,4,5];
  
  $scope.graph = {};                        // Empty graph object to hold the details for this graph
  
  $.getJSON(serviceURL + 'gettasaspalinea.php?idban=1&idcon=1&idreg=23&idpro=1&idope=1&format=json', function(data) {
		tasasp = data.items;
		var cont = 0;
		$.each(tasasp, function(index, tasap) {
			textotasa[cont] = tasap.post.porcentajedeta;
			textofecha[cont] = tasap.post.fechadeta;
			localStorage['tasasp'] = tasap.post.porcentajedeta;
			cont++;
		});
		setTimeout(function() {
			scroll.refresh();
		});
		  $scope.graph.data = [                     // Add bar data, this will set your bars height in the graph
		  textotasa
		  ];
		  $scope.graph.labels = textofecha;    // Add labels for the X-axis
		  $scope.graph.series = ['Tasa'];  // Add information for the hover/touch effect
	});


})


.controller('BGraphCtrl', function($scope) { // Add a simple controller
  $scope.graph = {};                        // Empty graph object to hold the details for this graph
  $scope.graph.data = [                     // Add bar data, this will set your bars height in the graph
    //Awake
    [16, 15, 20, 12, 16, 12, 8],
    //Asleep
    [8, 9, 4, 12, 8, 12, 14]
  ];
  $scope.graph.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];    // Add labels for the X-axis
  $scope.graph.series = ['Awake', 'Asleep'];  // Add information for the hover/touch effect

})


.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {


 // A confirm dialog
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Cerrar Sesion',
     template: '¿Esta seguro?',
     cancelText: 'No',
     okText: 'Sí',
   });
   confirmPopup.then(function(res) {
     if(res) {
     location.href='#/login';
     } else {
     }
   });
 };
 
 // An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Contáctenos',
     template: 'Prototipo '+
'Prototipo</br>Prototipo</br></br>'+
'Prototipo</br>'+
'Central Telef: Prototipo</br>'
   });
 };
 
 // An alert dialog
 $scope.showAlerta = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Enviar por correo',
     template: texto
   });
 };
 
 // Triggered on a button click, or some other target
$scope.showPopup = function() {
  $scope.data = {}

  // An elaborate, custom popup
  var myPopup = $ionicPopup.prompt({
   title: 'Ingrese la direccion de correo',
   inputType: 'email'
 }).then(function(res) {
 	var serviceURL = localStorage['serviceURL'];
 	imeil=res;
   console.log(res, texto);
   $.getJSON(/*serviceURL + */'http://upete.pagekite.me/upt/correo.php?email=' + res+'&correo='+texto, function(data) {});
   console.log(imeil);
   if(typeof imeil !== "undefined" && imeil.length>2){
   	console.log('yay');
   	alert("El correo ha sido enviado");
   }else{
   	console.log('ow');
   }
 });
  
 };

});