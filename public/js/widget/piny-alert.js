var tplalert = require('tpl/piny-alert.html');
var alertIcon = {
    success: "check",
    danger: "remove",
    info: "info",
    system: "clubs"
}

function alert(opts){
    /**
     * @ opts = {
     *      status: success,
     *      container: container,
     *      message: message,
     * }
     */
    var data = {
        status: opts.status,
        statusIconName: alertIcon[opts.status],
        message: opts.message
    }
    var tpl = _.template(tplalert);
    var alertCont = tpl(data);
    $(opts.container).empty().show().append(alertCont);

    var closeAlert = setTimeout(function(){
        // $(opts.container).slideUp();
    }, 3000);

    $(opts.container).on({
        mouserover: function(){
            clearTimeout(closeAlert);
        },
        mouseout: function(){
            closeAlert = setTimeout(function(){
                // $(opts.container).slideUp();
            }, 3000);
        }
    })

}

module.exports = alert;