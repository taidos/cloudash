window.VMDConsoleView = Backbone.View.extend({
  initialize: function(options) {
    this.vm = options.vm;
  },
  events: {

  },
  getconsole: function() {
    //refactor these crappy tabs to multiple views and then move this to right place
    var self = this;
    setTimeout(function() {
      UI.load();
      modem('GET', 'vm/' + self.model.get('id') + '/vnc',
        function(json) {
          UI.updateSetting('host', json.address);
          UI.updateSetting('port', '29876');
          UI.updateSetting('password', '');
          UI.updateSetting('path', '?token=' + json.token);
          UI.connect();
        },
        function(xhr, ajaxOptions, thrownError) {
          var json = JSON.parse(xhr.responseText);
          console.log(json);
          showError('ERRO - ' + title, json.error);
        }
      );
    }, 500);
  },
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));

    $('.vm-details', this.el).i18n();
    $('.overme', this.el).tooltip();

    $('.topmenudetails li').removeClass('active');
    $('#gotoconsole').parent().addClass('active');

    this.getconsole();

    return this;
  }

});
