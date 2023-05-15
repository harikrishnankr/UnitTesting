import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";

test("Confirm scoop subtotal when scoop change", async () => {
  const user = await userEvent.setup();
  render(<Options optionType="scoops" />);

  // Initial value $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // Increase the scoop to one and check
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // Increase chocolate scoop one more to two and check
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  // 2 Vanilla + 4 Chocolate ($2 each scoop)
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("Confirm toppings subtotal when toppings changes", async () => {
  const user = await userEvent.setup();
  render(<Options optionType="toppings" />);

  // Initial value $0.00
  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  // Increase Cherries the topping to one and check
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  // Increase M&Ms scoop one more to two and check
  const mAndMsCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  await user.click(mAndMsCheckbox);
  expect(toppingSubtotal).toHaveTextContent("3.00");

  await user.click(mAndMsCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    const { unmount } = render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });
    expect(grandTotal).toHaveTextContent("0.00");

    // Fixes "should wrappe in act(...) function"
    unmount();
  });

  test("grand total updates properly if scoop added first", async () => {
    const user = await userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });

    // Add scoops and test
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // Add toppings and test
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping added first", async () => {
    const user = await userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });

    // Add toppings and check
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    // Add scoops and test
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    const user = await userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /Grand total: \$/,
    });

    // First add 2 scoops
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    // Then add one topping
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);

    // Check grand total
    expect(grandTotal).toHaveTextContent("5.50");

    // Remove one scoop
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    // Check grand total
    expect(grandTotal).toHaveTextContent("3.50");

    // remove the topping
    await user.click(cherriesCheckbox);

    // Check grand total
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
