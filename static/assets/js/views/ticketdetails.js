window.TicketdetailsView = Backbone.View.extend({
  events: {
    'click .openticket': 'newticketmodal',
    'click .btn_send_ticket': 'sendticket',
    'click tbody tr': 'getticket'
  },
  getticket: function(evt) {
    console.log($(evt.target).parent().attr('data-id'));
    app.navigate('/support/'+$(evt.target).parent().attr('data-id'), {
      trigger: true
    });
  },
  sendticket: function() {
    var message = {
      from: this.model.get('username'),
      to: 'admin',
      message: $("#input_content").val()
    };
    var data = {
      message: [message],
      subject: $("#input_subject").val()
    };
    console.log(data);
    modem('POST', 'support',
      function(json) {
        console.log(json);
      },
      function(xhr, ajaxOptions, thrownError) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
        showError('ERRO - Abertura de Ticket', json.error);
      }, data
    );
  },
  newticketmodal: function() {
    $('#modal_new_ticket').on('shown', function() {});
    $('#modal_new_ticket').modal({});
  },
  gettickets: function() {
    var self = this;
    var handler = function(tabela, json) {
      var oTable = $(tabela, self.el).dataTable({
        "data": json,
        "columns": [
          {"data": "_id"},
          {"data": "subject"},
          {"data": null,
            "bSortable": true,
            "mRender": function(data, type, full) {
              var date = new Date(full.created);
              return formatdate(date);
            }},
          {"data": "status"},
        ],
        "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
            $(nRow).attr('data-id',aData._id);
            return nRow;
        }
      });
    };
    modem('GET', 'support',
      function(json) {
        var open = [];
        var closed = [];
        for (var i = 0; i < json.length; i++) {
          if (json[i].status === 'Closed') {
            closed.push(json[i]);
          } else {
            open.push(json[i]);
          }
        }
        handler('#opentickets',open);
        handler('#closedtickets',closed);
      },
      function(xhr, ajaxOptions, thrownError) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
        showError('ERRO - Lista Tickets', json.error);
      }
    );
  },
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    $('.ticketcontent', this.el).wysihtml5({
      "font-styles": false,
      "image": false,
      "indent": false,
      "outdent": false
    });
    this.gettickets();
    return this;
  }

});