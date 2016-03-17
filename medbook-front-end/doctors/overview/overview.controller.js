angular
	.module('medBook')
	.controller('doctorsOverviewCtrl', doctorsOverviewCtrl);

function doctorsOverviewCtrl() {
	console.log('Inside doctorsOverviewCtrl');
	var pOverviewVM = this;
  
  loadPage();

  function loadPage(){
    console.log('Loading doctors main page');
  }
}