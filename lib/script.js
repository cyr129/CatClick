$(document).ready(function(){
	
	var model = {
		
			currCat : null,
			cats :
				 	[
				 		{id:1, name:"Meowy",noClicks:0,imagesrc:"images/Cat1.jpg"},
						{id:2, name:"Kitty","noClicks":0,"imagesrc":"images/Cat2.jpg"},
						{id:3, name:"Catty",noClicks:0,imagesrc:"images/Cat3.jpg"},
						{id:4, name:"Scarry", noClicks:0, imagesrc:"images/Cat4.jpg"}
					]
				};
			

		
	
	var controller = {
						init : function()
						{
							model.currCat =model.cats[0];
							viewList.init();
							view.init();
							formView.init();
						},
						getAllCats : function()
						{
							return model.cats;
						},
						getSelCat : function()
						{
							return model.currCat;
						},
						setCurrCat : function(cat)
						{	model.currCat	= 	cat;
						},
						incrCurrCat	: function()
						{
							++model.currCat.noClicks;
						},
						updateCat : function(updCat)
						{
							model.cats.forEach(function(cat){
								if(cat.id == updCat.id)
								{	cat.id = updCat.id;
									cat.name = updCat.name;
									cat.noClicks = updCat.noClicks;
									cat.imagesrc = updCat.imageSrc;
									model.currCat = cat;
								}
							});
						}


					}
	var viewList = {
						init : function(){
							var cat,elem ;
							$("#dropDn").html('');
							view.render(controller.getSelCat());
							cats = controller.getAllCats();
							for(var i=0; i<cats.length; i++)
							{	
								cat = cats[i];
								elem = document.createElement('li');
								elem.textContent = cat.name;
								elem.addEventListener('click', (function(catCopy) {
									return function(){

										if($("#dropDn").val() != "Select")
										{
											controller.setCurrCat(catCopy);
											view.render();
											if(".formElem : visible")
											{
												formView.render();
											}
										}
									};

								})(cat));
								$("#dropDn").append(elem);

							}

						}
					}
	var view = {
				init : function(){
					$( "#imageLoad" ).click(function()
					{	
							controller.incrCurrCat();
							$( "#imageClicks" ).html(controller.getSelCat().name+" was clicked "+controller.getSelCat().noClicks+" times");
							if(".formElem : visible")
							{
								formView.render();
							}
							
						});

				},
				render : function()
				{	var cat = controller.getSelCat();
					$("#imageLoad").html('');
					$("#imageLabel").html('');
					$('<img src="'+cat.imagesrc+'" data-clicks="'+cat.noClicks+'" data-name ="'+cat.name+'" class = "imgClass" />').appendTo("#imageLoad");
					$("#imageLabel").html(cat.name);
					$( "#imageClicks" ).html(controller.getSelCat().name+" was clicked "+controller.getSelCat().noClicks+" times");
				}
			   }
			   var formView = {
								init : function()
								{	
									$( "#adminBtn" ).click(function()
											{	
												$(".formElem").show();
												formView.render();

											});
									$("#canBtn").click(function(){
										$(".formElem").hide();
									});
									$("#saveBtn").click(function(){
										var updCat = {
											id : controller.getSelCat().id,
											name : $("#txtName").val(),
											noClicks : $("#txtClicks").val(),
											imageSrc :$("#txtImage").val() }
											controller.updateCat(updCat);
											view.render();
									});

								},
								render : function()
								{
									var cat = controller.getSelCat();
									$("#txtName").val(cat.name);
									$("#txtImage").val(cat.imagesrc);
									$("#txtClicks").val(cat.noClicks);

								}
							}
	controller.init();
	
	
}
		
);
