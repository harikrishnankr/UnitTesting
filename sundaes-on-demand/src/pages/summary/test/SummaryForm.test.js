import { render, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial conditions", () => {
  render(<SummaryForm />);

  // Checkbox must be unchecked by default
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  // Button should be disable by default
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables on first click and disables on second click", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  // Checkbox must be unchecked by default
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  // Button should be disable by default
  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("Popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover is hidden by default
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouse over of checkbox label
  const checkbox = screen.getByText(/terms and conditions/i);
  await user.hover(checkbox);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears on mouse over of checkbox label
  await user.unhover(checkbox);
  expect(popover).not.toBeInTheDocument();
});
