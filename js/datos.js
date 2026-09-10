
const productosGas = [
    { codigo: "CL001", categoria: "Cilindros de Gas", nombre: "Cilindro GLP 5 kg", desc: "Para uso residencial (cocina, calefacción pequeña).", precioResidencial: 6500, precioComercial: 6000, stock: 80, img: "img/cilindro_5kg.png" },
    { codigo: "CL002", categoria: "Cilindros de Gas", nombre: "Cilindro GLP 11 kg", desc: "Cilindro estándar doméstico. El más utilizado en hogares.", precioResidencial: 12000, precioComercial: 11000, stock: 200, img: "img/cilindro_11kg.png" },
    { codigo: "CL003", categoria: "Cilindros de Gas", nombre: "Cilindro GLP 15 kg", desc: "Cilindro de mayor capacidad para hogares de alto consumo.", precioResidencial: 16000, precioComercial: 14500, stock: 90, img: "img/cilindro_15gk.png" },
    { codigo: "CL004", categoria: "Cilindros de Gas", nombre: "Cilindro GLP 45 kg", desc: "Cilindro industrial. Uso comercial: restaurantes, talleres.", precioResidencial: 45000, precioComercial: 40000, stock: 30, img: "img/cilindro_45kg.png" },
    { codigo: "RG001", categoria: "Reguladores", nombre: "Regulador doméstico estándar", desc: "Regulador de 1 etapa para cilindros 5, 11 y 15 kg.", precioResidencial: 8990, precioComercial: 8200, stock: 45, img: "img/Regulador.jpg" },
    { codigo: "RG002", categoria: "Reguladores", nombre: "Regulador de alta presión", desc: "Regulador para cocinas industriales o equipos de mayor consumo.", precioResidencial: 18990, precioComercial: 17000, stock: 12, img: "img/Regulador2.jpg" },
    { codigo: "MG001", categoria: "Mangueras y Conexiones", nombre: "Manguera gas 1.5 m", desc: "Manguera flexible homologada. Diámetro interior 9mm.", precioResidencial: 3990, precioComercial: 3500, stock: 80, img: "img/manguera.jpg" },
    { codigo: "MG004", categoria: "Mangueras y Conexiones", nombre: "Kit conexión completo", desc: "Regulador + manguera 1.5m + abrazaderas.", precioResidencial: 12990, precioComercial: 11500, stock: 25, img: "img/kit.jpg" }
];


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

const tipoUsuario = {
    residencial: "Residencial",
    comercial: "Comercial"
};