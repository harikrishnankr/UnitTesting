import { fireEvent, render, screen } from "@testing-library/react";
import App, { replaceCamelCaseWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toHaveStyle({ "background-color": "MediumVioletRed" });

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ "background-color": "MidnightBlue" });
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  // Check the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  expect(colorButton).toBeEnabled();

  // Check the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("checkbox disables on first click and enables on second click", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // first click
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  // second click
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("Disabled button has gray background and toggles to Medium Violet Red", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // first click
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ "background-color": "gray" });

  // second click
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ "background-color": "MediumVioletRed" });
});

test("Disabled button has gray background and toggles to Midnight Blue", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  // Change the button to blue
  fireEvent.click(colorButton);

  // first click
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ "background-color": "gray" });

  // second click
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ "background-color": "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});
