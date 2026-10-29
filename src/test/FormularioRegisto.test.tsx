// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FormularioRegistro from "../componentes/organismos/FormularioRegistro"; 


test("renderiza el botón de Registrarse en pantalla", () => {
  render(
    <MemoryRouter>
      <FormularioRegistro />
    </MemoryRouter>
  );

  const botonRegistro = screen.getByRole("button", { name: "Registrarse" });
  
  expect(botonRegistro).not.toBeNull();
  expect(botonRegistro.className).toContain("btn-warning");
});

