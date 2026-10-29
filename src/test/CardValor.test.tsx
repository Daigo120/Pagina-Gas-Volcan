// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CardValor from "../componentes/moleculas/CardValor"; 

test("renderiza correctamente el titulo, texto e icono recibidos por props", () => {
  const { container } = render(
    <CardValor 
      titulo="Visión" 
      texto="Ser los mejores del mercado" 
      icono="bi-star-fill" 
    />
  );

  const elementoTitulo = screen.getByText("Visión");
  expect(elementoTitulo).not.toBeNull();

  const elementoTexto = screen.getByText("Ser los mejores del mercado");
  expect(elementoTexto).not.toBeNull();

  const elementoIcono = container.querySelector("i");
  expect(elementoIcono?.className).toContain("bi-star-fill");
  expect(elementoIcono?.className).toContain("display-5"); 
});