import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";

test("Scoop option validations are working fine", async () => {
  const user = await userEvent.setup();
  render(<ScoopOption />);

  const vanillaInput = await screen.findByRole("spinbutton");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
