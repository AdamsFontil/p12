import { render, screen } from "@testing-library/react";
import TodoList from "./List";

test("renders specific todo", () => {
  const todos = [
    {
      _id: "69b14af95ddd35c1318563b1",
      text: "Write code",
      done: true,
    },
    {
      _id: "69b14af95ddd35c1318563b2",
      text: "Learn about containers",
      done: true,
    },
    {
      _id: "69b17d03b7aa8cf46a82a2cc",
      text: "5TH",
      done: false,
    },
  ];

  render(<TodoList todos={todos} />);

  const element = screen.getByText("Write code");
  expect(element).toBeDefined();
  // const element2 = screen.getByText("Learn about containers");
  // expect(element2).toBeDefined();
  // const element3 = screen.getByText("5TH");
  // expect(element3).toBeDefined();
});
