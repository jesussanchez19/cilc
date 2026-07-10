export const EVENTS = {
  WHATSAPP_CLICK: 'whatsapp_click',
  FORM_SUBMIT: 'form_submit',
  PROGRAM_VIEW: 'program_view',
  BLOG_READ: 'blog_read',
  SUBSCRIBE: 'subscribe',
  FEEDBACK_SUBMIT: 'feedback_submit',
  DESTINATION_VIEW: 'destination_view',
  SEARCH_QUERY: 'search_query',
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
