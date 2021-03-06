$('#add-user').on('click', function (event) {
  event.preventDefault();

  const newAccount = {
    firstName: $('#inputFirst').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim(),
    location: $('#inputLocation').val().trim(),
    meetPreference: $('input[type=radio][name=meetPreference]:checked').val(),
    about: $('#inputAbout').val().trim(),
    interest_id: parseInt($('#interest_id').val())
  };

  if (newAccount.password.length > 0 && newAccount.email.length > 0 && newAccount.firstName.length > 0 && newAccount.location.length > 0 && newAccount.meetPreference.length > 0 && newAccount.about.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/register',
      data: newAccount
    }).then(() => {
      window.location.href = '/';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#create-err-msg').empty('').text('**Please fill out entire form**');
  }
});

$('#update-user').on('click', function (event) {
  event.preventDefault();

  const id = $(this).data('id');

  // capture All changes
  const changeUser = {
    firstName: $('#inputFirst').val().trim(),
    email: $('#inputEmail').val().trim(),
    password: $('#inputPassword').val().trim(),
    location: $('#inputLocation').val().trim(),
    meetPreference: $('input[type=radio][name=meetPreference]:checked').val(),
    about: $('#inputAbout').val().trim(),
    interest_id: parseInt($('#interest_id').val())
  };
  $('#err-msg').empty('');
  // $('#change-user-modal').modal('show');
  console.log(changeUser);

  if (changeUser.password.length > 0 && changeUser.email.length > 0 && changeUser.firstName.length > 0 && changeUser.location.length > 0 && changeUser.meetPreference.length > 0 && changeUser.about.length > 0) {
    $.ajax({
      type: 'PUT',
      url: `/api/user/${id}`,
      data: changeUser
    }).then((result) => {
      console.log('Updated user:', result);
      // Reload the page to get the updated list
      window.location.href = '/logout';
    });
  } else {
    console.log('**Please fill out entire form**');
    $('#update-err-msg').empty('').text('**Please fill out entire form**');
  }
});

// Make New Convo or redirect to existing convo
// eslint-disable-next-line no-unused-vars
const messageFriend = async (event, id) => {
  event.preventDefault();

  const userId = $('#your-user-id').val();
  const Convo = {
    users: `${userId},${id}`
  };

  await $.ajax({
    type: 'GET',
    url: '/api/conversations'
  }).then((response) => {
    if (response.length === 0) {
      $.ajax({
        type: 'POST',
        url: '/api/conversations',
        data: Convo
      }).then((newConvo) => {
        const ConversationId = newConvo[0].ConversationId;
        window.location.href = `/chat/${ConversationId}`;
      });
    }
  });

  $.ajax({
    type: 'GET',
    url: '/api/conversations'
  }).then((response) => {
    const exists = [];
    for (let i = 0; i < response.length; i++) {
      const reverseAllUsers = response[i].users.split('').reverse().join('');

      if (response[i].users === Convo.users) {
        exists.push('true');
      } else if (reverseAllUsers === Convo.users) {
        exists.push('trueReverse');
      } else {
        exists.push('false');
      }
    }
    const doesExist = exists.includes('true');
    const existsIndex = exists.indexOf('true');
    const doesExistReverse = exists.includes('trueReverse');
    const existsReverseIndex = exists.indexOf('trueReverse');

    if (doesExistReverse) {
      const ConversationId = response[existsReverseIndex].id;
      window.location.href = `/chat/${ConversationId}`;
    } else if (doesExist) {
      const ConversationId = response[existsIndex].id;
      window.location.href = `/chat/${ConversationId}`;
    } else {
      $.ajax({
        type: 'POST',
        url: '/api/conversations',
        data: Convo
      }).then((newConvo) => {
        const ConversationId = newConvo[0].ConversationId;
        window.location.href = `/chat/${ConversationId}`;
      });
    }
  });
};

// Create chat message
$('#submit-message').on('click', async function (event) {
  event.preventDefault();
  const message = $('#message-content').val();
  const ConversationId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  if (message) {
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        message,
        ConversationId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
      $('#message-content').val('');
    } else {
      alert(response.statusText);
    }
  }
});
// DELETE   ***************************************************
$('#delete-user').on('click', function (event) {
  event.preventDefault();
  $('#err-msg').empty('');
  $('#delete-user-modal').modal('show');
});

$("#stay").on("click", function (event) {
  event.preventDefault();

  $('#delete-user-modal').removeClass('is-active');
});

$('#confirm-delete').on('click', function (event) {
  event.preventDefault();
  const id = $(this).data('id');
  const deleteUser = {
    email: $('#userEmail').val().trim(),
    password: $('#userPassword').val().trim()
  };
  if (deleteUser.email.length > 0 && deleteUser.password.length > 0) {
    $.ajax({
      type: 'POST',
      url: '/api/user/confirm',
      data: deleteUser
    }).then((result) => {
      if (result) {
        $.ajax(`/api/user/${id}`, {
          type: 'DELETE'
        }).then(() => {
          console.log('Deleted user', deleteUser);
          // Reload the page to get the updated list
          window.location.href = '/logout';
        });
      } else {
        $('#err-msg').empty('').text('Wrong credentials!');
      }
    });
  } else {
    console.log('fill out entire form');
    $('#err-msg').empty('').text('fill out entire form');
  }
});
$('#register').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/register';
});
$('#login-modal').on('click', function (event) {
  event.preventDefault();
  $('#user-info').modal('show');
});
$('#go-home').on('click', function (event) {
  event.preventDefault();
  window.location.href = '/';
});
$('#login').on('click', function (event) {
  event.preventDefault();
  const user = {
    email: $('#email').val().trim(),
    password: $('#user_password').val().trim()
  };
  $.post('/api/login', user, (result) => {
    // console.log(result);
    if (result.loggedIn) {
      $(document.location).attr('href', '/friends');
    } else {
      $('#login-err-msg').empty('').text(result.error);
      $('#error-login').addClass('is-active');
    }
  });
});

$("#retry-login").on("click", function (event) {
  event.preventDefault();

  $('#error-login').removeClass('is-active');
});
