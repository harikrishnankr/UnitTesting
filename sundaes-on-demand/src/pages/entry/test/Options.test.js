import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("display image for each scoops", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);

  // confirm alt test of images
  const altText = scoopImages.map((e) => e.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each toppings", async () => {
  render(<Options optionType="toppings" />);

  // find topping images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm all alt test of topping images
  const toppingAltTexts = toppingImages.map((e) => e.alt);
  expect(toppingAltTexts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
