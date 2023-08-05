import { createAction, nanoid } from "@reduxjs/toolkit";

const ADD_POST = "ADD_POST";

const postActions = {
  [ADD_POST]: createAction(ADD_POST, (text: string) => {
    return { payload: { text, id: nanoid() } };
  }),
} as const;

type PostState = Array<{ id: string; text: string }>;
const initialState: PostState = [];

function handleCreatePost<
  T extends ReturnType<
    (typeof postActions)[keyof typeof postActions]
  >["payload"],
>(state: PostState, { id, text }: T): PostState {
  return [...state, { id, text }];
}

export default function postsReducer<
  T extends ReturnType<(typeof postActions)[keyof typeof postActions]>,
>(state = initialState, action: T) {
  const { type, payload } = action;
  switch (type) {
    case ADD_POST: {
      return handleCreatePost(state, payload);
    }
    default:
      return state;
  }
}
