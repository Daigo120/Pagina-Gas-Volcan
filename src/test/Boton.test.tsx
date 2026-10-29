// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import Boton from "../componentes/atomos/Boton"; 


test("muestra el botón 'Agregar' habilitado cuando hay stock disponible", () => {
  render(
    <MemoryRouter>
      <Boton id="1" stock={5} />
    </MemoryRouter>
  );


  const botonAgregar = screen.getByRole("button", { name: "Agregar" }) as HTMLButtonElement;
  
  expect(botonAgregar).not.toBeNull();
  expect(botonAgregar.disabled).toBe(false); 
  expect(botonAgregar.className).toContain("btn-warning"); 
});


test("muestra el botón 'Sin Stock' deshabilitado cuando el stock es 0", () => {
  render(
    <MemoryRouter>
      <Boton id="2" stock={0} />
    </MemoryRouter>
  );

  const botonSinStock = screen.getByRole("button", { name: "Sin Stock" }) as HTMLButtonElement;
  
  expect(botonSinStock).not.toBeNull();
  expect(botonSinStock.disabled).toBe(true); 
  expect(botonSinStock.className).toContain("btn-secondary"); 
});

