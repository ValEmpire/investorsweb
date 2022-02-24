import {
  ADD_REPLY,
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_ALL_COMMENTS,
  UPDATE_COMMENTS,
} from "../../const";

const initialState = {
  body: "",
  comment: {},
  commentFields: {
    body: "",
  },
  comments: [],
};

export const comment = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      const fieldName = Object.keys(action.payload)[0];
      const fieldValue = action.payload[fieldName];

      return {
        ...state,
        commentFields: {
          ...state.commentFields,
          [fieldName]: fieldValue,
        },
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comment: [...state.comment, action.payload],
      };

    case GET_ALL_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    case UPDATE_COMMENTS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };

    case ADD_REPLY:
      const { commentId } = action.payload;

      const commentWithReply = state.comments.find(
        comment => (comment.id = commentId)
      );

      if (!commentWithReply.reply) commentWithReply.reply = [];

      commentWithReply.reply.unshift(action.payload);

      return {
        ...state,
        comments: [...state.comments],
      };

    default:
      return { ...state };
  }
};
