import { describe, expect, it } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Home from "@/pages/home.jsx";

describe.skip("Home", () => {
  //  aria-label="Link a instagram"
  it("renderiza la home", () => {
    const { getByText, getByLabelText } = render(<Home />);
    expect(getByText("Las mejores manos profecionales")).toBeTruthy();

    const InstagramIcon = getByLabelText("Link a instagram");
    const isClickIg = fireEvent.click(InstagramIcon);
    expect(isClickIg).toBeTruthy();

    const fbIcon = getByLabelText("Link a facebook");
    const isClickfb = fireEvent.click(fbIcon);
    expect(isClickfb).toBeTruthy();
  });
});
