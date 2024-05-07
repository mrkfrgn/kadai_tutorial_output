$(function () {
  $('.button-more').on('mouseover', function () {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });
  $('.button-more').on('mouseout', function () {
    $(this).animate({
      opacity: 1.0,
      marginLeft: 0
    }, 100);
  });
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
  });

  $('#submit').on('click', function (e){
    e.preventDefault();
    let result = inputCheck();
  

    let error = result.error;
    let message = result.message;

    if (error == false) {

      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result){
          alert('お問合せを送信しました。')
        },
        error: function (xhr, resp, text){
          alert('お問合せを送信できませんでした。')
        }
      })
    } else {
      alert(message);
      }
  });

  $('#name').blur(function () {
    inputCheck();
  });
  $('#furigana').blur(function () {
    inputCheck();
  });
  $('#email').blur(function () {
    inputCheck();
  });
  $('#tel').blur(function () {
    inputCheck();
  });
  $('#message').blur(function () {
    inputCheck();
  });
  $('#agree').click(function () {
    inputCheck();
  });

  function inputCheck() {
    let result;
    let message = '';
    let error = false;
    
    if ($('#name').val() == ''){
      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください\n';
    } else {
      $('#name').css('background-color', '#fafafa');
    }

    if ($('#furigana').val() == '' ) {
      $('#furigana').css('background-color', '#F79999');
      error = true;
      message += 'フリガナを入力してください。\n';
        } else {
        $('#furigana').css('background-color', '#fafafa');
      }

      if($('#message').val() == '') {
        $('#message').css('background-color', '#f79999');
        error = true;
        message += 'お問合せ内容を入力してください。\n';
        } else {
          $('#message').css('background-color', '#fafafa');
        }

        if($('#email').val() == ''|| $('#email').val().indexOf('@') == -1 || $('#email'). val().indexOf('.') == -1 ){
          $('#email').css('background-color', '#f79999');
          error = true;
          message += 'メールアドレスが未記入、または「＠」「.」が含まれていません。\n';
        } else {
          $('#email').css('background-color', '#fafafa');
        }

        if($('#tel').val()!='' && $('#tel').val().indexOf('-') == -1){
          $('#tel').css('background-color', '#f79999');
          error = true;
          message += '電話番号に「-」が含まれていません。\n';
        } else {
          $('#tel').css('background-color', '#fafafa');
        }
        if($('#agree').prop('checked') == false) {
          error = true;
          message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
        }
        if (error == true){
          $('#submit').attr('src', 'images/button-submit.png');
        }else{
          $('#submit').attr('src', 'images/button-submit-blue.png');
        }

        result = {
          error: error,
          message: message
        }

        return result
        }
});