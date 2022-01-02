var UserManager = (function ($) {
	function list() {
		ajaxGet('/user/list', function (response) {
			cacheUsers = response.users;
			var html = template('template-user-list', response);
			console.log(cacheUsers)
			cacheUsers.forEach(function(user, index, arr) {
				html += "<tr>"
				html += "<td>"+ user.name +"</td>"
				html += "<td>"+ user.createDate +"</td>"
				html += "<td>"
				html += '<a class="btn-danger" href="javascript:;" onclick="UserManager.delete(\''+ user._id +'\')">delete</a>'
				html += "</td>"
				html += "</tr>"
			})
			$('#user-table-body').html(html);
		});
	}
	function deleteUser(id) {
		if (!id) return;
		var conf = confirm('Are you sure?');
		if (!conf) return;
		ajaxGet('/user/delete', { id: id }, function (response) {
			list();
		});
	}

	return {
		list: list,
		delete: deleteUser
	};
})(jQuery);