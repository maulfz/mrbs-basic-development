var ReservationManager = (function ($) {
	function list() {
		var date = $('#txt-reservation-date').val();
		ajaxGet('/reservation/date', { date: date }, function (response) {
			cacheReservations = response.reservations;
			console.log(cacheReservations)
			var html = template('template-reservation-list', response);
			cacheReservations.forEach(function(reserv, index, arr) {
				html += "<tr>"
				html += "<td>"+ reserv.date +"</td>"
				html += "<td>"+ reserv.roomName +"</td>"
				html += "<td>"+ minuteFormat(reserv.startMinute) +'-'+ minuteFormat(reserv.endMinute) +"</td>"
				html += "<td>"+ reserv.userName +"</td>"
				html += "<td>"+ reserv.createDate +"</td>"
				html += "<td>"
				html += '<a class="btn-danger" href="javascript:;" onclick="ReservationManager.delete(\''+ reserv._id +'\')">delete</a>'
				html += "</td>"
				html += "</tr>"
			})
			$('#reservation-table-body').html(html);
		});
	}
	function deleteUser(id) {
		if (!id) return;
		var conf = confirm('Are you sure?');
		if (!conf) return;
		ajaxGet('/reservation/delete', { id: id }, function (response) {
			list();
		});
	}

	return {
		list: list,
		delete: deleteUser
	};
})(jQuery);

$(function () {
	function initDateTimePicker() {
		$('#txt-reservation-date').val((new Date()).format('yyyy-MM-dd'));
		$('#txt-reservation-date').datetimepicker({
			timepicker: false,
			format: 'Y-m-d',
			formatDate: 'Y-m-d',
			onSelectDate: function () {
				ReservationManager.list();
			}
		});
	}
	initDateTimePicker();
});

function changeDay(op) {
	op = op * 1.0;
	var dateVal = $('#txt-reservation-date').val();
	var date = new Date(dateVal);
	var day = new Date(date.getTime() + (24 * 60 * 60 * 1000) * op);
	$('#txt-reservation-date').val(day.format('yyyy-MM-dd'));
	ReservationManager.list();
}

function minuteFormat(minuteInDay) {
    if (!minuteInDay && minuteInDay != 0) return "";
    var hour = parseInt(minuteInDay / 60);
    var minute = parseInt(minuteInDay % 60);
    return (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute);
}
