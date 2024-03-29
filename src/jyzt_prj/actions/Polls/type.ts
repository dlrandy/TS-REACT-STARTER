enum PollsActionTypes {
  // polls
  REQUESTED_ALL_POLLS = 'REQUESTED_ALL_POLLS',
  RECEIVED_ALL_POLLS = 'RECEIVED_ALL_POLLS',

  // poll
  REQUESTED_HIDE_POLL = 'REQUESTED_HIDE_POLL',
  RECEIVED_HIDE_POLL = 'RECEIVED_HIDE_POLL',

  REQUESTED_CLOSE_POLL = 'REQUESTED_CLOSE_POLL',
  RECEIVED_CLOSE_POLL = 'RECEIVED_CLOSE_POLL',
  REQUESTED_EMAIL_CONTENT = 'REQUESTED_EMAIL_CONTENT',
  RECEIVED_EMAIL_CONTENT = 'RECEIVED_EMAIL_CONTENT',
  REQUESTED_ACTIVE_POLL = 'REQUESTED_ACTIVE_POLL',
  RECEIVED_ACTIVE_POLL = 'RECEIVED_ACTIVE_POLL',
  REQUESTED_PUBLISH_POLL_TO_PAGE = 'REQUESTED_PUBLISH_POLL_TO_PAGE',
  RECEIVED_PUBLISH_POLL_TO_PAGE = 'RECEIVED_PUBLISH_POLL_TO_PAGE',
}

export default PollsActionTypes;
