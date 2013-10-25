/*
Lyteia Kitchen
Main Js File
Added Slider Using CSS 
*/	
(function($){
	
	
	var landingTemplate;
	var applicationTemplate;
	var user;
	
	$.ajaxSetup({
		cache : false
	});
	
	function init() {
	
		// Check User Log In
		$.ajax({
			url : "xhr/check_login.php",
			type : "get",
			dataType : "json",
			success : function(response) {
	
				// if the user is logged in
				if (response.user) {
					user = response.user;
					loadApplication();
				}
	
				// If User not Logged In
				else {
					loadLanding();
				}
	
			}
		});
	
	};
	
	init();
	
	// Create Landing Pg
	
	function loadLanding() {
	
		//Page elements
		$.get("templates/landing.html", function(template) {
	
			landingTemplate = template;
	
			var header = $(landingTemplate).find('#landing-header').html();
			var main = $(landingTemplate).find('#landing-main').html();
	
			//header
			$('header').html(header);
	
			//rpklaee main
			$('#main').html(main);
	
			//add event listener
	
			$('#header_login').click(function() {
	
				var username = $('#header_username').val();
				var password = $('#header_password').val();
	
				// Validate variables
	
				var valid = true;
	
				if (username.length == 0) {
					valid = false;
					
				}
	
				if (password.length < 6) {
					valid = false;
					// ERROR
				}
	
				if (!valid) {
					var errorHtml = '<span class="error-login">Incorrect username or password.</br></span>';
		            $(errorHtml).insertAfter('.header-login');
				
					return;
				}
	
				// log user in
	
				$.ajax({
					url : "xhr/login.php",
					type : "post",
					dataType : "json",
					data : {
						'username' : username,
						'password' : password
					},
					success : function(response) {
	
						
						if (response.user) {
							user = response.user;
							init();
						}
	
						// If user didnt log in
						else {
							var errorHtml = '<span class="error-login">An error has occured, please try again.</span>';
	                        $(errorHtml).insertAfter('.header-login');
						}
	
					}
				});
	
			});
	
			$('#home_sign_up').click(function() {
			//Variaables for signup
				var firstName = $('#home_firstName').val();
				var lastName = $('#home_lastName').val();
				var username = $('#home_username').val();
				var email = $('#home_email').val();
				var pass = $('#home_pass').val();
				var confirmPass = $('#home_confirmPass').val();
	
				// validate the variable
				//Shows ERRORs 
				var valid = true;
	
				if (firstName.length == 0) {
					valid = false;
					
				}
				if (lastName.length == 0) {
					valid = false;
					
				}
				if (username.length == 0) {
					valid = false;
					
				}
				if (email.length == 0) {
					valid = false;
				
				}
				if (pass.length > 0 && pass.length < 6) {
					valid = false;
					
				}
				if (confirmPass.length > 0 && confirmPass.length < 6) {
					valid = false;
					var errorHtml = '<span class="error-signup">Password must be at least 6 characters long.</br></span>';
		            $(errorHtml).appendTo('.errors');
		            return;
				}
	
				if (pass != confirmPass) {
					valid = false;
					//ERROR
				}
	
				if (!valid) {
					var errorHtml = '<span class="error-signup">Please fill out the form completely.</br></span>';
		            $(errorHtml).appendTo('.errors');
					return;
				}
	
				//Ajax request to variablies
				$.ajax({
					url : "xhr/register.php",
					type : "post",
					dataType : "json",
					data : {
						'first_name' : firstName,
						'last_name' : lastName,
						'username' : username,
						'email' : email,
						'password' : pass
					},
					success : function(response) {
	
						// If user signed up 
						if (response.user) {
							loadApplication();
						}
	
						// If Didnt Sign Up
						else {
							var errorHtml = '<span class="error-signup">An error has occurred, please try again.</br></span>';
		                   $(errorHtml).appendTo('.errors');
						}
	
					}
				});
	
			});
	
		});
	
	}
	
	// Create app page
	
	function loadApplication() {
	
		// All page elements
		$.get("templates/app.html", function(template) {
			applicationTemplate = template;
	
			var header = $(applicationTemplate).find('#application-header').html();
	
			$.template('headerTemplate', header);
			var headerHtml = $.render(user, 'headerTemplate');
	
			//Replace header
			$('header').html(headerHtml);
	
			loadProjects();
	
			// Added event listener to elements
			$('#header_user').click(function() {
				$('#header_account').toggle();
			});
	
			$('#account_edit').click(function() {
				$('#header_account_display').hide();
				$('#header_account_edit').show();
			});
	
			$('#account_save').click(function() {
	
				$('#header_account_display').show();
				$('#header_account_edit').hide();
	
				//Variables for account edit 
				var firstName = $('#account_edit_firstName').val();
				var lastName = $('#account_edit_lastName').val();
				var email = $('#account_edit_email').val();
				var pass = $('#account_edit_pass').val();
				var confirmPass = $('#account_edit_confirmPass').val();
	
				//Validate variables
				//ERROR
				var valid = true;
	
				if (firstName.length == 0) {
					valid = false;
					
				}
				if (lastName.length == 0) {
					valid = false;
				
				}
				if (email.length == 0) {
					valid = false;
					
				}
				if (pass.length < 6) {
					valid = false;
					
				}
				if (confirmPass.length < 6) {
					valid = false;
					
				}
	
				if (pass != confirmPass) {
					valid = false;
					
				}
	
				if (!valid) {
					return;
				}
	
				$.ajax({
					url : "xhr/update_user.php",
					type : "post",
					dataType : "json",
					data : {
						'first_name' : firstName,
						'last_name' : lastName,
						'email' : email,
						'password' : pass
					},
					success : function(response) {
						if (response.user) {
						
						} else {
							//ERROR
						}
	
					}
				});
	
			});
	
			$('#header_logout').click(function() {
	
				//Logs USer Out
	
				$.ajax({
					url : "xhr/logout.php",
					type : "get",
					dataType : "json",
					success : function(response) {
	
						// If User Logged Out
						if (response.success) {
							loadLanding();
						}
	
						// If User Didnt Log Out
						else {
							// ERROR
						}
	
					}
				});
	
			});
	
			$(document).on('click', '#application_create_project', function(e) {
	
				$('.project-create-container').remove();
	
				//Call To Get Template
				var projectCreate = $(applicationTemplate).find('#application-project-create').html();
	
				//Append HTML
				$('#main').prepend(projectCreate);
				$('#main').prepend('<br />');
				//hide the project create button
				$('#application_create_project').hide();
	
				setupDatepicker();
	
				//Add Event Listener To Submit Button 
				$('.project-create-save').click(function() {
					console.log('save');
					//Variables
					var name = $('.project-create-name').val();
					var status = $('.project-create-status').val();
					var description = $('.project-create-description').val();
					var date = $('.project-create-date').val();
					var status = $(this).closest('.project-create-container').find('.data-status').val();
					//Validate Variables 
					var valid = true;
		
		                if (name.length == 0) {
		                    valid = false;
		                    //Prepend red text to the project create container
		                    var errorHtml = '<span class="error-title">Please enter a project name.</span>';
		                   $(errorHtml).insertAfter('.project-create-heading');
		                }
		
		                if (!valid) {
		                    return;
		                }
					//Ajax Request
					$.ajax({
						url : "xhr/new_project.php",
						type : "post",
						dataType : "json",
						data : {
							'projectName' : name,
							'status' : status,
							'projectDescription' : description,
							'dueDate' : date
						},
						success : function(response) {
	
							console.log(response);
							if (response) {
								console.log(response);
								loadApplication();
							} else {
							
							}
	
						}
					});
	
				});
	
				$('#project_cancel').click(function() {
					loadApplication();
				});
			});
	
			$(document).on('click', '#application_create_task', function(e) {
	
				//Get Template
				var taskCreate = $(applicationTemplate).find('#application-task-create').html();
	
				//Append To HTML
				$(taskCreate).insertAfter('.task-list-heading');
				//Hide The Project Create Button
	
				setupDatepicker();
	
				//Add Event Listener To Button
				$('.task-create-save').click(function() {
					console.log('save');
					//Make Variables
					var projectID = $('.project-detail-container').find('.data-id').val();
					var name = $('.task-create-name').val();
					var status = $('.task-create-status').val();
					var description = $('.task-create-description').val();
					var date = $('.task-create-date').val();
					var status = $(this).closest('.task-create-container').find('.data-status').val();
					//Validate Variables
					console.log(projectID);
	
					//Ajax Request
					$.ajax({
						url : "xhr/new_task.php",
						type : "post",
						dataType : "json",
						data : {
							'projectID' : projectID,
							'taskName' : name,
							'status' : status,
							'taskDescription' : description,
							'dueDate' : date,
							'status' : status
						},
						success : function(response) {
							if (response) {
								console.log(response);
								loadProjectDetails(projectID);
							} else {
								
							}
	
						}
					});
	
				});
	
				$('#task_cancel').click(function() {
					loadApplication();
				});
			});
	
			$(document).on('click', '.project-item', function(e) {
	
	
				//Stop Delete Button From Triggering This
				if ($(e.target).attr('class') == 'project-item-delete') {
					return;
				}
	
				var projectID = $(this).find('.data-id').val();
	
				loadProjectDetails(projectID);
	
			});
	
			$(document).on('click', '.project-item-delete', function(e) {
	
				var answer = confirm("Are you sure you want to delete this project?");
	
				if (answer) {
	
					var projectID = $(this).closest('.project-item').find('.data-id').val();
	
					$.ajax({
						url : "xhr/delete_project.php",
						type : "post",
						dataType : "json",
						data : {
							'projectID' : projectID
						},
						success : function(response) {
	
							console.log(response);
							if (response.success) {
								loadProjects();
							} else {
								
							}
	
						}
					});
	
				}
	
			});
	
			$(document).on('click', '.project-edit', function(e) {
	
				var projectID = $(this).closest('.project-container').find('.data-id').val();
	
				console.log(projectID);
	
				$('.project-detail-container').hide();
				$('.project-edit-container').show();
	
			});
	
			$(document).on('click', '.project-delete', function(e) {
	
				var answer = confirm("Are you sure you want to delete this project?");
	
				if (answer) {
	
					var projectID = $(this).closest('.project-container').find('.data-id').val();
	
					$.ajax({
						url : "xhr/delete_project.php",
						type : "post",
						dataType : "json",
						data : {
							'projectID' : projectID
						},
						success : function(response) {
	
							console.log(response);
							if (response.success) {
								loadProjects();
							} else {
								
							}
	
						}
					});
	
				}
	
			});
	
			$(document).on('click', '.project-edit-save', function(e) {
	
				var projectContainer = $(this).closest('.project-container');
				var projectID = projectContainer.find('.data-id').val();
	
				$('.project-detail-container').show();
				$('.project-edit-container').hide();
	
				//Variables
				var name = projectContainer.find('.project-edit-name').val();
				var description = projectContainer.find('.project-edit-description').val();
				var dueDate = projectContainer.find('.project-edit-date').val();
	
				//Validate
	
				//Ajax Request
				$.ajax({
					url : "xhr/update_project.php",
					type : "post",
					dataType : "json",
					data : {
						'projectID' : projectID,
						'projectName' : name,
						'projectDescription' : description,
						'dueDate' : dueDate
					},
					success : function(response) {
	
						console.log(response);
						if (response.project) {
							loadProjectDetails(projectID);
						} else {
							
						}
	
					}
				});
	
			});
	
			$(document).on('click', '.task-item', function(e) {
	
				//Stop Children Elements From Trigging This
				if (e.target !== this) {
					return;
				}
	
				$(this).find('.task-edit').hide();
				$(this).find('.task-detail').show();
	
			});
	
			$(document).on('click', '.task-item-delete', function(e) {
	
				var _this = this;
	
				var answer = confirm("Are you sure you want to delete this task?");
	
				if (answer) {
	
					var taskID = $(this).closest('.task-item').find('.data-id').val();
	
					$.ajax({
						url : "xhr/delete_task.php",
						type : "post",
						dataType : "json",
						data : {
							'taskID' : taskID
						},
						success : function(response) {
	
							console.log(response);
							if (response.success) {
								$(_this).closest('.task-item').slideUp('fast', function() {
									$(this).remove();
								});
							} else {
								//ERROR
							}
	
						}
					});
	
				}
	
			});
	
			$(document).on('click', '.task-item-edit', function(e) {
	
				$(this).closest('.task-item').find('.task-edit').show();
				$(this).closest('.task-item').find('.task-detail').hide();
	
			});
	
			$(document).on('click', '.task-edit-save', function(e) {
	
				var taskContainer = $(this).closest('.task-item');
				var taskID = taskContainer.find('.data-id').val();
	
				//Variables
				var name = taskContainer.find('.task-edit-name').val();
				var description = taskContainer.find('.task-edit-description').val();
				var dueDate = taskContainer.find('.task-edit-date').val();
	
				//Validate Variables
	
				//Ajax Request
				$.ajax({
					url : "xhr/update_task.php",
					type : "post",
					dataType : "json",
					data : {
						'taskID' : taskID,
						'taskName' : name,
						'taskDescription' : description,
						'dueDate' : dueDate
					},
					success : function(response) {
	
						console.log(response);
	
						if (response.task) {
							loadProjectDetails(response.task.projectID);
						} else {
							
						}
	
					}
				});
	
			});
	
		});
		
	
		// To Create Task
		$(document).on('click', '.project-create-container .button-status', function() {
	
			var status = $(this).find('.status').val();
	
			$(this).closest('.project-create-container').find('.status:first').removeClass('active urgent delayed done');
			$(this).closest('.project-create-container').find('.status:first').addClass(status);
	
			$(this).closest('.project-create-container').find('.data-status').val(status);
	
		});
	
		// Projects edits
		$(document).on('click', '.project-edit-container .button-status, .project-detail-container .button-status', function() {
	
			var status = $(this).find('.status').val();
	
			var projectID = $(this).closest('.project-container').find('.data-id').val();
	
			//For Projects
			$(this).closest('.project-container').find('.status:first').removeClass('active urgent delayed done');
			$(this).closest('.project-container').find('.status:first').addClass(status);
	
			console.log(projectID);
	
			$.ajax({
				url : "xhr/update_project.php",
				type : "post",
				dataType : "json",
				data : {
					'projectID' : projectID,
					'status' : status
				},
				success : function(response) {
	
				}
			});
	
		});
	
		//Tasks Create
		$(document).on('click', '.task-create-container .button-status', function() {
	
			var status = $(this).find('.status').val();
	
			$(this).closest('.task-create-container').find('.status:first').removeClass('active urgent delayed done');
			$(this).closest('.task-create-container').find('.status:first').addClass(status);
	
			$(this).closest('.task-create-container').find('.data-status').val(status);
	
		});
	
		//Task Edit
		$(document).on('click', '.task-item .button-status', function() {
	
			var status = $(this).find('.status').val();
	
			var taskID = $(this).closest('.task-item').find('.data-id').val();
	
			$(this).closest('.task-item').find('.status:first').removeClass('active urgent delayed done');
			$(this).closest('.task-item').find('.status:first').addClass(status);
	
			$.ajax({
				url : "xhr/update_task.php",
				type : "post",
				dataType : "json",
				data : {
					'taskID' : taskID,
					'status' : status
				},
				success : function(response) {
	
				}
			});
	
		});
	
	}
	
	function loadProjects() {
	
		var projectItem = $(applicationTemplate).find('#application-project-item').html();
	
		$.template('projectItemTemplate', projectItem);
	
		//Clear Main
		$('#main').html('<br />');
	
		var newProjectButton = '<button id="application_create_project">New Project</button>';
		$(newProjectButton).appendTo('#main');
	
		$.ajax({
			url : "xhr/get_projects.php",
			type : "get",
			dataType : "json",
			success : function(response) {
	
				for (var i = 0, j = response.projects.length; i < j; i++) {
					var projectItemHtml = $.render(response.projects[i], 'projectItemTemplate');
					$('#main').append(projectItemHtml);
				}
	
			}
		});
	
		$('#application_create_project').click(function() {
			console.log("test");
		});
	}
	
	function loadProjectDetails(projectID) {
	
		var projectSubmit = $(applicationTemplate).find('#application-project-edit').html();
		var projectDetail = $(applicationTemplate).find('#application-project-detail').html();
	
		var taskItem = $(applicationTemplate).find('#application-task-item').html();
	
		$.template('projectSubmitTemplate', projectSubmit);
		$.template('projectDetailTemplate', projectDetail);
		$.template('taskItemTemplate', taskItem);
	
		//Clear Main
		$('#main').html('<br />');
	
		$.ajax({
			url : "xhr/get_projects.php",
			type : "get",
			dataType : "json",
			data : {
				'projectID' : projectID
			},
			success : function(response) {
				//Render Project Det.
				var projectSubmitHtml = $.render(response.projects[0], 'projectSubmitTemplate');
				$('#main').append(projectSubmitHtml);
	
				var projectDetailHtml = $.render(response.projects[0], 'projectDetailTemplate');
				$('#main').append(projectDetailHtml);
	
				var taskListHeading = '<div class="task-list-heading"><div class="content-spacer"></div><span>Tasks for ' + response.projects[0].projectName + '</span><button id="application_create_task">New Task</button><div class="content-spacer"></div></div>';
				$(taskListHeading).appendTo('#main');
	
				$.ajax({
					url : "xhr/get_tasks.php",
					type : "get",
					dataType : "json",
					data : {
						'projectID' : projectID
					},
					success : function(response) {
	
						// Render All The Tasks 
						for (var i = 0, j = response.tasks.length; i < j; i++) {
							var taskItemHtml = $.render(response.tasks[i], 'taskItemTemplate');
							$('#main').append(taskItemHtml);
						}
	
						setupDatepicker();
	
					}
				});
	
			}
		});
	
	}
	
	function setupDatepicker() {
		$('.project-create-date, .project-edit-date, .task-edit-date, .task-create-date').datepicker();
	}
})(jQuery);
