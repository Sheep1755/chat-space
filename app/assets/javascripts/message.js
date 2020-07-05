$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
        `<div class="message-group">
          <div class="message-group__message-contents">
            <div class="message-group__message-contents--message">
              ${message.user_name}
            </div>
            <div class="message-group__message-contents--message-date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-group__message-detail">
            <p class="message__content">
              ${message.content}
            </p>
            <img class="message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message-group">
        <div class="message-group__message-contents">
          <div class="message-group__message-contents--message">
            ${message.user_name}
          </div>
          <div class="message-group__message-contents--message-date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-group__message-detail">
          <p class="message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }  

  $(".form-groups").on("submit",function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $(".main-contents").append(html);
      $(".main-contents").animate({ scrollTop: $(".main-contents")[0].scrollHeight});
      $(".form-groups")[0].reset();
      $(".form-groups__send-btn").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })  
  });
});