import { nanoid } from "nanoid";
import { createStore } from "redux";

function createSimpleAction<TType extends string>(name: TType) {
  return { type: name };
}

function createActionWithPayload<
  UPayload extends object | number | string,
  TType extends string = string,
>(name: TType) {
  return (payload: UPayload) => ({ type: name, payload });
}

const ADD_TODO = "ADD_TODO";
const TODO_TOGGLED = "TODO_TOGGLED";

export const addTodo = <T extends number>(text: T, foo: number) =>
  ({
    type: ADD_TODO,
    payload: { text, id: nanoid(), foo },
  }) as const;

export const todoToggled = (id: string) => ({
  type: TODO_TOGGLED,
  payload: { id },
});

const actions = {
  incremenCounter: () => ({ type: "counter/incremented" }) as const,
  decrementCounter: () => ({ type: "counter/decremented" }) as const,
  addTodo: (foo: number) => addTodo(42, foo),
  // foo: createActionWithPayload<number>("foo"),
} as const;

type State = { value: number };
function counterReducer(
  state: State = { value: 0 },
  action: ReturnType<(typeof actions)[keyof typeof actions]>,
): State {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    case "ADD_TODO":
      return { value: action.payload.foo };
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(counterReducer);
