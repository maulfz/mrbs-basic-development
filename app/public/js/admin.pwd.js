var PwdManager = (function ($) {
	function changepwd() {
		var oldPwd = $('#txt-pwd-old').val();
		var newPwd = $('#txt-pwd-new').val();
		var newPwdr = $('#txt-pwd-new-r').val();
		if (!oldPwd) {
			alert('Please enter current password!');
			return false;
		}
		if (!newPwd) {
			alert('Please enter new password!');
			return false;
		}
		if (!newPwdr) {
			alert('Plese enter confirmation new password!');
			return false;
		}
		if (newPwd != newPwdr) {
			alert('Confirmation password doesnt match!');
			return false;
		}
		if (newPwd.length < 6) {
			alert('New password minimal 6 character!');
			return false;
		}

		ajaxGet('/admin/pwd', { old: oldPwd, 'new': newPwd }, function (response) {
			if (response && response.success) {
				alert('Success');
				resetpwd();
			} else {
				alert(response.message);
			}
		});
	}

	function resetpwd() {
		$('#change-password-form input').val('');
	}

	return {
		changepwd: changepwd,
		resetpwd: resetpwd
	};
})(jQuery);