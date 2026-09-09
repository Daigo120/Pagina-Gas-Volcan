// Catálogo de Productos y Tarifas - Distribuidora de Gas El Volcán
const productosGas = [
    { codigo: "CL001", categoria: "Cilindros de Gas", nombre: "Cilindro GLP 5 kg", desc: "Para uso residencial (cocina, calefacción pequeña).", precioResidencial: 6500, precioComercial: 6000, stock: 80, img: "https://picsum.photos/300/200?gas5" },
    { codigo: "CL002", categoria: "Cilindros de Gas", nombre: "Cilindro GLP 11 kg", desc: "Cilindro estándar doméstico. El más utilizado en hogares.", precioResidencial: 12000, precioComercial: 11000, stock: 200, img: "https://picsum.photos/300/200?gas11" },
    { codigo: "CL003", categoria: "Cilindros de Gas", nombre: "Cilindro GLP 15 kg", desc: "Cilindro de mayor capacidad para hogares de alto consumo.", precioResidencial: 16000, precioComercial: 14500, stock: 90, img: "https://picsum.photos/300/200?gas15" },
    { codigo: "CL004", categoria: "Cilindros de Gas", nombre: "Cilindro GLP 45 kg", desc: "Cilindro industrial. Uso comercial: restaurantes, talleres.", precioResidencial: 45000, precioComercial: 40000, stock: 30, img: "https://picsum.photos/300/200?gas45" },
    { codigo: "RG001", categoria: "Reguladores", nombre: "Regulador doméstico estándar", desc: "Regulador de 1 etapa para cilindros 5, 11 y 15 kg.", precioResidencial: 8990, precioComercial: 8200, stock: 45, img: "https://picsum.photos/300/200?reg1" },
    { codigo: "RG002", categoria: "Reguladores", nombre: "Regulador de alta presión", desc: "Regulador para cocinas industriales o equipos de mayor consumo.", precioResidencial: 18990, precioComercial: 17000, stock: 12, img: "https://picsum.photos/300/200?reg2" },
    { codigo: "MG001", categoria: "Mangueras y Conexiones", nombre: "Manguera gas 1.5 m", desc: "Manguera flexible homologada. Diámetro interior 9mm.", precioResidencial: 3990, precioComercial: 3500, stock: 80, img: "https://picsum.photos/300/200?mang1" },
    { codigo: "MG004", categoria: "Mangueras y Conexiones", nombre: "Kit conexión completo", desc: "Regulador + manguera 1.5m + abrazaderas.", precioResidencial: 12990, precioComercial: 11500, stock: 25, img: "https://picsum.photos/300/200?kit" }
];

// Regiones y Comunas de Chile para desplegables dinámicos
const regionesYComunas = [
    {
        region: "Ñuble",
        comunas: ["Chillán", "Chillán Viejo", "El Carmen", "Pinto", "San Ignacio", "Bulnes", "Quillón"]
    },
    {
        region: "Biobío",
        comunas: ["Concepción", "Talcahuano", "Los Ángeles", "San Pedro de la Paz"]
    },
    {
        region: "Región Metropolitana",
        comunas: ["Santiago", "Providencia", "Las Condes", "Maipú", "Colina"]
    }
];