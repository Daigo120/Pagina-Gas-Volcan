// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import Contacto from "../paginas/Contacto"; 

test("el contenedor de preguntas frecuentes tiene las clases accordion y shadow-sm", () => {
 
  const { container } = render(<Contacto />);

  const acordeonDiv = container.querySelector("#accordionFAQ");

  expect(acordeonDiv).not.toBeNull();

  expect(acordeonDiv?.className).toContain("accordion");
  expect(acordeonDiv?.className).toContain("shadow-sm");
});