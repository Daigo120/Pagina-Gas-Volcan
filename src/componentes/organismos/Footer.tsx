

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content text-center">
        <p>&copy; {currentYear} Gas El Volcán. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;