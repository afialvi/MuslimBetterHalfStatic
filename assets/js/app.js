
/*=================================================
subscribe
=================================================*/
var __subscribeEmail = 'email@example.com'; // subscribe email address
var __subscribeSuccess = '<i class="icons fa fa-check valid"></i> thank you for subscribing'; // subscribe success message
var __subscribeError = '<i class="icons fa fa-close error"></i> email address is invalid'; // subscribe error message

/* mailchimp */
var __mailChimp = true; // true = mailchimp form, false = php subscribe form
var __mailChimpUrl = 'https://Dup-Dup.us16.list-manage.com/subscribe/post?u=1a32f665746e8176c5cf47e8a&amp;id=f00bd10469'; // mailchimp post url




$(function () {

   fn_subscribe();


/*=================================================
email validation
=================================================*/
function fn_formValidation(email_address) {
  var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
  return pattern.test(email_address);
}

/*=================================================
subscribe form
=================================================*/
function fn_subscribe() {
  if (__mailChimp) {
    fn_mailChimp('#subscribe-form1', '#subscribe-email1', '#sub-notice1');
    fn_mailChimp('#subscribe-form2', '#subscribe-email2', '#sub-notice2');
  }
}

/* mailchimp */
function fn_mailChimp(subForm, subEmail, subNotice) {

  var $form1 = $(subForm);
  var $subscribeEmail1 = $(subEmail);

  $form1.ajaxChimp({
    callback: fn_mailChimpStatus,
    language: 'eng',
    type: 'POST',
    url: __mailChimpUrl
  });

  function fn_mailChimpStatus(resp) {

    if (resp.result === 'error') {
      $subscribeEmail1.focus();
      $(subNotice).addClass('visible');
    }
    else if (resp.result === 'success') {
      $form1[0].reset();
      $subscribeEmail1.blur();
      $(subNotice).addClass('visible');
    }
  }

}


});

