var RoomManager = (function ($) {

	var cacheRooms = [];
	function getRoom(id) {
		if (!id) return null;
		if (!cacheRooms || cacheRooms.length == 0) return null;
		for (var i = 0; i < cacheRooms.length; i++) {
			if (cacheRooms[i]._id == id) return cacheRooms[i];
		}
		return null;
	}

    function listRoom() {
		ajaxGet('/room/all', function (response) {
			cacheRooms = response.rooms;
			console.log(cacheRooms);
			// var html = template('/admin/room.div.htm', response);
			let html = ""
			cacheRooms.forEach(function(rooms, index, arr) {
				html += "<tr>"
				html += "<td>"+ rooms.name +"</td>"
				html += "<td>"+ rooms.address +"</td>"
				html += "<td>"+ rooms.description +"</td>"
				html += "<td>"+ rooms.status +"</td>"
				html += "<td>"
				if(rooms.status==='A') {
					html += '<a class="btn-warning" href="javascript:;" onclick="RoomManager.disable(\''+ rooms._id+'\')">disable</a>'
				} else {
					html += '<a class="btn-primary" href="javascript:;" onclick="RoomManager.enable(\''+ rooms._id+'\')">enable</a>'
				}
				html += '<a class="btn-info" href="javascript:;" onclick="RoomManager.edit(\''+ rooms._id+'\')">edit</a>'
				html += '<a class="btn-danger" href="javascript:;" onclick="RoomManager.delete(\''+ rooms._id+'\')">delete</a>'
				html += "</td>"
				html += "</tr>"
				// console.log(rooms, index, arr)
			})
			html += '<tr> <td colspan="5" class="text-center"> <a class="btn-success" href="javascript:;" onclick="RoomManager.add()">Add</a> </td></tr>'
			// console.log(html);
			$('#room-table-body').html(html);
		});
	}

	function update(room) {
		ajaxGet('/room/update', room, function (response) {
			listRoom();
		});
	}

	function enable(id) {
		update({ id: id, status: 'A' });
	}

	function disable(id) {
		var cnf = confirm('Are you sure?');
		if(!cnf) return;
		update({ id: id, status: 'D' });
	}

	function deleteRoom(id) {
		var conf = confirm("Are you sure？");
		if (!conf) return;
		ajaxGet('/room/delete', { id: id }, function (response) {
			listRoom();
		});
	}

	function edit(id) {
		var room = getRoom(id) || {};
		var html = template('template-room-edit', room);
		console.log(room);
		$('#room-edit-modal-body').html(html);
		$('#room-edit-modal').modal();
		if (!id) {
			$('#room-edit-modal-title').html('Form Add Room');
		} else {
			$('#room-edit-modal-title').html('Form Edit Room');
			$('#txt-room-id').val(room._id);
			$('#txt-room-name').val(room.name);
			$('#txt-room-address').val(room.address);
			$('#txt-room-description').val(room.description);
		}
	}

	function save() {
		var inputs = $('#room-form input[name]');
		var data = {};
		for (var i = 0; i < inputs.length; i++) {
			var input = $(inputs[i]);
			data[input.attr('name')] = input.val();
		}

		if (!data.name || !($.trim(data.name))) {
			alert('Field name is required!');
			return;
		}
		var url = !!data.id? "/room/update":"/room/add";
		ajaxGet(url,data,function(response){
			$('#room-edit-modal').modal('hide');
			listRoom();
		});
	}

	return {
		list: listRoom,
		enable: enable,
		disable: disable,
		delete: deleteRoom,
		edit: edit,
		add: edit,
		save: save
	}
})(jQuery);