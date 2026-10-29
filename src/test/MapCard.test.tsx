// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MapaCard from "../componentes/organismos/MapCard"; 

test("el mapa carga la dirección correcta en el atributo src", () => {
  render(<MapaCard />);

  const mapaIframe = screen.getByTitle("Mapa de nuestra ubicación");

  const urlOrigen = mapaIframe.getAttribute("src");
  
  expect(urlOrigen).toContain("https://www.google.com/maps/embed");
  expect(urlOrigen).toContain("Duoc%20UC"); 
});