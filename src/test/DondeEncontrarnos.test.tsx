// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DondeEncontrarnos from "../paginas/DondeEncontrarnos"; 


test("renderiza el título principal de la página", () => {
  render(<DondeEncontrarnos />);

  const titulo = screen.getByRole("heading", { level: 2, name: "Dónde encontrarnos" });
  
  expect(titulo).not.toBeNull();
  expect(titulo.className).toContain("text-volcan"); 
});

