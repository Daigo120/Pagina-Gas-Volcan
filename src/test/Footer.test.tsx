// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../componentes/organismos/Footer"; 

test("aplica la clase footer-container para mantenerse al fondo de la pantalla", () => {
  render(<Footer />);
  const footerElement = screen.getByRole("contentinfo");
  expect(footerElement.className).toContain("footer-container");
});